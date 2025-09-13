import { ViewStyle, TextStyle } from "react-native";
import { VoidCallback } from "react_oop";
export interface UIButtonProps {
    title: string;
    onPress: VoidCallback;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    fullWidth?: boolean;
}
export declare function UIButton({ title, onPress, style, textStyle, variant, size, disabled, fullWidth, }: UIButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=button.d.ts.map