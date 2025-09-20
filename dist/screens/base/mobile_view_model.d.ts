import { NavigationProp } from '@react-navigation/native';
import { AppViewModel, AppViewModelProps } from '../../view_model/app_view_model';
export declare class MobileViewModel<P extends AppViewModelProps = AppViewModelProps> extends AppViewModel<P> {
    protected navigation: NavigationProp<any> | undefined;
    private _focusListener?;
    private _blurListener?;
    private _stateListener?;
    private _originNavigationId;
    pushScreen<T = any>(routeName: string, params?: any): Promise<T | undefined>;
    popScreen({ value }: {
        value?: any;
    }): Promise<undefined>;
    popToScreen(routeName: string): void;
    setNavigation(navigation: NavigationProp<any>): void;
    private _setupNavigationListeners;
    private _cleanupNavigationListeners;
}
//# sourceMappingURL=mobile_view_model.d.ts.map