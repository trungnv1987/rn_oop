"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIPageIndicatorExample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const ui_page_indicator_1 = require("./ui_page_indicator");
const ui_page_view_controller_1 = require("../page_view/ui_page_view_controller");
const button_1 = require("../button/button");
/**
 * Example component demonstrating UIPageIndicator usage
 */
function UIPageIndicatorExample() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(0);
    const [isScrolling, setIsScrolling] = (0, react_1.useState)(false);
    // Create a controller instance
    const controller = new ui_page_view_controller_1.UIPageViewController();
    const handlePagePress = (page) => {
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
    const goToPage = (page) => {
        setCurrentPage(page);
    };
    const getCurrentInfo = () => {
        react_native_1.Alert.alert("Page Info", `Current Page: ${currentPage + 1}\nTotal Pages: 5\nScrolling: ${isScrolling}`);
    };
    const resetPages = () => {
        setCurrentPage(0);
    };
    const pageLabels = ["Welcome", "Features", "Settings", "Profile", "Complete"];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.container }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.controlPanel }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.title }, { children: "UIPageIndicator Examples" })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.statusContainer }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Current Page: ", currentPage + 1, " / 5"] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Scrolling: ", isScrolling ? "Yes" : "No"] }))] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.buttonContainer }, { children: [(0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "\u2190 Previous", onPress: goToPreviousPage, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Next \u2192", onPress: goToNextPage, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 1", onPress: () => goToPage(0), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 3", onPress: () => goToPage(2), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 5", onPress: () => goToPage(4), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Get Info", onPress: getCurrentInfo, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Reset", onPress: resetPages, style: styles.button })] }))] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorsContainer }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorsTitle }, { children: "Page Indicators" })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Dots" })), (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "dots", indicatorSize: 10, indicatorSpacing: 8, color: "#CCCCCC", activeColor: "#007AFF", onPagePress: handlePagePress })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Numbers" })), (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "numbers", indicatorSize: 12, indicatorSpacing: 6, color: "#E0E0E0", activeColor: "#007AFF", textColor: "#666666", activeTextColor: "#FFFFFF", onPagePress: handlePagePress })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Labels" })), (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "labels", labels: pageLabels, indicatorSize: 10, indicatorSpacing: 4, color: "#F0F0F0", activeColor: "#007AFF", textColor: "#666666", activeTextColor: "#FFFFFF", onPagePress: handlePagePress })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Mixed (Dots + Labels)" })), (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "mixed", labels: pageLabels, indicatorSize: 8, indicatorSpacing: 12, color: "#CCCCCC", activeColor: "#007AFF", textColor: "#666666", activeTextColor: "#007AFF", onPagePress: handlePagePress })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "With Page Counter" })), (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "dots", indicatorSize: 8, indicatorSpacing: 6, color: "#CCCCCC", activeColor: "#007AFF", showCurrentPage: true, currentPageStyle: styles.currentPageStyle, onPagePress: handlePagePress })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Vertical Orientation" })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.verticalContainer }, { children: (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "dots", orientation: "vertical", indicatorSize: 8, indicatorSpacing: 12, color: "#CCCCCC", activeColor: "#007AFF", onPagePress: handlePagePress }) }))] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.indicatorSection }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.indicatorLabel }, { children: "Custom Styling" })), (0, jsx_runtime_1.jsx)(ui_page_indicator_1.UIPageIndicator, { controller: controller, pageCount: 5, currentPage: currentPage, variant: "numbers", indicatorSize: 16, indicatorSpacing: 12, activeColor: "#FF6B6B", inactiveColor: "#E0E0E0", textColor: "#666666", activeTextColor: "#FFFFFF", style: styles.customContainerStyle, activeIndicatorStyle: styles.customActiveStyle, onPagePress: handlePagePress })] }))] }))] })));
}
exports.UIPageIndicatorExample = UIPageIndicatorExample;
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
