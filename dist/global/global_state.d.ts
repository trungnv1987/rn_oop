import { GenericCubit } from "react_oop";
import { LoginCredential } from "react_oop";
interface _GlobalState {
    get isLoggedIn(): boolean;
    init(): Promise<void>;
    uploadLogin(): Promise<void>;
}
declare class GlobalState implements _GlobalState {
    private static _instance;
    private constructor();
    init(): Promise<void>;
    static shared(): GlobalState;
    loginCubit: GenericCubit<LoginCredential>;
    get isLoggedIn(): boolean;
    uploadLogin(): Promise<void>;
}
export declare const globalState: GlobalState;
export {};
//# sourceMappingURL=global_state.d.ts.map