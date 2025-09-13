import { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
type MainAxisAlignment = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
type CrossAxisAlignment = "start" | "end" | "center" | "stretch" | "baseline";
export interface ColumnProps {
    children?: ReactNode | ReactNode[];
    style?: StyleProp<ViewStyle>;
    mainAxisAlignment?: MainAxisAlignment;
    crossAxisAlignment?: CrossAxisAlignment;
    gap?: number;
    separator?: ReactNode;
}
export declare function Column({ children, style, mainAxisAlignment, crossAxisAlignment, gap, separator, }: ColumnProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=column.d.ts.map