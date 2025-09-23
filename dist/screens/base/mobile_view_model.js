"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileViewModel = void 0;
const react_oop_1 = require("react_oop");
const ui_dialog_controller_1 = require("../../components/dialog/ui_dialog_controller");
class MobileViewModel extends react_oop_1.BaseViewModel {
    constructor() {
        super(...arguments);
        this.dialogController = new ui_dialog_controller_1.UIDialogController();
    }
    get _onReturn() {
        var _a;
        return (_a = this.props) === null || _a === void 0 ? void 0 : _a.onReturn;
    }
    async pushScreen(routeName, params) {
        var _a;
        const param = Object.assign({}, params);
        (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.navigate(routeName, param);
        // this.navigation?.addListener('state', (event) => {
        //   console.log('pushScreen_state', event);
        // });
        return param;
    }
    async popScreen(params = {}) {
        var _a;
        this._popedValue = params.value;
        (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.goBack();
    }
    popToScreen(routeName) {
        var _a;
        (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.navigate(routeName, {
            navigationId: this._originNavigationId,
        });
    }
    async showConfirmDialog(props) {
        if (props.isDelete) {
            props.confirmText = react_oop_1.Lang.localize("action.delete");
        }
        const dialogController = this.dialogController;
        const promise = new Promise((resolve, reject) => {
            dialogController.onFinished = (data) => {
                resolve(data);
            };
        });
        dialogController.show(props);
        return promise;
    }
    dispose() {
        this.dialogController.dispose();
        super.dispose();
    }
    setNavigation(navigation) {
        this.navigation = navigation;
        this._setupNavigationListeners();
        const state = navigation.getState();
        const routes = state === null || state === void 0 ? void 0 : state.routes;
        if (routes && routes.length > 0) {
            const route = routes[routes.length - 1];
            const params = route === null || route === void 0 ? void 0 : route.params;
            if (params) {
                this._originNavigationId = params.navigationId;
            }
            // Store current route key for pop detection
            this._currentRouteKey = route.key;
        }
    }
    _setupNavigationListeners() {
        if (!this.navigation)
            return;
        // Clean up existing listeners
        this._cleanupNavigationListeners();
        // Listen for when this screen comes into focus (viewDidAppear)
        this._focusListener = this.navigation.addListener('focus', () => {
            if (this._isCreated == undefined) {
                this.viewDidAppear(true);
                this._isCreated = true;
            }
            else {
                this.viewDidAppear(false);
            }
        });
        // Listen for when this screen goes out of focus (viewDidDisappear)
        this._blurListener = this.navigation.addListener('blur', () => {
            var _a;
            const currentState = (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.getState();
            const routes = (currentState === null || currentState === void 0 ? void 0 : currentState.routes) || [];
            // Check if current route key still exists in the navigation stack
            const routeExists = routes.some(route => route.key === this._currentRouteKey);
            const isDismissed = !routeExists && this._currentRouteKey != undefined;
            this.viewDidDisappear(isDismissed);
            // Check if this blur event is due to this screen being popped
            // We need to check this after viewDidDisappear to ensure proper lifecycle order
        });
        // Listen for navigation state changes (push/pop completion)
        this._stateListener = this.navigation.addListener('state', (event) => {
            var _a;
            // Log navigation state changes for debugging
            const currentState = (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.getState();
            const routes = (currentState === null || currentState === void 0 ? void 0 : currentState.routes) || [];
            const routeExists = routes.some(route => route.key === this._currentRouteKey);
            console.log(`${this.constructor.name}: NavigationStateChanged - RouteKey: ${this._currentRouteKey}, Exists: ${routeExists}, Total Routes: ${routes.length}`);
        });
    }
    viewDidDisappear(isDismissed) {
        var _a;
        super.viewDidDisappear(isDismissed);
        (_a = this._onReturn) === null || _a === void 0 ? void 0 : _a.call(this, this._popedValue);
    }
    _cleanupNavigationListeners() {
        this._focusListener = undefined;
        this._blurListener = undefined;
        this._stateListener = undefined;
    }
}
exports.MobileViewModel = MobileViewModel;
