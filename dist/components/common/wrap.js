"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
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
let GS = null;
try {
    // @ts-ignore - optional dependency
    GS = require("@gluestack-ui/themed");
}
catch (e) {
    GS = null;
}
function Wrap({ children, style, direction = "horizontal", alignment = "start", runAlignment = "start", crossAxisAlignment = "start", spacing = 0, runSpacing = 0, separator, }) {
    const containerStyle = (0, react_1.useMemo)(() => ({
        flexDirection: direction === "horizontal" ? "row" : "column",
        flexWrap: "wrap",
        justifyContent: mapAlignment(alignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        alignContent: mapAlignContent(runAlignment),
        gap: spacing,
        rowGap: runSpacing,
        columnGap: spacing,
    }), [
        direction,
        alignment,
        crossAxisAlignment,
        runAlignment,
        spacing,
        runSpacing,
    ]);
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
    if (GS === null || GS === void 0 ? void 0 : GS.Wrap) {
        const { Wrap: GSWrap } = GS;
        return ((0, jsx_runtime_1.jsx)(GSWrap, Object.assign({ style: style, 
            // Gluestack Wrap supports direction and space props
            direction: direction === "horizontal" ? "row" : "column", justifyContent: mapAlignment(alignment), alignItems: mapCrossAxisAlignment(crossAxisAlignment), alignContent: mapAlignContent(runAlignment), space: spacing, rowGap: runSpacing, columnGap: spacing }, { children: spacing === 0 && runSpacing === 0 ? renderChildren() : wrappedChildren })));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(containerStyle, style) }, { children: spacing === 0 && runSpacing === 0 ? renderChildren() : wrappedChildren })));
}
exports.Wrap = Wrap;
