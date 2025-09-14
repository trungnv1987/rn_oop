"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
const _tabbar_1 = require("../../styles/_tabbar");
const react_oop_1 = require("react_oop");
const react_oop_2 = require("react_oop");
const index_1 = require("../index");
function NavigationBar({ title, leftButton, rightButton, showLargeTitle = false, searchBar, couldSearch = false, onSearching, loadMoreController, }) {
    const [isSearching, setIsSearching] = (0, react_1.useState)(false);
    const handlePressSearch = () => {
        setIsSearching(true);
        loadMoreController === null || loadMoreController === void 0 ? void 0 : loadMoreController.setSearching(true);
    };
    const handleCancelSearch = () => {
        setIsSearching(false);
        loadMoreController === null || loadMoreController === void 0 ? void 0 : loadMoreController.setSearching(false);
    };
    const debouncedSearch = (0, react_oop_1.useDebounce)((query) => {
        console.log("debouncedSearch", query);
        if (onSearching) {
            onSearching(query);
        }
        else {
            loadMoreController === null || loadMoreController === void 0 ? void 0 : loadMoreController.search(query);
        }
    }, 300);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.StatusBar, { barStyle: "dark-content", backgroundColor: "transparent", translucent: true }), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: _tabbar_1.tabBarStyles.container }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: _tabbar_1.tabBarStyles.header }, { children: [leftButton &&
                                (leftButton.showBackButton ? ((0, jsx_runtime_1.jsx)(index_1.UIIconButton, Object.assign({ onPress: leftButton.onPress, variant: "ghost", size: "medium", style: _tabbar_1.tabBarStyles.leftButton }, { children: (0, jsx_runtime_1.jsx)(lucide_react_native_1.ChevronLeft, { size: 20, color: "#007AFF" }) }))) : ((0, jsx_runtime_1.jsx)(index_1.UIButton, { title: leftButton.text || "", onPress: leftButton.onPress, variant: "ghost", size: "medium", style: _tabbar_1.tabBarStyles.leftButton }))), title && !isSearching && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: _tabbar_1.tabBarStyles.title }, { children: title }))), couldSearch ? (isSearching ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: { flex: 1, flexDirection: "row", alignItems: "center" } }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: { flex: 1 } }, { children: searchBar !== null && searchBar !== void 0 ? searchBar : ((0, jsx_runtime_1.jsx)(index_1.UIInput, { defaultValue: loadMoreController === null || loadMoreController === void 0 ? void 0 : loadMoreController.searchKeyword, clearButtonMode: "always", placeholder: react_oop_2.Lang.localize("common.search"), autoFocus: true, returnKeyType: "done", onChangeText: (txt) => {
                                                debouncedSearch(txt);
                                            }, inputStyle: {
                                            // backgroundColor: defaultTheme.colors.surfaceVariant,
                                            } })) })), (0, jsx_runtime_1.jsx)(index_1.UIButton, { title: react_oop_2.Lang.localize("common.cancel"), onPress: handleCancelSearch, variant: "ghost", size: "medium", style: {
                                            paddingHorizontal: 8,
                                            height: 44,
                                            marginLeft: 8,
                                        } })] }))) : ((0, jsx_runtime_1.jsx)(index_1.UIIconButton, Object.assign({ onPress: handlePressSearch, variant: "ghost", size: "medium", style: _tabbar_1.tabBarStyles.rightButton }, { children: (0, jsx_runtime_1.jsx)(lucide_react_native_1.Search, { size: 20, color: "#007AFF" }) })))) : (rightButton && ((0, jsx_runtime_1.jsx)(index_1.UIButton, { title: rightButton.text, onPress: rightButton.onPress, variant: "ghost", size: "medium", style: _tabbar_1.tabBarStyles.rightButton })))] })), !isSearching && showLargeTitle && title && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: _tabbar_1.tabBarStyles.largeTitle }, { children: title })))] }))] }));
}
exports.NavigationBar = NavigationBar;
