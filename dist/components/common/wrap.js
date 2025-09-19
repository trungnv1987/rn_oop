"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const separator_util_1 = require("../../utils/separator_util");
function mapAlignment(value) {
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
            return "flex-start";
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
            return "flex-start";
    }
}
function mapAlignContent(value) {
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
            return "flex-start";
    }
}
function Wrap({ children, style, direction = "horizontal", alignment = "start", runAlignment = "start", crossAxisAlignment = "start", spacing = 0, runSpacing = 0, separator, }) {
    const containerStyle = {
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: "wrap",
        justifyContent: mapAlignment(alignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        alignContent: mapAlignContent(runAlignment),
        gap: spacing,
        rowGap: runSpacing,
        columnGap: spacing,
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
    // If spacing is provided and no gap support, we need to wrap children with margin
    const wrappedChildren = react_1.default.useMemo(() => {
        if (spacing === 0 && runSpacing === 0) {
            return renderChildren();
        }
        const childrenToRender = renderChildren();
        if (!childrenToRender)
            return null;
        const childrenArray = Array.isArray(childrenToRender)
            ? childrenToRender
            : [childrenToRender];
        return childrenArray.map((child, index) => {
            if (!react_1.default.isValidElement(child)) {
                return child;
            }
            // Apply spacing as margin to each child for better cross-platform compatibility
            const marginStyle = {};
            if (direction === "horizontal") {
                if (index > 0)
                    marginStyle.marginLeft = spacing;
                marginStyle.marginBottom = runSpacing;
            }
            else {
                if (index > 0)
                    marginStyle.marginTop = spacing;
                marginStyle.marginRight = runSpacing;
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: marginStyle }, { children: child }), index));
        });
    }, [children, spacing, runSpacing, direction, separator]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(containerStyle, style) }, { children: spacing === 0 && runSpacing === 0 ? renderChildren() : wrappedChildren })));
}
exports.Wrap = Wrap;
