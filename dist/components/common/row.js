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
exports.Row = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
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
// Attempt to load gluestack primitives if present
let GS = null;
try {
    // @ts-ignore - optional dependency
    GS = require("@gluestack-ui/themed");
}
catch (e) {
    GS = null;
}
const RowComponent = ({ children, style, mainAxisAlignment, crossAxisAlignment, wrap, gap, separator, }) => {
    const containerStyle = (0, react_1.useMemo)(() => ({
        flexDirection: "row",
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        flexWrap: wrap ? "wrap" : "nowrap",
        gap,
    }), [mainAxisAlignment, crossAxisAlignment, wrap, gap]);
    const childrenWithSeparators = (0, react_1.useMemo)(() => {
        if (!separator || !children) {
            return children;
        }
        const childrenArray = Array.isArray(children) ? children : [children];
        if (childrenArray.length <= 1) {
            return children;
        }
        return (0, separator_util_1.addSeparators)(childrenArray, separator);
    }, [children, separator]);
    if (GS === null || GS === void 0 ? void 0 : GS.HStack) {
        // Gluestack HStack supports space and flexWrap via props
        const { HStack } = GS;
        return ((0, jsx_runtime_1.jsx)(HStack, Object.assign({ style: style, justifyContent: mapMainAxisAlignment(mainAxisAlignment), alignItems: mapCrossAxisAlignment(crossAxisAlignment), space: gap, flexWrap: wrap ? "wrap" : "nowrap" }, { children: childrenWithSeparators })));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(containerStyle, style) }, { children: childrenWithSeparators })));
};
RowComponent.displayName = "Row";
exports.Row = react_1.default.memo(RowComponent);
