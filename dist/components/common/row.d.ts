import { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
type MainAxisAlignment = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
type CrossAxisAlignment = "start" | "end" | "center" | "stretch" | "baseline";
export interface RowProps {
    children?: ReactNode | ReactNode[];
    style?: StyleProp<ViewStyle>;
    mainAxisAlignment?: MainAxisAlignment;
    crossAxisAlignment?: CrossAxisAlignment;
    wrap?: boolean;
    gap?: number;
    separator?: ReactNode;
}
export declare function Row({ children, style, mainAxisAlignment, crossAxisAlignment, wrap, gap, separator, }: RowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=row.d.ts.map