"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformImpl = void 0;
const react_oop_1 = require("react_oop");
const react_native_encrypted_storage_1 = __importDefault(require("react-native-encrypted-storage"));
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
class PlatformImpl {
    static async init() {
        this.secureStorage = {
            getItem: react_native_encrypted_storage_1.default.getItem,
            setItem: react_native_encrypted_storage_1.default.setItem,
            removeItem: react_native_encrypted_storage_1.default.removeItem,
            clear: react_native_encrypted_storage_1.default.clear,
        };
        this.localStorage = {
            getItem: async_storage_1.default.getItem,
            setItem: async_storage_1.default.setItem,
            removeItem: async_storage_1.default.removeItem,
            clear: async_storage_1.default.clear,
        };
        await react_oop_1.AppStorage.init({
            secureStorage: this.secureStorage,
            localStorage: this.localStorage,
        });
    }
}
exports.PlatformImpl = PlatformImpl;
