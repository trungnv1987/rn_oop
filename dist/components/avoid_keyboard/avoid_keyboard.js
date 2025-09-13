"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIAvoidKeyboard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
function UIAvoidKeyboard({ children, style }) {
    const dismissKeyboard = () => {
        react_native_1.Keyboard.dismiss();
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableWithoutFeedback, Object.assign({ onPress: dismissKeyboard }, { children: (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [{ flex: 1 }, style] }, { children: children })) })));
}
exports.UIAvoidKeyboard = UIAvoidKeyboard;
