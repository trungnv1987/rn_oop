"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMoreListView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_oop_1 = require("react_oop");
const react_native_1 = require("react-native");
const not_found_label_1 = require("../search/not_found_label");
function LoadMoreListView({ controller, itemBuilder, keyExtractor, endReachedThreshold, showsScrollIndicator, contentContainerStyle, separator, couldRefresh = true, }) {
    const listRef = (0, react_1.useRef)(null);
    const [items, setItems] = (0, react_1.useState)([]);
    const [hasNext, setHasNext] = (0, react_1.useState)(false);
    const [refreshing, setRefreshing] = (0, react_1.useState)(false);
    const isLoadingMoreRef = (0, react_1.useRef)(false);
    const _data = () => controller.data;
    const _couldLoadMore = () => _data().couldLoadMore;
    const _isSearching = () => controller.isSearching;
    const _itemsCount = () => items.length;
    const _isEmpty = () => _itemsCount() === 0;
    controller.onReload = (0, react_1.useCallback)((state) => {
        if (!state)
            return;
        const data = _data();
        const items = data.items;
        setHasNext(_couldLoadMore());
        setRefreshing(false);
        switch (state) {
            case react_oop_1.ReloadState.refreshing:
                setItems(items);
                break;
            case react_oop_1.ReloadState.loadingMore:
                setItems(items);
                break;
            case react_oop_1.ReloadState.normal:
                setItems(items);
                break;
        }
    }, [_data]);
    const rowRenderer = (0, react_1.useCallback)((_type, item, index) => {
        var _a;
        const isLast = index === _itemsCount() - 1;
        const row = itemBuilder(item);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: { width: "100%" } }, { children: [row, (_a = (!isLast && separator)) !== null && _a !== void 0 ? _a : separator] })));
    }, [itemBuilder, separator, _itemsCount]);
    const style = (0, react_1.useMemo)(() => (Object.assign({ flex: 1 }, contentContainerStyle)), [contentContainerStyle]);
    if (_isEmpty()) {
        if (_isSearching()) {
            return (0, jsx_runtime_1.jsx)(not_found_label_1.NotFoundLabel, { style: style });
        }
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { ref: listRef, style: style, data: items, keyExtractor: (it, i) => {
            var _a;
            const key = (_a = keyExtractor === null || keyExtractor === void 0 ? void 0 : keyExtractor(it)) !== null && _a !== void 0 ? _a : JSON.stringify(it);
            return typeof key === "string" ? key : String(key !== null && key !== void 0 ? key : i);
        }, renderItem: ({ item, index }) => rowRenderer("ROW", item, index), showsVerticalScrollIndicator: showsScrollIndicator == true, 
        // Refresh
        refreshing: couldRefresh ? refreshing : false, onRefresh: couldRefresh
            ? () => {
                setRefreshing(true);
                controller.refresh();
            }
            : undefined, 
        // Load more
        ListFooterComponent: hasNext ? ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: { alignItems: "center" } }, { children: (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, {}) }))) : null, onEndReached: () => {
            var _a;
            if (!hasNext || isLoadingMoreRef.current)
                return;
            isLoadingMoreRef.current = true;
            const maybe = (_a = controller.loadMore) === null || _a === void 0 ? void 0 : _a.call(controller);
            if (maybe && typeof maybe.finally === "function") {
                maybe.finally(() => {
                    isLoadingMoreRef.current = false;
                });
            }
            else {
                setTimeout(() => (isLoadingMoreRef.current = false), 300);
            }
        }, onEndReachedThreshold: endReachedThreshold !== null && endReachedThreshold !== void 0 ? endReachedThreshold : 0.5, contentContainerStyle: contentContainerStyle }));
}
exports.LoadMoreListView = LoadMoreListView;
