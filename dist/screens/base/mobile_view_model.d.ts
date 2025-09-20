import { NavigationProp } from '@react-navigation/native';
import { BaseViewModel, GenericCallback } from 'react_oop';
import { BaseScreenParams } from '../../router';
export interface MobileViewModelProps extends BaseScreenParams {
}
export declare class MobileViewModel<P extends MobileViewModelProps = MobileViewModelProps> extends BaseViewModel<P> {
    protected navigation: NavigationProp<any> | undefined;
    private _focusListener?;
    private _blurListener?;
    private _stateListener?;
    get _onReturn(): GenericCallback<any> | undefined;
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