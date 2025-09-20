"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_oop_1 = require("react_oop");
const components_1 = require("../../components");
const ui_dialog_1 = require("../../components/dialog/ui_dialog");
function MobileScreen({ viewModel, viewModelContext, children, }) {
    return ((0, jsx_runtime_1.jsxs)(react_oop_1.AppScreen, Object.assign({ viewModel: viewModel, viewModelContext: viewModelContext }, { children: [(0, jsx_runtime_1.jsx)(components_1.UIAvoidKeyboard, { children: (0, jsx_runtime_1.jsx)(components_1.UILoading, Object.assign({ cubit: viewModel.loadingCubit }, { children: children })) }), (0, jsx_runtime_1.jsx)(ui_dialog_1.UIDialog, { controller: viewModel.dialogController })] })));
}
exports.MobileScreen = MobileScreen;
