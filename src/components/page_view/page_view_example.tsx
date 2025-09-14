import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { PageView } from "./ui_page_view";
import {
  UIPageViewController,
  PageEventCallbacks,
} from "./ui_page_view_controller";
import { UIButton } from "../button/button";
import { Column } from "../common/column";

/**
 * Example component demonstrating PageView usage with pageBuilder
 */
export function PageViewExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageScrollOffset, setPageScrollOffset] = useState(0);
  const [pageScrollPosition, setPageScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  const [scrollCount, setScrollCount] = useState(0);

  // Create a controller instance
  const controller = new UIPageViewController();

  const handlePageScroll = (event: any) => {
    const { position, offset } = event.nativeEvent;
    setCurrentPage(position);
    setPageScrollOffset(offset);
    setPageScrollPosition(position + offset);
    setScrollCount((prev) => prev + 1);
  };

  const handlePageSelected = (event: any) => {
    const { position } = event.nativeEvent;
    setCurrentPage(position);
    Alert.alert("Page Selected", `Page ${position + 1} selected!`);
  };

  const handlePageScrollStateChanged = (event: any) => {
    const { pageScrollState } = event.nativeEvent;
    setIsScrolling(
      pageScrollState === "dragging" || pageScrollState === "settling"
    );
    console.log("Page scroll state:", pageScrollState);
  };

  const handleScrollToTop = () => {
    Alert.alert("Scroll Event", "Scrolled to top!");
  };

  const handleScrollToBottom = () => {
    Alert.alert("Scroll Event", "Scrolled to bottom!");
  };

  const pageCallbacks: PageEventCallbacks = {
    onPageScroll: handlePageScroll,
    onPageSelected: handlePageSelected,
    onPageScrollStateChanged: handlePageScrollStateChanged,
  };

  const scrollCallbacks = {
    onScrollToTop: handleScrollToTop,
    onScrollToBottom: handleScrollToBottom,
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

  const scrollToTop = () => {
    controller.scrollToTop(true);
  };

  const scrollToBottom = () => {
    controller.scrollToBottom(true);
  };

  const scrollToPosition = () => {
    controller.scrollTo({ x: 0, y: 200 }, true);
  };

  const scrollByOffset = () => {
    controller.scrollBy({ x: 0, y: 100 }, true);
  };

  const getCurrentInfo = () => {
    const currentPage = controller.getCurrentPage();
    const pageOffset = controller.getPageScrollOffset();
    const pagePosition = controller.getPageScrollPosition();
    const scrolling = controller.getIsScrolling();
    const isFirst = controller.isFirstPage();
    const isLast = controller.isLastPage();
    const pageCount = controller.getPageCount();

    Alert.alert(
      "Page Info",
      `Current Page: ${currentPage}\nPage Offset: ${pageOffset?.toFixed(
        2
      )}\nPage Position: ${pagePosition?.toFixed(
        2
      )}\nScrolling: ${scrolling}\nFirst Page: ${isFirst}\nLast Page: ${isLast}\nTotal Pages: ${pageCount}`
    );
  };

  const resetScroll = () => {
    controller.reset();
    setCurrentPage(0);
    setPageScrollOffset(0);
    setPageScrollPosition(0);
    setScrollDirection(null);
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

  return (
    <View style={styles.container}>
      {/* Control Panel */}
      <View style={styles.controlPanel}>
        <Text style={styles.title}>PageView with pageBuilder Demo</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Current Page: {currentPage + 1} / 5
          </Text>
          <Text style={styles.statusText}>
            Page Offset: {pageScrollOffset.toFixed(2)}
          </Text>
          <Text style={styles.statusText}>
            Page Position: {pageScrollPosition.toFixed(2)}
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
          scrollCallbacks={scrollCallbacks}
          pageCallbacks={pageCallbacks}
          pageBuilder={pageBuilder}
          pageCount={5}
          style={styles.pageView}
          initialPage={0}
          orientation="horizontal"
          offscreenPageLimit={1}
        />
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
  pageContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
  contentContainer: {
    padding: 16,
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
});
