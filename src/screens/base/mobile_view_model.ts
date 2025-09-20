import {  NavigationProp } from '@react-navigation/native';
import { BaseViewModel,  GenericCallback, VoidCallback } from 'react_oop';
import { BaseScreenParams } from '../../router';

export interface MobileViewModelProps extends BaseScreenParams{
}
interface _MobileViewModel {
    pushScreen<T = any>(routeName: string, params?: any): Promise<T | undefined>;
    popToScreen(routeName: string): void;
    setNavigation(navigation: NavigationProp<any>): void;
}

export class MobileViewModel<P extends MobileViewModelProps=MobileViewModelProps> extends BaseViewModel<P> {
  protected navigation: NavigationProp<any> | undefined;
  private _focusListener?:VoidCallback;
  private _blurListener?:VoidCallback;
  private _stateListener?:VoidCallback;

  get _onReturn(): GenericCallback<any> | undefined {
    return this.props?.onReturn;
  }


  private _originNavigationId: string | undefined;//navigationId of the origin screen
  
  async pushScreen<T = any>(routeName: string, params?: any): Promise<T | undefined> {
    
    const onReturn = (value: T|undefined) => {
      this._onReturn?.(value);
    }
    const param = {
      ...params,
      onReturn:onReturn,
    }
    this.navigation?.navigate(routeName, param);
    this.navigation?.addListener('state', (event) => {
      console.log('pushScreen_state', event);
    });
    return param;
  } 
  
  async popScreen({value}: {value?: any}) {
    try {
      // TODO: Implement result handling manually
      this.navigation?.goBack();
      return undefined;
    } catch (error) {
      console.error('Pop screen error:', error);
      return undefined;
    }
  }

  popToScreen(routeName: string) {
    this.navigation?.navigate(routeName, {
      navigationId: this._originNavigationId,
    });
  }

  setNavigation(navigation: NavigationProp<any>) {
    this.navigation = navigation;
    this._setupNavigationListeners();
    const state = navigation.getState();
    const routes = state?.routes;
    if(routes && routes.length > 0) {
      const route = routes[routes.length - 1];
      const params = (route as any)?.params;
      if (params) {
        this._originNavigationId = params.navigationId;
      }
    }
  }
   

  private _setupNavigationListeners() {
    if (!this.navigation) return;

    // Clean up existing listeners
    this._cleanupNavigationListeners();

    // Listen for when this screen comes into focus (viewDidAppear)
    this._focusListener = this.navigation.addListener('focus', () => {
      this.viewDidAppear();
    });

    // Listen for when this screen goes out of focus (viewDidDisappear)
    this._blurListener = this.navigation.addListener('blur', () => {
      this.viewDidDisappear();
    });

    // Listen for navigation state changes (push/pop completion)
    this._stateListener = this.navigation.addListener('state', (event) => {
      // The focus/blur events will handle viewDidAppear/viewDidDisappear
      // This listener is useful for additional navigation state tracking
      console.log('Navigation state changed:', event);
    });
    
  }
  private _cleanupNavigationListeners() {
      this._focusListener = undefined;
      this._blurListener = undefined;
      this._stateListener = undefined;
  }

}

function _generateNavigationId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}