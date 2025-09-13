"use strict";
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
exports.UIInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = require("../../theme/theme");
const _fonts_1 = require("../../styles/_fonts");
const react_native_1 = require("react-native");
function UIInput(_a) {
    var { label, error, containerStyle, labelStyle, inputStyle = styles.input, errorStyle, variant = "default", size = "medium", fullWidth = false } = _a, props = __rest(_a, ["label", "error", "containerStyle", "labelStyle", "inputStyle", "errorStyle", "variant", "size", "fullWidth"]);
    const inputContainerStyle = [
        styles.container,
        fullWidth && styles.fullWidth,
        containerStyle,
    ];
    const inputComposedStyle = [
        styles.input,
        styles[variant],
        styles[size],
        error && styles.inputError,
        inputStyle,
    ];
    const labelComposedStyle = [styles.label, styles[`${size}Label`], labelStyle];
    const errorComposedStyle = [styles.error, errorStyle];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: inputContainerStyle }, { children: [label && (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: labelComposedStyle }, { children: label })), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, Object.assign({ style: inputComposedStyle, autoCapitalize: "none", autoCorrect: false, placeholderTextColor: theme_1.defaultTheme.colors.onSurfaceVariant }, props)), error && (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: errorComposedStyle }, { children: error }))] })));
}
exports.UIInput = UIInput;
const styles = react_native_1.StyleSheet.create({
    container: {
        marginBottom: theme_1.defaultTheme.spacing.md,
    },
    fullWidth: {
        width: "100%",
    },
    label: {
        fontSize: _fonts_1.fonts.default.fontSize,
        fontWeight: _fonts_1.fontWeights.medium.fontWeight,
        color: theme_1.defaultTheme.colors.onSurfaceVariant,
        marginBottom: theme_1.defaultTheme.spacing.sm,
    },
    smallLabel: {
        fontSize: _fonts_1.fonts.small.fontSize,
    },
    mediumLabel: {
        fontSize: _fonts_1.fonts.default.fontSize,
    },
    largeLabel: {
        fontSize: _fonts_1.fonts.large.fontSize,
    },
    input: {
        borderWidth: 1,
        borderColor: theme_1.defaultTheme.colors.border,
        borderRadius: theme_1.defaultTheme.borderRadius.md,
        paddingHorizontal: theme_1.defaultTheme.spacing.md,
        fontSize: _fonts_1.fonts.default.fontSize,
        backgroundColor: theme_1.defaultTheme.colors.background,
        color: theme_1.defaultTheme.colors.onSurface,
    },
    // Variant styles
    default: {
        borderColor: theme_1.defaultTheme.colors.border,
    },
    outlined: {
        borderColor: theme_1.defaultTheme.colors.border,
        backgroundColor: "transparent",
    },
    filled: {
        borderColor: "transparent",
        backgroundColor: theme_1.defaultTheme.colors.surfaceVariant,
    },
    // Size variants
    small: {
        paddingVertical: theme_1.defaultTheme.spacing.sm,
        minHeight: 36,
    },
    medium: {
        paddingVertical: theme_1.defaultTheme.spacing.md,
        minHeight: 44,
    },
    large: {
        paddingVertical: theme_1.defaultTheme.spacing.lg,
        minHeight: 52,
    },
    // States
    inputError: {
        borderColor: theme_1.defaultTheme.colors.error,
    },
    error: {
        fontSize: _fonts_1.fonts.small.fontSize,
        color: theme_1.defaultTheme.colors.error,
        marginTop: theme_1.defaultTheme.spacing.xs,
        marginLeft: theme_1.defaultTheme.spacing.sm,
    },
});
