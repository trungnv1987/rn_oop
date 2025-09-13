import { TextInputProps, ViewStyle, TextStyle } from "react-native";
export interface UIInputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: ViewStyle;
    errorStyle?: TextStyle;
    variant?: "default" | "outlined" | "filled";
    size?: "small" | "medium" | "large";
    fullWidth?: boolean;
}
export declare function UIInput({ label, error, containerStyle, labelStyle, inputStyle, errorStyle, variant, size, fullWidth, ...props }: UIInputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=input.d.ts.map