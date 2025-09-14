import { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
export interface SafeAreaProps {
    children?: ReactNode | ReactNode[];
    style?: StyleProp<ViewStyle>;
    edges?: ("top" | "bottom" | "left" | "right")[];
    backgroundColor?: string;
}
export declare function SafeArea({ children, style, edges, backgroundColor, }: SafeAreaProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=safe_area.d.ts.map