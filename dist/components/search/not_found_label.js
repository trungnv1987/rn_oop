"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundLabel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _fonts_1 = require("../../styles/_fonts");
const react_native_1 = require("react-native");
const react_oop_1 = require("react_oop");
function NotFoundLabel({ text, style }) {
    const _text = text !== null && text !== void 0 ? text : react_oop_1.Lang.localize("common.noResultsFound");
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: Object.assign({ flex: 1, justifyContent: "center", alignItems: "center" }, (style !== null && style !== void 0 ? style : {})) }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: { fontSize: _fonts_1.fonts.large.fontSize, color: "#666" } }, { children: _text })) })));
}
exports.NotFoundLabel = NotFoundLabel;
