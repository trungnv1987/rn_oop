"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastUtil = void 0;
const react_native_toast_message_1 = __importDefault(require("react-native-toast-message"));
class ToastUtil {
    static success(message, { description } = {}) {
        react_native_toast_message_1.default.show({
            type: 'success',
            text1: message,
            text2: description,
            position: 'bottom',
        });
    }
    static error(message, { description } = {}) {
        react_native_toast_message_1.default.show({
            type: 'error',
            text1: message,
            text2: description,
            position: 'bottom',
        });
    }
}
exports.ToastUtil = ToastUtil;
