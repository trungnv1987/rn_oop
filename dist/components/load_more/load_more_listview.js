"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadMoreListView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const recyclerlistview_1 = require("recyclerlistview");
const react_oop_1 = require("react_oop");
const react_native_1 = require("react-native");
const not_found_label_1 = require("../search/not_found_label");
function LoadMoreListView({ controller, itemBuilder, keyExtractor, showsScrollIndicator, contentContainerStyle, separator, couldRefresh = true, }) {
    const { width } = (0, react_native_1.useWindowDimensions)();
    const rlvRef = (0, react_1.useRef)(null);
    const defaultDataProvider = (0, react_1.useMemo)(() => new recyclerlistview_1.DataProvider((a, b) => {
        var _a, _b;
        const keyA = (_a = keyExtractor === null || keyExtractor === void 0 ? void 0 : keyExtractor(a)) !== null && _a !== void 0 ? _a : JSON.stringify(a);
        const keyB = (_b = keyExtractor === null || keyExtractor === void 0 ? void 0 : keyExtractor(b)) !== null && _b !== void 0 ? _b : JSON.stringify(b);
        return keyA !== keyB;
    }), [keyExtractor]);
    const [dataProvider, setDataProvider] = (0, react_1.useState)(() => defaultDataProvider);
    const [hasNext, setHasNext] = (0, react_1.useState)(false);
    const [refreshing, setRefreshing] = (0, react_1.useState)(false);
    const _data = () => controller.data;
    const _couldLoadMore = () => _data().couldLoadMore;
    const _isSearching = () => controller.isSearching;
    const _itemsCount = () => controller.data.items.length;
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
                setDataProvider(defaultDataProvider.cloneWithRows(items));
                break;
            case react_oop_1.ReloadState.loadingMore:
                setDataProvider((prevProvider) => prevProvider.cloneWithRows(items));
                break;
            case react_oop_1.ReloadState.normal:
                setDataProvider(defaultDataProvider.cloneWithRows(items));
                break;
        }
    }, [defaultDataProvider, _data]);
    const layoutProvider = (0, react_1.useMemo)(() => new recyclerlistview_1.LayoutProvider(() => "ROW", (_type, dim) => {
        dim.width = width;
        dim.height = 50; // just an estimate
    }), [width]);
    const rowRenderer = (0, react_1.useCallback)((_type, item, index) => {
        var _a;
        const isLast = index === _itemsCount() - 1;
        const row = itemBuilder(item);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: { width: "100%" } }, { children: [row, (_a = (!isLast && separator)) !== null && _a !== void 0 ? _a : separator] }), keyExtractor === null || keyExtractor === void 0 ? void 0 : keyExtractor(item)));
    }, [itemBuilder, separator, _itemsCount]);
    const style = (0, react_1.useMemo)(() => (Object.assign({ flex: 1 }, contentContainerStyle)), [contentContainerStyle]);
    if (_isEmpty()) {
        if (_isSearching()) {
            return (0, jsx_runtime_1.jsx)(not_found_label_1.NotFoundLabel, { style: style });
        }
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(recyclerlistview_1.RecyclerListView, { ref: rlvRef, style: style, 
        // Core
        dataProvider: dataProvider, layoutProvider: layoutProvider, rowRenderer: rowRenderer, 
        // Key flags for dynamic heights:
        forceNonDeterministicRendering: true, canChangeSize: true, 
        // UX: refresh + load more
        renderFooter: () => hasNext ? ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: { alignItems: "center" } }, { children: (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, {}) }))) : null, onEndReached: () => {
            if (hasNext) {
                controller.loadMore();
            }
        }, onEndReachedThreshold: 50, scrollViewProps: Object.assign({ showsVerticalScrollIndicator: showsScrollIndicator == true }, (couldRefresh && {
            refreshControl: ((0, jsx_runtime_1.jsx)(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: () => {
                    setRefreshing(true);
                    controller.refresh();
                } })),
        })) }));
}
exports.LoadMoreListView = LoadMoreListView;
