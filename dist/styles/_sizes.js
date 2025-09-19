"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizes = exports.fontSizes = exports.containerSizes = void 0;
const react_native_1 = require("react-native");
exports.containerSizes = react_native_1.StyleSheet.create({
    fullParent: {
        width: "100%",
        height: "100%",
    },
    fullParentWidth: {
        width: "100%",
    },
    fullParentHeight: {
        height: "100%",
    },
});
exports.fontSizes = {
    xs: 12,
    sm: 14,
    md: 15,
    lg: 18,
    xl: 20,
};
exports.sizes = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
};
