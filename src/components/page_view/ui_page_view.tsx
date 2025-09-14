import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from "react";
import { ViewStyle, View } from "react-native";
import {
  UIPageViewController,
  PageViewRef,
  ScrollEventCallbacks,
  PageEventCallbacks,
} from "./ui_page_view_controller";

export interface PageViewProps {
  children?: ReactNode;
  controller?: UIPageViewController;
  scrollCallbacks?: ScrollEventCallbacks;
  pageCallbacks?: PageEventCallbacks;
  contentContainerStyle?: ViewStyle;
  style?: ViewStyle;
  onScrollToTop?: () => void;
  onScrollToBottom?: () => void;
  // Page builder functionality
  pageBuilder?: (index: number) => ReactNode;
  pageCount?: number;
  // PagerView specific props
  initialPage?: number;
  orientation?: "horizontal" | "vertical";
  offscreenPageLimit?: number;
  keyboardDismissMode?: "none" | "on-drag";
  scrollEnabled?: boolean;
  [key: string]: any; // Allow other PagerView props
}

export const PageView = forwardRef<PageViewRef, PageViewProps>(
  (
    {
      children,
      pageBuilder,
      pageCount,
      controller,
      scrollCallbacks,
      pageCallbacks,
      contentContainerStyle,
      style,
      onScrollToTop,
      onScrollToBottom,
      ...pagerViewProps
    },
    ref
  ) => {
    const pagerViewRef = useRef<any>(null);
    const pageViewController = useRef(controller || new UIPageViewController());

    // Calculate page count
    const totalPageCount =
      pageCount ||
      (pageBuilder ? pageCount : children ? React.Children.count(children) : 0);

    // Set up the controller
    React.useEffect(() => {
      if (pageViewController.current) {
        pageViewController.current.setPagerViewRef(pagerViewRef);
        pageViewController.current.setTotalPages(totalPageCount);

        const scrollCallbacksToSet: ScrollEventCallbacks = {
          onScrollToTop,
          onScrollToBottom,
          ...scrollCallbacks,
        };

        pageViewController.current.setCallbacks(
          scrollCallbacksToSet,
          pageCallbacks
        );
      }
    }, [
      scrollCallbacks,
      pageCallbacks,
      onScrollToTop,
      onScrollToBottom,
      totalPageCount,
    ]);

    // Render pages using pageBuilder or children
    const renderPages = () => {
      if (pageBuilder && pageCount) {
        return Array.from({ length: pageCount }, (_, index) => (
          <View key={index} style={{ flex: 1 }}>
            {pageBuilder(index)}
          </View>
        ));
      }
      return children;
    };

    // Expose the controller directly as the ref
    useImperativeHandle(ref, () => pageViewController.current!);

    const defaultStyle: ViewStyle = {
      flex: 1,
    };

    // For now, we'll use a simple View wrapper until PagerView is properly installed
    // In a real implementation, you would import and use react-native-pager-view
    return (
      <View
        ref={pagerViewRef}
        style={[defaultStyle, style]}
        {...pagerViewProps}
      >
        {renderPages()}
      </View>
    );
  }
);

PageView.displayName = "PageView";
