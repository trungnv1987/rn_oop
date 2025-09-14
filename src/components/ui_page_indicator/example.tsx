import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { UIPageIndicator } from "./ui_page_indicator";
import { UIPageViewController } from "../page_view/ui_page_view_controller";
import { UIButton } from "../button/button";

/**
 * Example component demonstrating UIPageIndicator usage
 */
export function UIPageIndicatorExample() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Create a controller instance
  const controller = new UIPageViewController();

  const handlePagePress = (page: number) => {
    setCurrentPage(page);
    console.log("Page pressed:", page);
  };

  const goToNextPage = () => {
    const nextPage = Math.min(currentPage + 1, 4);
    setCurrentPage(nextPage);
  };

  const goToPreviousPage = () => {
    const prevPage = Math.max(currentPage - 1, 0);
    setCurrentPage(prevPage);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentInfo = () => {
    Alert.alert(
      "Page Info",
      `Current Page: ${
        currentPage + 1
      }\nTotal Pages: 5\nScrolling: ${isScrolling}`
    );
  };

  const resetPages = () => {
    setCurrentPage(0);
  };

  const pageLabels = ["Welcome", "Features", "Settings", "Profile", "Complete"];

  return (
    <View style={styles.container}>
      {/* Control Panel */}
      <View style={styles.controlPanel}>
        <Text style={styles.title}>UIPageIndicator Examples</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Current Page: {currentPage + 1} / 5
          </Text>
          <Text style={styles.statusText}>
            Scrolling: {isScrolling ? "Yes" : "No"}
          </Text>
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
          <UIButton title="Reset" onPress={resetPages} style={styles.button} />
        </View>
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
            currentPage={currentPage}
            variant="dots"
            indicatorSize={10}
            indicatorSpacing={8}
            color="#CCCCCC"
            activeColor="#007AFF"
            onPagePress={handlePagePress}
          />
        </View>

        {/* Numbers Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Numbers</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            currentPage={currentPage}
            variant="numbers"
            indicatorSize={12}
            indicatorSpacing={6}
            color="#E0E0E0"
            activeColor="#007AFF"
            textColor="#666666"
            activeTextColor="#FFFFFF"
            onPagePress={handlePagePress}
          />
        </View>

        {/* Labels Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Labels</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            currentPage={currentPage}
            variant="labels"
            labels={pageLabels}
            indicatorSize={10}
            indicatorSpacing={4}
            color="#F0F0F0"
            activeColor="#007AFF"
            textColor="#666666"
            activeTextColor="#FFFFFF"
            onPagePress={handlePagePress}
          />
        </View>

        {/* Mixed Indicator */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Mixed (Dots + Labels)</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            currentPage={currentPage}
            variant="mixed"
            labels={pageLabels}
            indicatorSize={8}
            indicatorSpacing={12}
            color="#CCCCCC"
            activeColor="#007AFF"
            textColor="#666666"
            activeTextColor="#007AFF"
            onPagePress={handlePagePress}
          />
        </View>

        {/* With Current Page Info */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>With Page Counter</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            currentPage={currentPage}
            variant="dots"
            indicatorSize={8}
            indicatorSpacing={6}
            color="#CCCCCC"
            activeColor="#007AFF"
            showCurrentPage={true}
            currentPageStyle={styles.currentPageStyle}
            onPagePress={handlePagePress}
          />
        </View>

        {/* Vertical Orientation */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Vertical Orientation</Text>
          <View style={styles.verticalContainer}>
            <UIPageIndicator
              controller={controller}
              pageCount={5}
              currentPage={currentPage}
              variant="dots"
              orientation="vertical"
              indicatorSize={8}
              indicatorSpacing={12}
              color="#CCCCCC"
              activeColor="#007AFF"
              onPagePress={handlePagePress}
            />
          </View>
        </View>

        {/* Custom Styling */}
        <View style={styles.indicatorSection}>
          <Text style={styles.indicatorLabel}>Custom Styling</Text>
          <UIPageIndicator
            controller={controller}
            pageCount={5}
            currentPage={currentPage}
            variant="numbers"
            indicatorSize={16}
            indicatorSpacing={12}
            activeColor="#FF6B6B"
            inactiveColor="#E0E0E0"
            textColor="#666666"
            activeTextColor="#FFFFFF"
            style={styles.customContainerStyle}
            activeIndicatorStyle={styles.customActiveStyle}
            onPagePress={handlePagePress}
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
  indicatorsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    flex: 1,
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
  verticalContainer: {
    height: 200,
    justifyContent: "center",
  },
  customContainerStyle: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  customActiveStyle: {
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
