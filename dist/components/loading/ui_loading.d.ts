import React from "react";
import { ViewStyle } from "react-native";
import { GenericCubit } from "react_oop";
interface UILoadingProps {
    children: React.ReactNode;
    cubit: GenericCubit<boolean>;
    visible?: boolean;
    loadingText?: string;
    style?: ViewStyle;
    overlayStyle?: ViewStyle;
    indicatorColor?: string;
    textColor?: string;
    backgroundColor?: string;
}
export declare function UILoading({ children, cubit, loadingText, style, overlayStyle, indicatorColor, textColor, backgroundColor, }: UILoadingProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui_loading.d.ts.map