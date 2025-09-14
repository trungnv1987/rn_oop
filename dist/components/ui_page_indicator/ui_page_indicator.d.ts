import { ViewStyle } from "react-native";
import { UIPageViewController } from "../page_view/ui_page_view_controller";
export interface UIPageIndicatorProps {
    controller: UIPageViewController;
    pageCount: number;
    currentPage?: number;
    style?: ViewStyle;
    indicatorStyle?: ViewStyle;
    activeIndicatorStyle?: ViewStyle;
    inactiveIndicatorStyle?: ViewStyle;
    indicatorSize?: number;
    indicatorSpacing?: number;
    showLabels?: boolean;
    labels?: string[];
    onPagePress?: (page: number) => void;
    orientation?: "horizontal" | "vertical";
    variant?: "dots" | "numbers" | "labels" | "mixed";
    color?: string;
    activeColor?: string;
    inactiveColor?: string;
    textColor?: string;
    activeTextColor?: string;
    showCurrentPage?: boolean;
    currentPageStyle?: ViewStyle;
    currentPageTextStyle?: ViewStyle;
}
export declare function UIPageIndicator({ controller, pageCount, currentPage: externalCurrentPage, style, indicatorStyle, activeIndicatorStyle, inactiveIndicatorStyle, indicatorSize, indicatorSpacing, showLabels, labels, onPagePress, orientation, variant, color, activeColor, inactiveColor, textColor, activeTextColor, showCurrentPage, currentPageStyle, currentPageTextStyle, }: UIPageIndicatorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ui_page_indicator.d.ts.map