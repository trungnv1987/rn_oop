import { NavigationProp } from '@react-navigation/native';
import { BaseViewModel, GenericCallback, Lang, VoidCallback } from 'react_oop';
import { BaseScreenParams } from '../../router';
import { UIDialogController, UIDialogDisplayProps } from '../../components/dialog/ui_dialog_controller';

export interface MobileViewModelProps extends BaseScreenParams {
}
interface _MobileViewModel {
  pushScreen<T = any>(routeName: string, params?: any): Promise<T | undefined>;
  popToScreen(routeName: string): void;
  setNavigation(navigation: NavigationProp<any>): void;
  showConfirmDialog(props: UIDialogDisplayProps): Promise<boolean | undefined>;
}

export class MobileViewModel<P extends MobileViewModelProps = MobileViewModelProps> extends BaseViewModel<P> {
  protected navigation: NavigationProp<any> | undefined;
  private _focusListener?: VoidCallback;
  private _blurListener?: VoidCallback;
  private _stateListener?: VoidCallback;
  private _currentRouteKey: string | undefined;

  dialogController = new UIDialogController();
  get _onReturn(): GenericCallback<any> | undefined {
    return this.props?.onReturn;
  }


  private _originNavigationId: string | undefined;//navigationId of the origin screen

  async pushScreen<T = any>(routeName: string, params?: any): Promise<T | undefined> {

    const param = {
      ...params,
    }
    this.navigation?.navigate(routeName, param);
    // this.navigation?.addListener('state', (event) => {
    //   console.log('pushScreen_state', event);
    // });
    return param;
  }

  _popedValue?: any;
  async popScreen({ value }: { value?: any }) {
    this._popedValue = value;
    this.navigation?.goBack();

  }

  popToScreen(routeName: string) {
    this.navigation?.navigate(routeName, {
      navigationId: this._originNavigationId,
    });
  }

  async showConfirmDialog(props: UIDialogDisplayProps): Promise<boolean | undefined> {
    if(props.isDelete){
      props.confirmText = Lang.localize("action.delete");
    }
    const dialogController = this.dialogController;
    const promise = new Promise<boolean | undefined>((resolve, reject) => {
      dialogController.onFinished = (data: any) => {
        resolve(data);
      };
    });
    dialogController.show(props);
    return promise;
  }

  dispose(): void {
    this.dialogController.dispose();
    super.dispose();
  }

  setNavigation(navigation: NavigationProp<any>) {
    this.navigation = navigation;
    this._setupNavigationListeners();
    const state = navigation.getState();
    const routes = state?.routes;
    if (routes && routes.length > 0) {
      const route = routes[routes.length - 1];
      const params = (route as any)?.params;
      if (params) {
        this._originNavigationId = params.navigationId;
      }
      // Store current route key for pop detection
      this._currentRouteKey = route.key;
    }
  }


  _isCreated?: boolean;
  private _setupNavigationListeners() {
    if (!this.navigation) return;

    // Clean up existing listeners
    this._cleanupNavigationListeners();

    // Listen for when this screen comes into focus (viewDidAppear)
    this._focusListener = this.navigation.addListener('focus', () => {
      if (this._isCreated == undefined) {
        this.viewDidAppear(true);
        this._isCreated = true;
      } else {
        this.viewDidAppear(false);
      }

    });

    // Listen for when this screen goes out of focus (viewDidDisappear)
    this._blurListener = this.navigation.addListener('blur', () => {
      const currentState = this.navigation?.getState();
      const routes = currentState?.routes || [];

      // Check if current route key still exists in the navigation stack
      const routeExists = routes.some(route => route.key === this._currentRouteKey);
      const isDismissed = !routeExists && this._currentRouteKey != undefined;
      this.viewDidDisappear(isDismissed);

      // Check if this blur event is due to this screen being popped
      // We need to check this after viewDidDisappear to ensure proper lifecycle order

    });

    // Listen for navigation state changes (push/pop completion)
    this._stateListener = this.navigation.addListener('state', (event) => {
      // Log navigation state changes for debugging
      const currentState = this.navigation?.getState();
      const routes = currentState?.routes || [];
      const routeExists = routes.some(route => route.key === this._currentRouteKey);

      console.log(`${this.constructor.name}: NavigationStateChanged - RouteKey: ${this._currentRouteKey}, Exists: ${routeExists}, Total Routes: ${routes.length}`);
    });

  }

  viewDidDisappear(isDismissed: boolean): void {
    super.viewDidDisappear(isDismissed);
    this._onReturn?.(this._popedValue);
  }
  private _cleanupNavigationListeners() {
    this._focusListener = undefined;
    this._blurListener = undefined;
    this._stateListener = undefined;
  }


}

