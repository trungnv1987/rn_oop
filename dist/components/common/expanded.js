"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expanded = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
function Expanded({ children, style, flex = 1 }) {
    const expandedStyle = {
        // In RN, numeric `flex` maps to flexGrow, flexShrink: 1, flexBasis: 0
        flex,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(expandedStyle, style) }, { children: children })));
}
exports.Expanded = Expanded;
