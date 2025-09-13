import { ViewStyle } from "react-native";
import { VoidCallback } from "react_oop";
import React from "react";
export interface UIIconButtonProps {
    onPress: VoidCallback;
    style?: ViewStyle;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    children: React.ReactNode;
}
export declare function UIIconButton({ onPress, style, variant, size, disabled, children, }: UIIconButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=icon_button.d.ts.map