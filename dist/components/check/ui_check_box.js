"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UICheckBox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const lucide_react_native_1 = require("lucide-react-native");
const _fonts_1 = require("../../styles/_fonts");
const theme_1 = require("../../theme/theme");
const index_1 = require("../index");
const styles_1 = require("../../styles/styles");
function UICheckBox({ selected = false, onChanged, label, labelStyle, style, disabled = false, size = "medium", }) {
    const handlePress = () => {
        if (!disabled && onChanged) {
            onChanged(!selected);
        }
    };
    const checkboxSize = size === "small" ? 16 : size === "large" ? 24 : 20;
    const iconSize = size === "small" ? 12 : size === "large" ? 18 : 14;
    const icon = selected ? ((0, jsx_runtime_1.jsx)(lucide_react_native_1.Check, { size: iconSize, color: styles.selected.borderColor })) : null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: handlePress, style: [styles.container, style], disabled: disabled, activeOpacity: 0.7 }, { children: (0, jsx_runtime_1.jsxs)(index_1.Row, Object.assign({ crossAxisAlignment: "center", separator: (0, jsx_runtime_1.jsx)(index_1.HorizontalSpacing, { size: styles_1.spacing.sm }) }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [
                        styles.checkbox,
                        styles[size],
                        selected && styles.selected,
                        disabled && styles.disabled,
                    ] }, { children: icon })), label && ((0, jsx_runtime_1.jsx)(index_1.Expanded, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                            styles.label,
                            styles[`${size}Label`],
                            disabled && styles.disabledLabel,
                            labelStyle,
                        ] }, { children: label })) }))] })) })));
}
exports.UICheckBox = UICheckBox;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        borderWidth: 2,
        borderColor: theme_1.defaultTheme.colors.border,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme_1.defaultTheme.borderRadius.sm,
    },
    // Size variants
    small: {
        width: 16,
        height: 16,
    },
    medium: {
        width: 20,
        height: 20,
    },
    large: {
        width: 24,
        height: 24,
    },
    // Selected state
    selected: {
        borderColor: theme_1.defaultTheme.colors.accent,
    },
    // Disabled state
    disabled: {
        opacity: 0.5,
        borderColor: theme_1.defaultTheme.colors.borderVariant,
    },
    // Label styles
    label: Object.assign(Object.assign({ color: theme_1.defaultTheme.colors.onSurface }, _fonts_1.fonts.default), _fonts_1.fontWeights.regular),
    smallLabel: Object.assign({}, _fonts_1.fonts.small),
    mediumLabel: Object.assign({}, _fonts_1.fonts.default),
    largeLabel: Object.assign({}, _fonts_1.fonts.large),
    disabledLabel: {
        color: theme_1.defaultTheme.colors.onSurfaceVariant,
        opacity: 0.6,
    },
});
