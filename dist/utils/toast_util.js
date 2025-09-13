"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastUtil = void 0;
const theme_1 = require("../theme/theme");
const react_native_root_toast_1 = __importDefault(require("react-native-root-toast"));
class ToastUtil {
    static success(message, { position = react_native_root_toast_1.default.positions.BOTTOM, duration = react_native_root_toast_1.default.durations.LONG } = {}) {
        react_native_root_toast_1.default.show(message, {
            duration: duration,
            position: position,
            backgroundColor: theme_1.defaultTheme.colors.success,
            containerStyle: { width: '100%' },
        });
    }
}
exports.ToastUtil = ToastUtil;
