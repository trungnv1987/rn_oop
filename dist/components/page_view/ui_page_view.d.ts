import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { UIPageViewController, PageViewRef, ScrollEventCallbacks, PageEventCallbacks } from "./ui_page_view_controller";
export interface PageViewProps {
    children?: ReactNode;
    controller?: UIPageViewController;
    scrollCallbacks?: ScrollEventCallbacks;
    pageCallbacks?: PageEventCallbacks;
    contentContainerStyle?: ViewStyle;
    style?: ViewStyle;
    onScrollToTop?: () => void;
    onScrollToBottom?: () => void;
    pageBuilder?: (index: number) => ReactNode;
    pageCount?: number;
    initialPage?: number;
    orientation?: "horizontal" | "vertical";
    offscreenPageLimit?: number;
    keyboardDismissMode?: "none" | "on-drag";
    scrollEnabled?: boolean;
    [key: string]: any;
}
export declare const PageView: React.ForwardRefExoticComponent<Omit<PageViewProps, "ref"> & React.RefAttributes<PageViewRef>>;
//# sourceMappingURL=ui_page_view.d.ts.map