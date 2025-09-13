"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spacing = exports.sizes = void 0;
const react_native_1 = require("react-native");
exports.sizes = react_native_1.StyleSheet.create({
    fullParent: {
        width: '100%',
        height: '100%',
    },
    fullParentWidth: {
        width: '100%',
    },
    fullParentHeight: {
        height: '100%',
    },
});
exports.spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};
