import { ReactNode, useCallback, useRef, useState, useMemo } from "react";

import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { ItemBuilder, LoadMoreController, ReloadState } from "react_oop";
import {
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  View,
} from "react-native";
import { NotFoundLabel } from "../search/not_found_label";

interface LoadMoreListViewProps<T> {
  controller: LoadMoreController<T>;
  itemBuilder: ItemBuilder<T>;
  keyExtractor?: (item: T) => any;
  endReachedThreshold?: number;
  showsScrollIndicator?: boolean;
  contentContainerStyle?: any;
  separator?: ReactNode;
  couldRefresh?: boolean;
}

export function LoadMoreListView<T>({
  controller,
  itemBuilder,
  keyExtractor,
  showsScrollIndicator,
  contentContainerStyle,
  separator,
  couldRefresh = true,
}: LoadMoreListViewProps<T>) {
  const { width } = useWindowDimensions();
  const rlvRef = useRef<RecyclerListView<any, any>>(null);
  const defaultDataProvider = useMemo(
    () =>
      new DataProvider((a: T, b: T) => {
        const keyA = keyExtractor?.(a) ?? JSON.stringify(a);
        const keyB = keyExtractor?.(b) ?? JSON.stringify(b);
        return keyA !== keyB;
      }),
    [keyExtractor]
  );
  const heightCache = useRef<{ [key: number]: number }>({}).current;

  const [dataProvider, setDataProvider] = useState(() => defaultDataProvider);
  const [hasNext, setHasNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const _data = () => controller.data;
  const _couldLoadMore = () => _data().couldLoadMore;
  const _isSearching = () => controller.isSearching;
  const _itemsCount = () => controller.data.items.length;
  const _isEmpty = () => _itemsCount() === 0;

  controller.onReload = useCallback(
    (state?: ReloadState) => {
      if (!state) return;
      const data = _data();
      const items = data.items;
      setHasNext(_couldLoadMore());
      setRefreshing(false);
      switch (state) {
        case ReloadState.refreshing:
          setDataProvider(defaultDataProvider.cloneWithRows(items));
          break;
        case ReloadState.loadingMore:
          setDataProvider((prevProvider) => prevProvider.cloneWithRows(items));
          break;
        case ReloadState.normal:
          setDataProvider(defaultDataProvider.cloneWithRows(items));
          break;
      }
    },
    [defaultDataProvider, _data]
  );

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => "ROW",
        (_type, dim, index) => {
          dim.width = width;
          dim.height = heightCache[index] ?? 60; // default guess
        }
      ),
    [width]
  );

  const rowRenderer = useCallback(
    (_type: string, item: T, index: number) => {
      const isLast = index === _itemsCount() - 1;
      const row = itemBuilder(item);
      return (
        <View style={{ width: "100%" }} key={keyExtractor?.(item)}>
          {row}
          {(!isLast && separator) ?? separator}
        </View>
      );
    },
    [itemBuilder, separator, _itemsCount]
  );
  const style = useMemo(
    () => ({ flex: 1, ...contentContainerStyle }),
    [contentContainerStyle]
  );
  if (_isEmpty()) {
    if (_isSearching()) {
      return <NotFoundLabel style={style} />;
    }
    return null;
  }
  return (
    <RecyclerListView
      ref={rlvRef}
      style={style}
      // Core
      dataProvider={dataProvider}
      layoutProvider={layoutProvider}
      rowRenderer={rowRenderer}
      // Key flags for dynamic heights:
      forceNonDeterministicRendering
      canChangeSize
      // UX: refresh + load more
      renderFooter={() =>
        hasNext ? (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      onEndReached={() => {
        if (hasNext) {
          controller.loadMore();
        }
      }}
      onEndReachedThreshold={50}
      scrollViewProps={{
        showsVerticalScrollIndicator: showsScrollIndicator == true,
        ...(couldRefresh && {
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                controller.refresh();
              }}
            />
          ),
        }),
      }}
      // Optional: observe when items finish layout (good for analytics or improving future estimates)
      onItemLayout={(index: number, height: number) => {
        // index has just been measured with its real height.
        // If you want to cache stats and refine your estimates by type, you can do it here.
        heightCache[index] = height;
      }}
    />
  );
}
