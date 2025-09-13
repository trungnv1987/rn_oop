"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
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
        default:
            return undefined;
    }
}
function Column({ children, style, mainAxisAlignment, crossAxisAlignment, gap, separator, }) {
    const containerStyle = {
        flexDirection: "column",
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
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
exports.Column = Column;
