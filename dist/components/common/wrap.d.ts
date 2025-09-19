import { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
type WrapAlignment = "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly";
type WrapCrossAlignment = "start" | "end" | "center" | "stretch";
type WrapDirection = "horizontal" | "vertical";
export interface WrapProps {
    children?: ReactNode | ReactNode[];
    style?: StyleProp<ViewStyle>;
    direction?: WrapDirection;
    alignment?: WrapAlignment;
    runAlignment?: WrapAlignment;
    crossAxisAlignment?: WrapCrossAlignment;
    spacing?: number;
    runSpacing?: number;
    separator?: ReactNode;
}
export declare function Wrap({ children, style, direction, alignment, runAlignment, crossAxisAlignment, spacing, runSpacing, separator, }: WrapProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=wrap.d.ts.map