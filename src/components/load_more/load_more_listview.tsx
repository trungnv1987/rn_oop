import { ReactNode, useCallback, useRef, useState, useMemo } from "react";
import { ItemBuilder, LoadMoreController, ReloadState } from "react_oop";
import { ActivityIndicator, FlatList, View } from "react-native";
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
  endReachedThreshold,
  showsScrollIndicator,
  contentContainerStyle,
  separator,
  couldRefresh = true,
}: LoadMoreListViewProps<T>) {
  const listRef = useRef<FlatList<T>>(null);
  const [items, setItems] = useState<T[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isLoadingMoreRef = useRef(false);
  const _data = () => controller.data;
  const _couldLoadMore = () => _data().couldLoadMore;
  const _isSearching = () => controller.isSearching;
  const _itemsCount = () => items.length;
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
          setItems(items);
          break;
        case ReloadState.loadingMore:
          setItems(items);
          break;
        case ReloadState.normal:
          setItems(items);
          break;
      }
    },
    [_data]
  );

  const rowRenderer = useCallback(
    (_type: string, item: T, index: number) => {
      const isLast = index === _itemsCount() - 1;
      const row = itemBuilder(item);
      return (
        <View style={{ width: "100%" }}>
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
    <FlatList
      ref={listRef}
      style={style}
      data={items}
      keyExtractor={(it, i) => {
        const key = keyExtractor?.(it) ?? JSON.stringify(it);
        return typeof key === "string" ? key : String(key ?? i);
      }}
      renderItem={({ item, index }) => rowRenderer("ROW", item, index)}
      showsVerticalScrollIndicator={showsScrollIndicator == true}
      // Refresh
      refreshing={couldRefresh ? refreshing : false}
      onRefresh={
        couldRefresh
          ? () => {
              setRefreshing(true);
              controller.refresh();
            }
          : undefined
      }
      // Load more
      ListFooterComponent={
        hasNext ? (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      onEndReached={() => {
        if (!hasNext || isLoadingMoreRef.current) return;
        isLoadingMoreRef.current = true;
        const maybe = controller.loadMore?.();
        if (maybe && typeof (maybe as any).finally === "function") {
          (maybe as Promise<any>).finally(() => {
            isLoadingMoreRef.current = false;
          });
        } else {
          setTimeout(() => (isLoadingMoreRef.current = false), 300);
        }
      }}
      onEndReachedThreshold={endReachedThreshold ?? 0.5}
      contentContainerStyle={contentContainerStyle}
    />
  );
}
