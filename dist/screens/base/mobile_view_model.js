"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileViewModel = void 0;
const react_oop_1 = require("react_oop");
class MobileViewModel extends react_oop_1.BaseViewModel {
    get _onReturn() {
        var _a;
        return (_a = this.props) === null || _a === void 0 ? void 0 : _a.onReturn;
    }
    async pushScreen(routeName, params) {
        var _a, _b;
        const param = Object.assign({}, params);
        (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.navigate(routeName, param);
        (_b = this.navigation) === null || _b === void 0 ? void 0 : _b.addListener('state', (event) => {
            console.log('pushScreen_state', event);
        });
        return param;
    }
    async popScreen({ value }) {
        var _a;
        // this._onReturn?.(value);
        this._popedValue = value;
        (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.goBack();
    }
    popToScreen(routeName) {
        var _a;
        (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.navigate(routeName, {
            navigationId: this._originNavigationId,
        });
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
        }
    }
    _setupNavigationListeners() {
        if (!this.navigation)
            return;
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
            console.log(`${this.constructor.name}: NavigationStateChanged: ` + event);
        });
    }
    _cleanupNavigationListeners() {
        this._focusListener = undefined;
        this._blurListener = undefined;
        this._stateListener = undefined;
    }
}
exports.MobileViewModel = MobileViewModel;
function _generateNavigationId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
