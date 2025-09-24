"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expanded = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
// Optional gluestack import
let GS = null;
try {
    // @ts-ignore
    GS = require("@gluestack-ui/themed");
}
catch (e) {
    GS = null;
}
function Expanded({ children, style, flex = 1 }) {
    if (GS === null || GS === void 0 ? void 0 : GS.Box) {
        const { Box } = GS;
        return ((0, jsx_runtime_1.jsx)(Box, Object.assign({ style: style, flex: flex }, { children: children })));
    }
    const expandedStyle = {
        flex,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(expandedStyle, style) }, { children: children })));
}
exports.Expanded = Expanded;
