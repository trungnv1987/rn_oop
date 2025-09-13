"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = exports.VerticalSpacing = exports.HorizontalSpacing = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme/theme");
const _sizes_1 = require("../../styles/_sizes");
function _Spacing({ isHorizontal, size = 10, }) {
    const _isHorizontal = isHorizontal == true;
    const height = _isHorizontal ? undefined : size;
    const width = _isHorizontal ? size : undefined;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                height: height,
                width: width,
            },
        ] }));
}
function HorizontalSpacing({ size = _sizes_1.spacing.md }) {
    return (0, jsx_runtime_1.jsx)(_Spacing, { isHorizontal: true, size: size });
}
exports.HorizontalSpacing = HorizontalSpacing;
function VerticalSpacing({ size = _sizes_1.spacing.md }) {
    return (0, jsx_runtime_1.jsx)(_Spacing, { isHorizontal: false, size: size });
}
exports.VerticalSpacing = VerticalSpacing;
function Separator({ padding, margin, color }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [
            styles.separator,
            {
                marginVertical: margin,
                backgroundColor: color || theme_1.defaultTheme.colors.borderVariant,
            },
        ] }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: padding } }) })));
}
exports.Separator = Separator;
const styles = react_native_1.StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: theme_1.defaultTheme.colors.borderVariant,
    },
});
