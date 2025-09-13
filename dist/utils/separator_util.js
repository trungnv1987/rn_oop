"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHorizontalSpacing = exports.addVerticalSpacing = exports.addSeparators = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * Adds separators between ReactNode elements in an array
 * @param items Array of ReactNode elements
 * @param separator ReactNode to insert between items
 * @returns Array with separators inserted between items
 */
function addSeparators(items, separator) {
    console.log('addSeparators - items length:', items === null || items === void 0 ? void 0 : items.length);
    console.log('addSeparators - separator:', separator);
    console.log('addSeparators - separator isValidElement:', react_1.default.isValidElement(separator));
    if (!items || items.length <= 1) {
        console.log('addSeparators - returning original items (length <= 1)');
        return items;
    }
    const result = [];
    items.forEach((item, index) => {
        // Add the item
        result.push(item);
        // Add separator between items (not after the last item)
        if (index < items.length - 1) {
            console.log(`addSeparators - adding separator at index ${index}`);
            // Check if separator is a React element that can be cloned
            if (react_1.default.isValidElement(separator)) {
                const clonedSeparator = react_1.default.cloneElement(separator, {
                    key: `separator-${index}`,
                });
                console.log('addSeparators - cloned separator:', clonedSeparator);
                result.push(clonedSeparator);
            }
            else {
                // If separator is not a React element, just add it as is
                result.push(separator);
            }
        }
    });
    console.log('addSeparators - final result length:', result.length);
    return result;
}
exports.addSeparators = addSeparators;
/**
 * Adds vertical spacing between ReactNode elements in an array (React Native)
 * @param items Array of ReactNode elements
 * @param spacing Size of spacing in pixels
 * @returns Array with spacing views inserted between items
 */
function addVerticalSpacing(items, spacing) {
    if (!items || items.length <= 1) {
        return items;
    }
    const result = [];
    items.forEach((item, index) => {
        // Add the item
        result.push(item);
        // Add spacing between items (not after the last item)
        if (index < items.length - 1) {
            result.push((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: spacing } }) }, `vertical-spacing-${index}`));
        }
    });
    return result;
}
exports.addVerticalSpacing = addVerticalSpacing;
/**
 * Adds horizontal spacing between ReactNode elements in an array (React Native)
 * @param items Array of ReactNode elements
 * @param spacing Size of spacing in pixels
 * @returns Array with spacing views inserted between items
 */
function addHorizontalSpacing(items, spacing) {
    if (!items || items.length <= 1) {
        return items;
    }
    const result = [];
    items.forEach((item, index) => {
        // Add the item
        result.push(item);
        // Add spacing between items (not after the last item)
        if (index < items.length - 1) {
            result.push((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: spacing } }) }, `horizontal-spacing-${index}`));
        }
    });
    return result;
}
exports.addHorizontalSpacing = addHorizontalSpacing;
