"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageViewExample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const ui_page_view_1 = require("./ui_page_view");
const ui_page_view_controller_1 = require("./ui_page_view_controller");
const button_1 = require("../button/button");
/**
 * Example component demonstrating PageView usage with pageBuilder
 */
function PageViewExample() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(0);
    const [pageScrollOffset, setPageScrollOffset] = (0, react_1.useState)(0);
    const [pageScrollPosition, setPageScrollPosition] = (0, react_1.useState)(0);
    const [isScrolling, setIsScrolling] = (0, react_1.useState)(false);
    const [scrollDirection, setScrollDirection] = (0, react_1.useState)(null);
    const [scrollCount, setScrollCount] = (0, react_1.useState)(0);
    // Create a controller instance
    const controller = new ui_page_view_controller_1.UIPageViewController();
    const handlePageScroll = (event) => {
        const { position, offset } = event.nativeEvent;
        setCurrentPage(position);
        setPageScrollOffset(offset);
        setPageScrollPosition(position + offset);
        setScrollCount((prev) => prev + 1);
    };
    const handlePageSelected = (event) => {
        const { position } = event.nativeEvent;
        setCurrentPage(position);
        react_native_1.Alert.alert("Page Selected", `Page ${position + 1} selected!`);
    };
    const handlePageScrollStateChanged = (event) => {
        const { pageScrollState } = event.nativeEvent;
        setIsScrolling(pageScrollState === "dragging" || pageScrollState === "settling");
        console.log("Page scroll state:", pageScrollState);
    };
    const handleScrollToTop = () => {
        react_native_1.Alert.alert("Scroll Event", "Scrolled to top!");
    };
    const handleScrollToBottom = () => {
        react_native_1.Alert.alert("Scroll Event", "Scrolled to bottom!");
    };
    const pageCallbacks = {
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
    const goToPage = (page) => {
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
        react_native_1.Alert.alert("Page Info", `Current Page: ${currentPage}\nPage Offset: ${pageOffset === null || pageOffset === void 0 ? void 0 : pageOffset.toFixed(2)}\nPage Position: ${pagePosition === null || pagePosition === void 0 ? void 0 : pagePosition.toFixed(2)}\nScrolling: ${scrolling}\nFirst Page: ${isFirst}\nLast Page: ${isLast}\nTotal Pages: ${pageCount}`);
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
    const pageBuilder = (index) => {
        const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];
        const color = colors[index % colors.length];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, Object.assign({ style: [styles.pageScrollView, { backgroundColor: color }] }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.pageHeader }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.pageTitle }, { children: ["Page ", index + 1] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.pageSubtitle }, { children: ["Current Page: ", currentPage + 1, " | Offset:", " ", pageScrollOffset.toFixed(2)] }))] })), Array.from({ length: 15 }, (_, itemIndex) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.sampleItem }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.sampleText }, { children: ["Page ", index + 1, " - Item ", itemIndex + 1] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.sampleSubtext }, { children: ["This is dynamically generated content for page ", index + 1, ". Scroll events: ", scrollCount] }))] }), itemIndex)))] })));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.container }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.controlPanel }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: styles.title }, { children: "PageView with pageBuilder Demo" })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.statusContainer }, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Current Page: ", currentPage + 1, " / 5"] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Page Offset: ", pageScrollOffset.toFixed(2)] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Page Position: ", pageScrollPosition.toFixed(2)] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Scrolling: ", isScrolling ? "Yes" : "No"] })), (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: styles.statusText }, { children: ["Scroll Count: ", scrollCount] }))] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: styles.buttonContainer }, { children: [(0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "\u2190 Previous", onPress: goToPreviousPage, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Next \u2192", onPress: goToNextPage, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 1", onPress: () => goToPage(0), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 3", onPress: () => goToPage(2), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Page 5", onPress: () => goToPage(4), style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Get Info", onPress: getCurrentInfo, style: styles.button }), (0, jsx_runtime_1.jsx)(button_1.UIButton, { title: "Reset", onPress: resetScroll, style: styles.button })] }))] })), (0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: styles.pageViewContainer }, { children: (0, jsx_runtime_1.jsx)(ui_page_view_1.PageView, { controller: controller, scrollCallbacks: scrollCallbacks, pageCallbacks: pageCallbacks, pageBuilder: pageBuilder, pageCount: 5, style: styles.pageView, initialPage: 0, orientation: "horizontal", offscreenPageLimit: 1 }) }))] })));
}
exports.PageViewExample = PageViewExample;
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
