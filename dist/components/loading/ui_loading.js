"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UILoading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("../../theme/theme");
const react_oop_1 = require("react_oop");
function UILoading({ children, cubit, loadingText = "Loading...", style, overlayStyle, indicatorColor, textColor, backgroundColor, }) {
    const defaultIndicatorColor = indicatorColor || theme_1.defaultTheme.colors.accent;
    const defaultTextColor = textColor || theme_1.defaultTheme.colors.onSurface;
    const defaultBackgroundColor = backgroundColor || theme_1.defaultTheme.colors.surface;
    const [visible, setVisible] = (0, react_1.useState)(cubit.value);
    const callback = (value) => {
        setVisible(value);
    };
    (0, react_1.useEffect)(() => {
        cubit.addCallback(callback);
        return () => {
            cubit.removeCallback(callback);
        };
    }, [cubit]);
    return ((0, jsx_runtime_1.jsx)(react_oop_1.UICubit, Object.assign({ cubit: cubit }, { children: (value) => {
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [{ flex: 1 }, style] }, { children: [children, visible && ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [
                            styles.overlay,
                            { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                            overlayStyle,
                        ] }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.loadingContainer }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "large", color: defaultIndicatorColor, style: styles.indicator }), loadingText && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [styles.loadingText, { color: defaultTextColor }] }, { children: loadingText })))] })) })))] })));
        } })));
}
exports.UILoading = UILoading;
const styles = react_native_1.StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 12,
        minWidth: 120,
        minHeight: 120,
    },
    indicator: {
        marginBottom: 12,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
});
