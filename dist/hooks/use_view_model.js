"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewModel = void 0;
const react_1 = require("react");
const native_1 = require("@react-navigation/native");
/**
 * Custom hook that automatically sets navigation for MobileViewModel instances
 * @param viewModel - The MobileViewModel instance
 */
function useViewModel(viewModel) {
    const navigation = (0, native_1.useNavigation)();
    const viewModelRef = (0, react_1.useRef)(viewModel);
    (0, react_1.useEffect)(() => {
        if (viewModelRef.current) {
            viewModelRef.current.setNavigation(navigation);
        }
    }, [navigation]);
    return viewModelRef.current;
}
exports.useViewModel = useViewModel;
