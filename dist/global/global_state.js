"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalState = void 0;
const react_oop_1 = require("react_oop");
const react_oop_2 = require("react_oop");
class GlobalState {
    constructor() {
        this.loginCubit = new react_oop_1.GenericCubit(undefined);
    }
    async init() {
        await this.uploadLogin();
    }
    static shared() {
        if (!GlobalState._instance) {
            GlobalState._instance = new GlobalState();
        }
        return GlobalState._instance;
    }
    get isLoggedIn() {
        return this.loginCubit.value !== undefined;
    }
    async uploadLogin() {
        const loginInfo = await react_oop_2.AuthStorage.getCredential();
        if (loginInfo) {
            this.loginCubit.update(loginInfo);
        }
    }
}
exports.globalState = GlobalState.shared();
