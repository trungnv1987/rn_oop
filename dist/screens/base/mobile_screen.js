"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_oop_1 = require("react_oop");
const ui_dialog_1 = require("../../components/dialog/ui_dialog");
const react_native_1 = require("react-native");
function MobileScreen({ viewModel, viewModelContext, children, }) {
    return ((0, jsx_runtime_1.jsx)(react_native_1.KeyboardAvoidingView, Object.assign({ style: { flex: 1 }, behavior: "padding", keyboardVerticalOffset: 100 }, { children: (0, jsx_runtime_1.jsxs)(react_oop_1.AppScreen, Object.assign({ viewModel: viewModel, viewModelContext: viewModelContext }, { children: [children, (0, jsx_runtime_1.jsx)(ui_dialog_1.UIDialog, { controller: viewModel.dialogController })] })) })));
}
exports.MobileScreen = MobileScreen;
