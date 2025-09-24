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
exports.Column = void 0;
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
        default:
            return undefined;
    }
}
// Attempt optional gluestack import
let GS = null;
try {
    // @ts-ignore - optional dependency
    GS = require("@gluestack-ui/themed");
}
catch (e) {
    GS = null;
}
const ColumnComponent = ({ children, style, mainAxisAlignment, crossAxisAlignment, gap, separator, }) => {
    const containerStyle = (0, react_1.useMemo)(() => ({
        flexDirection: "column",
        justifyContent: mapMainAxisAlignment(mainAxisAlignment),
        alignItems: mapCrossAxisAlignment(crossAxisAlignment),
        gap,
    }), [mainAxisAlignment, crossAxisAlignment, gap]);
    const renderChildren = () => {
        if (!separator || !children) {
            return children;
        }
        const childrenArray = Array.isArray(children) ? children : [children];
        if (childrenArray.length <= 1) {
            return children;
        }
        return (0, separator_util_1.addSeparators)(childrenArray, separator);
    };
    if (GS === null || GS === void 0 ? void 0 : GS.VStack) {
        const { VStack } = GS;
        return ((0, jsx_runtime_1.jsx)(VStack, Object.assign({ style: style, justifyContent: mapMainAxisAlignment(mainAxisAlignment), alignItems: mapCrossAxisAlignment(crossAxisAlignment), space: gap }, { children: renderChildren() })));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: react_native_1.StyleSheet.compose(containerStyle, style) }, { children: renderChildren() })));
};
ColumnComponent.displayName = "Column";
exports.Column = react_1.default.memo(ColumnComponent);
