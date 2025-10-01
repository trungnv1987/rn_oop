"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardAvoidingScreen = exports.MobileScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_oop_1 = require("react_oop");
const ui_dialog_1 = require("../../components/dialog/ui_dialog");
const react_native_1 = require("react-native");
const styles_1 = require("../../styles");
function MobileScreen({ viewModel, viewModelContext, children, }) {
    const screen = ((0, jsx_runtime_1.jsxs)(react_oop_1.AppScreen, Object.assign({ viewModel: viewModel, viewModelContext: viewModelContext }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: { flex: 1, padding: styles_1.sizes.md } }, { children: children })), (0, jsx_runtime_1.jsx)(ui_dialog_1.UIDialog, { controller: viewModel.dialogController })] })));
    return screen;
}
exports.MobileScreen = MobileScreen;
function KeyboardAvoidingScreen(props) {
    const behavior = react_native_1.Platform.OS === "ios" ? "padding" : "height";
    return ((0, jsx_runtime_1.jsx)(react_native_1.KeyboardAvoidingView, Object.assign({ style: { flex: 1 }, behavior: behavior, keyboardVerticalOffset: props.keyboardVerticalOffset }, { children: (0, jsx_runtime_1.jsx)(MobileScreen, Object.assign({ viewModel: props.viewModel, viewModelContext: props.viewModelContext, avoidKeyboard: false }, { children: props.children })) })));
}
exports.KeyboardAvoidingScreen = KeyboardAvoidingScreen;
