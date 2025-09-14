"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIPageIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
function UIPageIndicator({ controller, pageCount, currentPage: externalCurrentPage, style, indicatorStyle, activeIndicatorStyle, inactiveIndicatorStyle, indicatorSize = 8, indicatorSpacing = 8, showLabels = false, labels = [], onPagePress, orientation = "horizontal", variant = "dots", color = "#CCCCCC", activeColor = "#007AFF", inactiveColor = "#CCCCCC", textColor = "#666666", activeTextColor = "#007AFF", showCurrentPage = false, currentPageStyle, currentPageTextStyle, }) {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(externalCurrentPage || 0);
    const [isScrolling, setIsScrolling] = (0, react_1.useState)(false);
    // Listen to controller changes
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (externalCurrentPage !== undefined &&
            externalCurrentPage !== currentPage) {
            setCurrentPage(externalCurrentPage);
        }
    }, [externalCurrentPage, currentPage]);
    const handlePagePress = (page) => {
        if (onPagePress) {
            onPagePress(page);
        }
        else {
            controller.setPage(page, true);
        }
    };
    const renderDotIndicator = (page) => {
        const isActive = page === currentPage;
        const isScrollingActive = isScrolling && isActive;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, { onPress: () => handlePagePress(page), style: [
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
            ], activeOpacity: 0.7 }, page));
    };
    const renderNumberIndicator = (page) => {
        const isActive = page === currentPage;
        const isScrollingActive = isScrolling && isActive;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: () => handlePagePress(page), style: [
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
            ], activeOpacity: 0.7 }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                    styles.numberText,
                    {
                        color: isActive ? activeTextColor : textColor,
                        fontSize: indicatorSize * 0.6,
                    },
                ] }, { children: page + 1 })) }), page));
    };
    const renderLabelIndicator = (page) => {
        const isActive = page === currentPage;
        const isScrollingActive = isScrolling && isActive;
        const label = labels[page] || `Page ${page + 1}`;
        return ((0, jsx_runtime_1.jsx)(react_native_1.TouchableOpacity, Object.assign({ onPress: () => handlePagePress(page), style: [
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
            ], activeOpacity: 0.7 }, { children: (0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                    styles.labelText,
                    {
                        color: isActive ? activeTextColor : textColor,
                        fontSize: indicatorSize * 0.7,
                    },
                ] }, { children: label })) }), page));
    };
    const renderMixedIndicator = (page) => {
        const isActive = page === currentPage;
        const isScrollingActive = isScrolling && isActive;
        const label = labels[page];
        return ((0, jsx_runtime_1.jsxs)(react_native_1.TouchableOpacity, Object.assign({ onPress: () => handlePagePress(page), style: [
                styles.mixedIndicator,
                indicatorStyle,
                {
                    marginRight: orientation === "horizontal" ? indicatorSpacing : 0,
                    marginBottom: orientation === "vertical" ? indicatorSpacing : 0,
                    opacity: isScrollingActive ? 0.7 : 1,
                    transform: [{ scale: isActive ? 1.1 : 1 }],
                },
            ], activeOpacity: 0.7 }, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                        {
                            width: indicatorSize,
                            height: indicatorSize,
                            borderRadius: indicatorSize / 2,
                            backgroundColor: isActive ? activeColor : inactiveColor,
                            marginBottom: label ? indicatorSize * 0.3 : 0,
                        },
                        isActive ? activeIndicatorStyle : inactiveIndicatorStyle,
                    ] }), label && ((0, jsx_runtime_1.jsx)(react_native_1.Text, Object.assign({ style: [
                        styles.mixedLabelText,
                        {
                            color: isActive ? activeTextColor : textColor,
                            fontSize: indicatorSize * 0.6,
                        },
                    ] }, { children: label })))] }), page));
    };
    const renderIndicator = (page) => {
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
        if (!showCurrentPage)
            return null;
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, Object.assign({ style: [styles.currentPageContainer, currentPageStyle] }, { children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, Object.assign({ style: [
                    styles.currentPageText,
                    {
                        color: activeTextColor,
                        fontSize: indicatorSize * 0.8,
                    },
                    currentPageTextStyle,
                ] }, { children: [currentPage + 1, " / ", pageCount] })) })));
    };
    const containerStyle = [
        styles.container,
        {
            flexDirection: orientation === "horizontal" ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
        },
        ...(style ? [style] : []),
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, Object.assign({ style: containerStyle }, { children: [Array.from({ length: pageCount }, (_, page) => renderIndicator(page)), showCurrentPage && renderCurrentPageInfo()] })));
}
exports.UIPageIndicator = UIPageIndicator;
const styles = react_native_1.StyleSheet.create({
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
