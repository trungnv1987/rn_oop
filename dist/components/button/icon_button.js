"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIIconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = require("../../theme/theme");
const react_native_1 = require("react-native");
function UIIconButton({ onPress, style, variant = "ghost", size = "medium", disabled = false, children, }) {
    const buttonStyle = [
        styles.base,
        styles[size],
        styles[variant],
        disabled && styles.disabled,
        style,
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: onPress, style: buttonStyle, disabled: disabled, activeOpacity: 0.8 }, { children: children })));
}
exports.UIIconButton = UIIconButton;
const styles = react_native_1.StyleSheet.create({
    base: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme_1.defaultTheme.borderRadius.md,
        flexDirection: "row",
    },
    // Size variants
    small: {
        padding: theme_1.defaultTheme.spacing.sm,
        minHeight: 36,
        minWidth: 36,
    },
    medium: {
        padding: theme_1.defaultTheme.spacing.md,
        minHeight: 44,
        minWidth: 44,
    },
    large: {
        padding: theme_1.defaultTheme.spacing.lg,
        minHeight: 52,
        minWidth: 52,
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
    // States
    disabled: {
        opacity: 0.5,
    },
});
