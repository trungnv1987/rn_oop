import { BaseViewModel, BaseViewModelProps } from "react_oop";
export interface AppViewModelProps extends BaseViewModelProps {
}
export declare abstract class AppViewModel<P extends AppViewModelProps> extends BaseViewModel<P> {
    constructor(props?: P);
}
//# sourceMappingURL=app_view_model.d.ts.map