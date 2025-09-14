import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
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

export function UIPageIndicator({
  controller,
  pageCount,
  currentPage: externalCurrentPage,
  style,
  indicatorStyle,
  activeIndicatorStyle,
  inactiveIndicatorStyle,
  indicatorSize = 8,
  indicatorSpacing = 8,
  showLabels = false,
  labels = [],
  onPagePress,
  orientation = "horizontal",
  variant = "dots",
  color = "#CCCCCC",
  activeColor = "#007AFF",
  inactiveColor = "#CCCCCC",
  textColor = "#666666",
  activeTextColor = "#007AFF",
  showCurrentPage = false,
  currentPageStyle,
  currentPageTextStyle,
}: UIPageIndicatorProps) {
  const [currentPage, setCurrentPage] = useState(externalCurrentPage || 0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Listen to controller changes
  useEffect(() => {
    const updateFromController = () => {
      const controllerPage = controller.getCurrentPage();
      const controllerScrolling = controller.getIsScrolling();

      setCurrentPage(controllerPage);
      setIsScrolling(controllerScrolling);
    };

    // Initial update
    updateFromController();

    // Set up controller callbacks
    const pageCallbacks = {
      onPageSelected: () => {
        updateFromController();
      },
      onPageScroll: () => {
        updateFromController();
      },
      onPageScrollStateChanged: () => {
        updateFromController();
      },
    };

    controller.setPageCallbacks(pageCallbacks);

    // Cleanup
    return () => {
      controller.setPageCallbacks({});
    };
  }, [controller]);

  // Update from external currentPage prop
  useEffect(() => {
    if (
      externalCurrentPage !== undefined &&
      externalCurrentPage !== currentPage
    ) {
      setCurrentPage(externalCurrentPage);
    }
  }, [externalCurrentPage, currentPage]);

  const handlePagePress = (page: number) => {
    if (onPagePress) {
      onPagePress(page);
    } else {
      controller.setPage(page, true);
    }
  };

  const renderDotIndicator = (page: number) => {
    const isActive = page === currentPage;
    const isScrollingActive = isScrolling && isActive;

    return (
      <TouchableOpacity
        key={page}
        onPress={() => handlePagePress(page)}
        style={[
          styles.indicator,
          indicatorStyle,
          {
            width: indicatorSize,
            height: indicatorSize,
            borderRadius: indicatorSize / 2,
            marginRight: orientation === "horizontal" ? indicatorSpacing : 0,
            marginBottom: orientation === "vertical" ? indicatorSpacing : 0,
            backgroundColor: isActive ? activeColor : inactiveColor,
            opacity: isScrollingActive ? 0.7 : 1,
            transform: [{ scale: isActive ? 1.2 : 1 }],
          },
          isActive ? activeIndicatorStyle : inactiveIndicatorStyle,
        ]}
        activeOpacity={0.7}
      />
    );
  };

  const renderNumberIndicator = (page: number) => {
    const isActive = page === currentPage;
    const isScrollingActive = isScrolling && isActive;

    return (
      <TouchableOpacity
        key={page}
        onPress={() => handlePagePress(page)}
        style={[
          styles.numberIndicator,
          indicatorStyle,
          {
            width: indicatorSize * 1.5,
            height: indicatorSize * 1.5,
            borderRadius: indicatorSize * 0.75,
            marginRight: orientation === "horizontal" ? indicatorSpacing : 0,
            marginBottom: orientation === "vertical" ? indicatorSpacing : 0,
            backgroundColor: isActive ? activeColor : inactiveColor,
            opacity: isScrollingActive ? 0.7 : 1,
            transform: [{ scale: isActive ? 1.1 : 1 }],
          },
          isActive ? activeIndicatorStyle : inactiveIndicatorStyle,
        ]}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.numberText,
            {
              color: isActive ? activeTextColor : textColor,
              fontSize: indicatorSize * 0.6,
            },
          ]}
        >
          {page + 1}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderLabelIndicator = (page: number) => {
    const isActive = page === currentPage;
    const isScrollingActive = isScrolling && isActive;
    const label = labels[page] || `Page ${page + 1}`;

    return (
      <TouchableOpacity
        key={page}
        onPress={() => handlePagePress(page)}
        style={[
          styles.labelIndicator,
          indicatorStyle,
          {
            paddingHorizontal: indicatorSpacing,
            paddingVertical: indicatorSize * 0.3,
            marginRight: orientation === "horizontal" ? indicatorSpacing : 0,
            marginBottom: orientation === "vertical" ? indicatorSpacing : 0,
            backgroundColor: isActive ? activeColor : inactiveColor,
            opacity: isScrollingActive ? 0.7 : 1,
            borderRadius: indicatorSize * 0.5,
            transform: [{ scale: isActive ? 1.05 : 1 }],
          },
          isActive ? activeIndicatorStyle : inactiveIndicatorStyle,
        ]}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.labelText,
            {
              color: isActive ? activeTextColor : textColor,
              fontSize: indicatorSize * 0.7,
            },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMixedIndicator = (page: number) => {
    const isActive = page === currentPage;
    const isScrollingActive = isScrolling && isActive;
    const label = labels[page];

    return (
      <TouchableOpacity
        key={page}
        onPress={() => handlePagePress(page)}
        style={[
          styles.mixedIndicator,
          indicatorStyle,
          {
            marginRight: orientation === "horizontal" ? indicatorSpacing : 0,
            marginBottom: orientation === "vertical" ? indicatorSpacing : 0,
            opacity: isScrollingActive ? 0.7 : 1,
            transform: [{ scale: isActive ? 1.1 : 1 }],
          },
        ]}
        activeOpacity={0.7}
      >
        {/* Dot */}
        <View
          style={[
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: isActive ? activeColor : inactiveColor,
              marginBottom: label ? indicatorSize * 0.3 : 0,
            },
            isActive ? activeIndicatorStyle : inactiveIndicatorStyle,
          ]}
        />
        {/* Label */}
        {label && (
          <Text
            style={[
              styles.mixedLabelText,
              {
                color: isActive ? activeTextColor : textColor,
                fontSize: indicatorSize * 0.6,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderIndicator = (page: number) => {
    switch (variant) {
      case "numbers":
        return renderNumberIndicator(page);
      case "labels":
        return renderLabelIndicator(page);
      case "mixed":
        return renderMixedIndicator(page);
      default:
        return renderDotIndicator(page);
    }
  };

  const renderCurrentPageInfo = () => {
    if (!showCurrentPage) return null;

    return (
      <View style={[styles.currentPageContainer, currentPageStyle]}>
        <Text
          style={[
            styles.currentPageText,
            {
              color: activeTextColor,
              fontSize: indicatorSize * 0.8,
            },
            currentPageTextStyle,
          ]}
        >
          {currentPage + 1} / {pageCount}
        </Text>
      </View>
    );
  };

  const containerStyle: ViewStyle[] = [
    styles.container,
    {
      flexDirection: orientation === "horizontal" ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
    },
    ...(style ? [style] : []),
  ];

  return (
    <View style={containerStyle}>
      {Array.from({ length: pageCount }, (_, page) => renderIndicator(page))}
      {showCurrentPage && renderCurrentPageInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  indicator: {
    // Base dot indicator styles
  },
  numberIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontWeight: "600",
  },
  labelIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelText: {
    fontWeight: "500",
  },
  mixedIndicator: {
    alignItems: "center",
    justifyContent: "center",
  },
  mixedLabelText: {
    fontWeight: "500",
    textAlign: "center",
  },
  currentPageContainer: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
  },
  currentPageText: {
    fontWeight: "600",
  },
});
