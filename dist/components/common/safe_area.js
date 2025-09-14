"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
function SafeArea({ children, style, edges = ["top", "bottom", "left", "right"], backgroundColor, }) {
    const containerStyle = {
        backgroundColor,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_safe_area_context_1.SafeAreaView, Object.assign({ style: react_native_1.StyleSheet.compose(containerStyle, style), edges: edges }, { children: children })));
}
exports.SafeArea = SafeArea;
