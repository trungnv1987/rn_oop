"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageView = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const ui_page_view_controller_1 = require("./ui_page_view_controller");
exports.PageView = (0, react_1.forwardRef)((_a, ref) => {
    var { children, pageBuilder, pageCount, controller, scrollCallbacks, pageCallbacks, contentContainerStyle, style, onScrollToTop, onScrollToBottom } = _a, pagerViewProps = __rest(_a, ["children", "pageBuilder", "pageCount", "controller", "scrollCallbacks", "pageCallbacks", "contentContainerStyle", "style", "onScrollToTop", "onScrollToBottom"]);
    const pagerViewRef = (0, react_1.useRef)(null);
    const pageViewController = (0, react_1.useRef)(controller || new ui_page_view_controller_1.UIPageViewController());
    // Calculate page count
    const totalPageCount = pageCount ||
        (pageBuilder ? pageCount : children ? react_1.default.Children.count(children) : 0);
    // Set up the controller
    react_1.default.useEffect(() => {
        if (pageViewController.current) {
            pageViewController.current.setPagerViewRef(pagerViewRef);
            pageViewController.current.setTotalPages(totalPageCount);
            const scrollCallbacksToSet = Object.assign({ onScrollToTop,
                onScrollToBottom }, scrollCallbacks);
            pageViewController.current.setCallbacks(scrollCallbacksToSet, pageCallbacks);
        }
    }, [
        scrollCallbacks,
        pageCallbacks,
        onScrollToTop,
        onScrollToBottom,
        totalPageCount,
    ]);
    // Render pages using pageBuilder or children
    const renderPages = () => {
        if (pageBuilder && pageCount) {
            return Array.from({ length: pageCount }, (_, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: { flex: 1 } }, { children: pageBuilder(index) }), index)));
        }
        return children;
    };
    // Expose the controller directly as the ref
    (0, react_1.useImperativeHandle)(ref, () => pageViewController.current);
    const defaultStyle = {
        flex: 1,
    };
    // For now, we'll use a simple View wrapper until PagerView is properly installed
    // In a real implementation, you would import and use react-native-pager-view
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ ref: pagerViewRef, style: [defaultStyle, style] }, pagerViewProps, { children: renderPages() })));
});
exports.PageView.displayName = "PageView";
