"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const separator_util_1 = require("../../utils/separator_util");
function mapMainAxisAlignment(value) {
    switch (value) {
        case "start":
            return "flex-start";
        case "end":
            return "flex-end";
        case "center":
            return "center";
        case "space-between":
            return "space-between";
        case "space-around":
            return "space-around";
        case "space-evenly":
            return "space-evenly";
        default:
            return undefined;
    }
}
function mapCrossAxisAlignment(value) {
    switch (value) {
        case "start":
            return "flex-start";
        case "end":
            return "flex-end";
        case "center":
            return "center";
        case "stretch":
            return "stretch";
        // 'baseline' is not supported on all platforms; leaving undefined falls back gracefully
        default:
            return undefined;
    }
}
function Row({ children, style, mainAxisAlignment, crossAxisAlignment, wrap, gap, separator, }) {
    const containerStyle = {
        flexDirection: "row",
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        flexWrap: wrap ? "wrap" : "nowrap",
        // gap is supported on modern RN; ignore if not
        gap,
    };
    const renderChildren = () => {
        if (!separator || !children) {
            return children;
        }
        // Convert children to array if it's not already an array
        const childrenArray = Array.isArray(children) ? children : [children];
        if (childrenArray.length <= 1) {
            return children;
        }
        // Use the utility function to add separators
        return (0, separator_util_1.addSeparators)(childrenArray, separator);
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(containerStyle, style) }, { children: renderChildren() })));
}
exports.Row = Row;
