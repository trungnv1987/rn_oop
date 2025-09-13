import { ViewStyle, TextStyle } from "react-native";
import { GenericCallback } from "react_oop";
interface UICheckBoxProps {
    selected?: boolean;
    onChanged?: GenericCallback<boolean>;
    label?: string;
    labelStyle?: TextStyle;
    style?: ViewStyle;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
}
export declare function UICheckBox({ selected, onChanged, label, labelStyle, style, disabled, size, }: UICheckBoxProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui_check_box.d.ts.map