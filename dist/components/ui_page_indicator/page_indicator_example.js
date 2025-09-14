"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageIndicatorExample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const ui_page_view_1 = require("../page_view/ui_page_view");
const ui_page_view_controller_1 = require("../page_view/ui_page_view_controller");
const _1 = require(".");
const button_1 = require("../button/button");
/**
 * Example component demonstrating UIPageIndicator usage with PageView
 */
function PageIndicatorExample() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(0);
    const [pageScrollOffset, setPageScrollOffset] = (0, react_1.useState)(0);
    const [isScrolling, setIsScrolling] = (0, react_1.useState)(false);
    const [scrollCount, setScrollCount] = (0, react_1.useState)(0);
    // Create a controller instance
    const controller = new ui_page_view_controller_1.UIPageViewController();
    const handlePageScroll = (event) => {
        const { position, offset } = event.nativeEvent;
        setCurrentPage(position);
        setPageScrollOffset(offset);
        setScrollCount((prev) => prev + 1);
    };
    const handlePageSelected = (event) => {
        const { position } = event.nativeEvent;
        setCurrentPage(position);
        console.log("Page selected:", position);
    };
    const handlePageScrollStateChanged = (event) => {
        const { pageScrollState } = event.nativeEvent;
        setIsScrolling(pageScrollState === "dragging" || pageScrollState === "settling");
    };
    const pageCallbacks = {
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
    const goToPage = (page) => {
        controller.setPage(page, true);
    };
    const getCurrentInfo = () => {
        const currentPage = controller.getCurrentPage();
        const pageCount = controller.getPageCount();
        const isFirst = controller.isFirstPage();
        const isLast = controller.isLastPage();
        react_native_1.Alert.alert("Page Info", `Current Page: ${currentPage}\nTotal Pages: ${pageCount}\nFirst Page: ${isFirst}\nLast Page: ${isLast}\nScrolling: ${isScrolling}`);
    };
    const resetScroll = () => {
        controller.reset();
        setCurrentPage(0);
        setPageScrollOffset(0);
        setScrollCount(0);
    };
    // Page builder function - renders each page dynamically
    const pageBuilder = (index) => {
        const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
        const color = colors[index % colors.length];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, Object.assign({ style: [styles.pageScrollView, { backgroundColor: color }] }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.pageHeader }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.pageTitle }, { children: ["Page ", index + 1] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.pageSubtitle }, { children: ["Current Page: ", currentPage + 1, " | Offset:", " ", pageScrollOffset.toFixed(2)] }))] })), Array.from({ length: 15 }, (_, itemIndex) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.sampleItem }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.sampleText }, { children: ["Page ", index + 1, " - Item ", itemIndex + 1] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.sampleSubtext }, { children: ["This is dynamically generated content for page ", index + 1, ". Scroll events: ", scrollCount] }))] }), itemIndex)))] })));
    };
    const pageLabels = ["Welcome", "Features", "Settings", "Profile", "Complete"];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.container }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.controlPanel }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.title }, { children: "PageView with PageIndicator Demo" })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.statusContainer }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Current Page: ", currentPage + 1, " / 5"] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Page Offset: ", pageScrollOffset.toFixed(2)] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Scrolling: ", isScrolling ? "Yes" : "No"] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Scroll Count: ", scrollCount] }))] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.buttonContainer }, { children: [(0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "\u2190 Previous", onPress: goToPreviousPage, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Next \u2192", onPress: goToNextPage, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 1", onPress: () => goToPage(0), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 3", onPress: () => goToPage(2), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 5", onPress: () => goToPage(4), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Get Info", onPress: getCurrentInfo, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Reset", onPress: resetScroll, style: styles.button })] }))] })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.pageViewContainer }, { children: (0, jsx_runtime_1.jsx)(ui_page_view_1.PageView, { controller: controller, pageCallbacks: pageCallbacks, pageBuilder: pageBuilder, pageCount: 5, style: styles.pageView, initialPage: 0, orientation: "horizontal", offscreenPageLimit: 1 }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorsContainer }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorsTitle }, { children: "Page Indicators" })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Dots" })), (0, jsx_runtime_1.jsx)(_1.UIPageIndicator, { controller: controller, pageCount: 5, variant: "dots", indicatorSize: 10, indicatorSpacing: 8, color: "#CCCCCC", activeColor: "#007AFF", onPagePress: goToPage })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Numbers" })), (0, jsx_runtime_1.jsx)(_1.UIPageIndicator, { controller: controller, pageCount: 5, variant: "numbers", indicatorSize: 12, indicatorSpacing: 6, color: "#E0E0E0", activeColor: "#007AFF", textColor: "#666666", activeTextColor: "#FFFFFF", onPagePress: goToPage })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Labels" })), (0, jsx_runtime_1.jsx)(_1.UIPageIndicator, { controller: controller, pageCount: 5, variant: "labels", labels: pageLabels, indicatorSize: 10, indicatorSpacing: 4, color: "#F0F0F0", activeColor: "#007AFF", textColor: "#666666", activeTextColor: "#FFFFFF", onPagePress: goToPage })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Mixed (Dots + Labels)" })), (0, jsx_runtime_1.jsx)(_1.UIPageIndicator, { controller: controller, pageCount: 5, variant: "mixed", labels: pageLabels, indicatorSize: 8, indicatorSpacing: 12, color: "#CCCCCC", activeColor: "#007AFF", textColor: "#666666", activeTextColor: "#007AFF", onPagePress: goToPage })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "With Page Counter" })), (0, jsx_runtime_1.jsx)(_1.UIPageIndicator, { controller: controller, pageCount: 5, variant: "dots", indicatorSize: 8, indicatorSpacing: 6, color: "#CCCCCC", activeColor: "#007AFF", showCurrentPage: true, currentPageStyle: styles.currentPageStyle, onPagePress: goToPage })] }))] }))] })));
}
exports.PageIndicatorExample = PageIndicatorExample;
const styles = react_native_1.StyleSheet.create({
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
