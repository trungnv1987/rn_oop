"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileViewModel = void 0;
const app_view_model_1 = require("../../view_model/app_view_model");
class MobileViewModel extends app_view_model_1.AppViewModel {
    constructor(props) {
        super(props);
    }
    async pushScreen(routeName, params) {
        var _a, _b;
        try {
            // Navigate to the screen
            const navigationId = _generateNavigationId();
            const param = Object.assign({}, params);
            (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.navigate(routeName, param);
            (_b = this.navigation) === null || _b === void 0 ? void 0 : _b.addListener('state', (event) => {
                console.log('pushScreen_state', event);
            });
            return param;
        }
        catch (error) {
            console.error('Navigation error:', error);
            return undefined;
        }
    }
    async popScreen({ value }) {
        var _a;
        try {
            // TODO: Implement result handling manually
            (_a = this.navigation) === null || _a === void 0 ? void 0 : _a.goBack();
            return undefined;
        }
        catch (error) {
            console.error('Pop screen error:', error);
            return undefined;
        }
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
            console.log('Navigation state changed:', event);
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
