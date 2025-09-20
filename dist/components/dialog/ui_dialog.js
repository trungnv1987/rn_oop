"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const index_1 = require("../index");
const react_oop_1 = require("react_oop");
const styles_1 = require("../../styles");
const theme_1 = require("../../theme");
function UIDialog(props) {
    const { controller, containerStyle } = props;
    return ((0, jsx_runtime_1.jsx)(react_oop_1.UICubit, Object.assign({ cubit: controller.cubit }, { children: (value) => {
            if (!value)
                return null;
            const { title, message, confirmText, cancelText, isDelete, } = value;
            let dismissible = value.dismissible;
            if (dismissible == undefined) {
                dismissible = true;
            }
            const { onFinished } = controller;
            const visible = value != undefined;
            const handleConfirm = () => {
                onFinished === null || onFinished === void 0 ? void 0 : onFinished(true);
            };
            const handleCancel = () => {
                controller.hide();
                onFinished === null || onFinished === void 0 ? void 0 : onFinished(false);
            };
            const backgroundPressed = () => {
                if (dismissible) {
                    controller.hide();
                    onFinished === null || onFinished === void 0 ? void 0 : onFinished(undefined);
                }
            };
            return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, Object.assign({ visible: visible, transparent: true, animationType: "fade", onDismiss: () => {
                    backgroundPressed();
                }, onRequestClose: backgroundPressed }, { children: (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: backgroundPressed, style: styles.backdrop, activeOpacity: 1 }, { children: (0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ activeOpacity: 1, onPress: () => { } }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: [styles.container, containerStyle] }, { children: [title && ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.titleContainer }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.title }, { children: title })) }))), message && ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.messageContainer }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.message }, { children: message })) }))), (0, jsx_runtime_1.jsxs)(index_1.Row, Object.assign({ style: styles.buttonsContainer, gap: styles_1.sizes.md }, { children: [(0, jsx_runtime_1.jsx)(index_1.Expanded, { children: (0, jsx_runtime_1.jsx)(index_1.UIButton, { textStyle: { color: "black" }, title: cancelText || react_oop_1.Lang.localize("common.cancel"), onPress: handleCancel, style: react_native_1.StyleSheet.flatten([
                                                    styles.button,
                                                    styles.cancelButton,
                                                ]) }) }), (0, jsx_runtime_1.jsx)(index_1.Expanded, { children: (0, jsx_runtime_1.jsx)(index_1.UIButton, { title: confirmText ||
                                                    (isDelete
                                                        ? react_oop_1.Lang.localize("action.delete")
                                                        : react_oop_1.Lang.localize("common.confirm")), onPress: handleConfirm, style: react_native_1.StyleSheet.flatten([
                                                    styles.button,
                                                    isDelete ? styles.deleteButton : styles.confirmButton,
                                                ]) }) })] }))] })) })) })) })));
        } })));
}
exports.UIDialog = UIDialog;
const styles = react_native_1.StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: styles_1.sizes.lg,
    },
    container: {
        backgroundColor: theme_1.defaultTheme.colors.surface,
        borderRadius: styles_1.sizes.lg,
        padding: styles_1.sizes.lg,
        minWidth: 280,
        maxWidth: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    titleContainer: {
        marginBottom: styles_1.sizes.md,
    },
    title: {
        fontSize: styles_1.fontSizes.lg,
        fontWeight: "600",
        color: theme_1.defaultTheme.colors.onSurface,
        textAlign: "center",
    },
    messageContainer: {
        marginBottom: styles_1.sizes.lg,
    },
    message: {
        fontSize: styles_1.fontSizes.md,
        color: theme_1.defaultTheme.colors.onSurface,
        textAlign: "center",
        lineHeight: 22,
    },
    buttonsContainer: {
        marginTop: styles_1.sizes.sm,
    },
    button: {
        minHeight: 44,
    },
    cancelButton: {
        backgroundColor: "#F3F4F6",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    cancelButtonText: {
        color: theme_1.defaultTheme.colors.onSurface,
        fontSize: styles_1.fontSizes.md,
        fontWeight: "500",
    },
    confirmButton: {
        backgroundColor: theme_1.defaultTheme.colors.primary,
    },
    deleteButton: {
        backgroundColor: "#DC2626", // Red color for delete actions
    },
    confirmButtonText: {
        color: "#FFFFFF",
        fontSize: styles_1.fontSizes.md,
        fontWeight: "500",
    },
});
