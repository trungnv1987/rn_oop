"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const _fonts_1 = require("../../styles/_fonts");
const theme_1 = require("../../theme/theme");
const react_native_1 = require("react-native");
function UIButton({ title, onPress, style, textStyle, variant = "primary", size = "medium", disabled = false, fullWidth = false, }) {
    const buttonStyle = [
        styles.base,
        styles[size],
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];
    const textStyleComposed = [
        styles.text,
        styles[`${size}Text`],
        styles[`${variant}Text`],
        disabled && styles.disabledText,
        textStyle,
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: onPress, style: buttonStyle, disabled: disabled, activeOpacity: 0.8 }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: textStyleComposed }, { children: title })) })));
}
exports.UIButton = UIButton;
const styles = react_native_1.StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme_1.defaultTheme.borderRadius.md,
        flexDirection: "row",
    },
    // Size variants
    small: {
        paddingVertical: theme_1.defaultTheme.spacing.sm,
        paddingHorizontal: theme_1.defaultTheme.spacing.md,
        minHeight: 36,
    },
    medium: {
        paddingVertical: theme_1.defaultTheme.spacing.md,
        paddingHorizontal: theme_1.defaultTheme.spacing.lg,
        minHeight: 44,
    },
    large: {
        paddingVertical: theme_1.defaultTheme.spacing.lg,
        paddingHorizontal: theme_1.defaultTheme.spacing.xl,
        minHeight: 52,
    },
    // Variant styles
    primary: Object.assign({ backgroundColor: theme_1.defaultTheme.colors.accent }, theme_1.defaultTheme.shadows.small),
    secondary: {
        backgroundColor: theme_1.defaultTheme.colors.surfaceVariant,
    },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: theme_1.defaultTheme.colors.border,
    },
    ghost: {
        backgroundColor: "transparent",
    },
    // Text styles
    text: {
        fontSize: _fonts_1.fonts.default.fontSize,
        fontWeight: _fonts_1.fontWeights.medium.fontWeight,
        textAlign: "center",
    },
    smallText: {
        fontSize: _fonts_1.fonts.small.fontSize,
    },
    mediumText: {
        fontSize: _fonts_1.fonts.default.fontSize,
    },
    largeText: {
        fontSize: _fonts_1.fonts.large.fontSize,
    },
    // Variant text colors
    primaryText: {
        color: theme_1.defaultTheme.colors.background,
    },
    secondaryText: {
        color: theme_1.defaultTheme.colors.onSurface,
    },
    outlineText: {
        color: theme_1.defaultTheme.colors.onSurface,
    },
    ghostText: {
        color: theme_1.defaultTheme.colors.accent,
    },
    // States
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },
    // Layout
    fullWidth: {
        width: "100%",
    },
});
