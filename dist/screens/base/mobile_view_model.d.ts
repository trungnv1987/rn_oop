import { NavigationProp } from '@react-navigation/native';
import { NavigationParams, RouterType } from '../../router/routers';
import { AppViewModel, AppViewModelProps } from '../../view_model/app_view_model';
export declare class MobileViewModel extends AppViewModel<AppViewModelProps> {
    protected navigation: NavigationProp<NavigationParams> | undefined;
    private _focusListener?;
    private _blurListener?;
    private _stateListener?;
    private _originNavigationId;
    constructor(props?: AppViewModelProps);
    pushScreen<T = any>(routeName: RouterType, params?: any): Promise<T | undefined>;
    popScreen({ value }: {
        value?: any;
    }): Promise<undefined>;
    popToScreen(routeName: RouterType): void;
    setNavigation(navigation: NavigationProp<NavigationParams>): void;
    private _setupNavigationListeners;
    private _cleanupNavigationListeners;
}
//# sourceMappingURL=mobile_view_model.d.ts.map