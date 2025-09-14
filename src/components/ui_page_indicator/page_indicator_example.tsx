import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { PageView } from "../page_view/ui_page_view";
import {
  UIPageViewController,
  PageEventCallbacks,
} from "../page_view/ui_page_view_controller";
import { UIPageIndicator } from ".";
import { UIButton } from "../button/button";

/**
 * Example component demonstrating UIPageIndicator usage with PageView
 */
export function PageIndicatorExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageScrollOffset, setPageScrollOffset] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  // Create a controller instance
  const controller = new UIPageViewController();

  const handlePageScroll = (event: any) => {
    const { position, offset } = event.nativeEvent;
    setCurrentPage(position);
    setPageScrollOffset(offset);
    setScrollCount((prev) => prev + 1);
  };

  const handlePageSelected = (event: any) => {
    const { position } = event.nativeEvent;
    setCurrentPage(position);
    console.log("Page selected:", position);
  };

  const handlePageScrollStateChanged = (event: any) => {
    const { pageScrollState } = event.nativeEvent;
    setIsScrolling(
      pageScrollState === "dragging" || pageScrollState === "settling"
    );
  };

  const pageCallbacks: PageEventCallbacks = {
    onPageScroll: handlePageScroll,
    onPageSelected: handlePageSelected,
    onPageScrollStateChanged: handlePageScrollStateChanged,
  };

  // Page navigation methods - now using controller directly
  const goToNextPage = () => {
    controller.nextPage(true);
  };

  const goToPreviousPage = () => {
    controller.previousPage(true);
  };

  const goToPage = (page: number) => {
    controller.setPage(page, true);
  };

  const getCurrentInfo = () => {
    const currentPage = controller.getCurrentPage();
    const pageCount = controller.getPageCount();
    const isFirst = controller.isFirstPage();
    const isLast = controller.isLastPage();

    Alert.alert(
      "Page Info",
      `Current Page: ${currentPage}\nTotal Pages: ${pageCount}\nFirst Page: ${isFirst}\nLast Page: ${isLast}\nScrolling: ${isScrolling}`
    );
  };

  const resetScroll = () => {
    controller.reset();
    setCurrentPage(0);
    setPageScrollOffset(0);
    setScrollCount(0);
  };

  // Page builder function - renders each page dynamically
  const pageBuilder = (index: number) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
    const color = colors[index % colors.length];

    return (
      <ScrollView style={[styles.pageScrollView, { backgroundColor: color }]}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Page {index + 1}</Text>
          <Text style={styles.pageSubtitle}>
            Current Page: {currentPage + 1} | Offset:{" "}
            {pageScrollOffset.toFixed(2)}
          </Text>
        </View>
        {Array.from({ length: 15 }, (_, itemIndex) => (
          <View key={itemIndex} style={styles.sampleItem}>
            <Text style={styles.sampleText}>
              Page {index + 1} - Item {itemIndex + 1}
            </Text>
            <Text style={styles.sampleSubtext}>
              This is dynamically generated content for page {index + 1}. Scroll
              events: {scrollCount}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const pageLabels = ["Welcome", "Features", "Settings", "Profile", "Complete"];

  return (
    <View style={styles.container}>
      {/* Control Panel */}
      <View style={styles.controlPanel}>
        <Text style={styles.title}>PageView with PageIndicator Demo</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Current Page: {currentPage + 1} / 5
          </Text>
          <Text style={styles.statusText}>
            Page Offset: {pageScrollOffset.toFixed(2)}
          </Text>
          <Text style={styles.statusText}>
            Scrolling: {isScrolling ? "Yes" : "No"}
          </Text>
          <Text style={styles.statusText}>Scroll Count: {scrollCount}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <UIButton
            title="← Previous"
            onPress={goToPreviousPage}
            style={styles.button}
          />
          <UIButton
            title="Next →"
            onPress={goToNextPage}
            style={styles.button}
          />
          <UIButton
            title="Page 1"
            onPress={() => goToPage(0)}
            style={styles.button}
          />
          <UIButton
            title="Page 3"
            onPress={() => goToPage(2)}
            style={styles.button}
          />
          <UIButton
            title="Page 5"
            onPress={() => goToPage(4)}
            style={styles.button}
          />
          <UIButton
            title="Get Info"
            onPress={getCurrentInfo}
            style={styles.button}
          />
          <UIButton title="Reset" onPress={resetScroll} style={styles.button} />
        </View>
      </View>

      {/* PageView with pageBuilder */}
      <View style={styles.pageViewContainer}>
        <PageView
          controller={controller}
          pageCallbacks={pageCallbacks}
          pageBuilder={pageBuilder}
          pageCount={5}
          style={styles.pageView}
          initialPage={0}
          orientation="horizontal"
          offscreenPageLimit={1}
        />
      </View>

      {/* Page Indicators */}
      <View style={styles.indicatorsContainer}>
        <Text style={styles.indicatorsTitle}>Page Indicators</Text>

        {/* Dots Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Dots</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            variant="dots"
            indicatorSize={10}
            indicatorSpacing={8}
            color="#CCCCCC"
            activeColor="#007AFF"
            onPagePress={goToPage}
          />
        </View>

        {/* Numbers Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Numbers</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            variant="numbers"
            indicatorSize={12}
            indicatorSpacing={6}
            color="#E0E0E0"
            activeColor="#007AFF"
            textColor="#666666"
            activeTextColor="#FFFFFF"
            onPagePress={goToPage}
          />
        </View>

        {/* Labels Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Labels</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            variant="labels"
            labels={pageLabels}
            indicatorSize={10}
            indicatorSpacing={4}
            color="#F0F0F0"
            activeColor="#007AFF"
            textColor="#666666"
            activeTextColor="#FFFFFF"
            onPagePress={goToPage}
          />
        </View>

        {/* Mixed Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Mixed (Dots + Labels)</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            variant="mixed"
            labels={pageLabels}
            indicatorSize={8}
            indicatorSpacing={12}
            color="#CCCCCC"
            activeColor="#007AFF"
            textColor="#666666"
            activeTextColor="#007AFF"
            onPagePress={goToPage}
          />
        </View>

        {/* With Current Page Info */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>With Page Counter</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            variant="dots"
            indicatorSize={8}
            indicatorSpacing={6}
            color="#CCCCCC"
            activeColor="#007AFF"
            showCurrentPage={true}
            currentPageStyle={styles.currentPageStyle}
            onPagePress={goToPage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  controlPanel: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 8,
    minWidth: "30%",
  },
  pageViewContainer: {
    flex: 1,
  },
  pageView: {
    flex: 1,
  },
  pageScrollView: {
    flex: 1,
  },
  pageHeader: {
    backgroundColor: "#007AFF",
    padding: 20,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  sampleItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sampleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  sampleSubtext: {
    fontSize: 12,
    color: "#666",
  },
  indicatorsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  indicatorsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  indicatorSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  indicatorLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  currentPageStyle: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    borderRadius: 8,
  },
});
