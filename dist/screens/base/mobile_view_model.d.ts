import { NavigationProp } from '@react-navigation/native';
import { BaseViewModel, GenericCallback } from 'react_oop';
import { BaseScreenParams } from '../../router';
import { UIDialogController, UIDialogDisplayProps } from '../../components/dialog/ui_dialog_controller';
export interface MobileViewModelProps extends BaseScreenParams {
}
export declare class MobileViewModel<P extends MobileViewModelProps = MobileViewModelProps> extends BaseViewModel<P> {
    protected navigation: NavigationProp<any> | undefined;
    private _focusListener?;
    private _blurListener?;
    private _stateListener?;
    private _currentRouteKey;
    dialogController: UIDialogController;
    get _onReturn(): GenericCallback<any> | undefined;
    private _originNavigationId;
    pushScreen<T = any>(routeName: string, params?: any): Promise<T | undefined>;
    _popedValue?: any;
    popScreen({ value }: {
        value?: any;
    }): Promise<void>;
    popToScreen(routeName: string): void;
    showConfirmDialog(props: UIDialogDisplayProps): Promise<boolean | undefined>;
    dispose(): void;
    setNavigation(navigation: NavigationProp<any>): void;
    _isCreated?: boolean;
    private _setupNavigationListeners;
    viewDidDisappear(isDismissed: boolean): void;
    private _cleanupNavigationListeners;
}
//# sourceMappingURL=mobile_view_model.d.ts.map