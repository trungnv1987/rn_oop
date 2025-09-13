"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.card = exports.fontWeights = exports.fonts = void 0;
const theme_1 = require("../theme/theme");
const react_native_1 = require("react-native");
exports.fonts = react_native_1.StyleSheet.create({
    small: {
        fontSize: 12,
    },
    default: {
        fontSize: 14,
    },
    large: {
        fontSize: 16,
    },
    title: {
        fontSize: 18,
    },
    button: {
        fontSize: 16,
    },
    appbarTitle: {
        fontSize: 24,
    },
});
exports.fontWeights = react_native_1.StyleSheet.create({
    light: {
        fontWeight: "300",
    },
    regular: {
        fontWeight: "400",
    },
    medium: {
        fontWeight: "500",
    },
    semibold: {
        fontWeight: "600",
    },
    bold: {
        fontWeight: "700",
    },
});
exports.card = react_native_1.StyleSheet.create({
    title: Object.assign(Object.assign(Object.assign({}, exports.fonts.large), exports.fontWeights.bold), { color: theme_1.defaultTheme.colors.onSurface }),
    subtitle: Object.assign(Object.assign(Object.assign({}, exports.fonts.default), exports.fontWeights.regular), { color: theme_1.defaultTheme.colors.onSurfaceVariant }),
});
