import { GenericCubit } from "react_oop";
import { AuthStorage, LoginCredential } from "react_oop";

interface _GlobalState {
    get isLoggedIn(): boolean;
    init(): Promise<void>;
    uploadLogin():Promise<void>;
}   

class GlobalState implements _GlobalState {
    private static _instance: GlobalState;

    private constructor() { }
    
    async init(): Promise<void> {
        await this.uploadLogin();
    }

    static shared(): GlobalState {
            if (!GlobalState._instance) {
            GlobalState._instance = new GlobalState();
        }
        return GlobalState._instance;
    }
    loginCubit = new GenericCubit<LoginCredential>(undefined);


    get isLoggedIn(): boolean {
        return this.loginCubit.value !== undefined;
    }
    
    async uploadLogin() {
        const loginInfo = await AuthStorage.getCredential();
        if (loginInfo) {
            this.loginCubit.update(loginInfo);
        }
    }

}

export const globalState = GlobalState.shared();