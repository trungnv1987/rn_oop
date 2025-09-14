"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIPageViewController = void 0;
class UIPageViewController {
    constructor() {
        this.pagerViewRef = null;
        this.pageCallbacks = {};
        this.scrollCallbacks = {};
        this.isScrolling = false;
        this.currentPage = 0;
        this.pageScrollOffset = 0;
        this.pageScrollPosition = 0;
        this.totalPages = null;
        this.scrollDirection = null;
        this.lastScrollPosition = { x: 0, y: 0 };
        this.scrollThreshold = 10; // Minimum distance to consider as scroll movement
        /**
         * Handle page scroll event
         */
        this.handlePageScroll = (event) => {
            var _a, _b;
            const { position, offset } = event.nativeEvent;
            this.currentPage = position;
            this.pageScrollOffset = offset;
            this.pageScrollPosition = position + offset;
            this.isScrolling = true;
            (_b = (_a = this.pageCallbacks).onPageScroll) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle page selected event
         */
        this.handlePageSelected = (event) => {
            var _a, _b;
            const { position } = event.nativeEvent;
            this.currentPage = position;
            this.isScrolling = false;
            (_b = (_a = this.pageCallbacks).onPageSelected) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle page scroll state changed event
         */
        this.handlePageScrollStateChanged = (event) => {
            var _a, _b;
            const { pageScrollState } = event.nativeEvent;
            this.isScrolling = pageScrollState === 'dragging' || pageScrollState === 'settling';
            (_b = (_a = this.pageCallbacks).onPageScrollStateChanged) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle scroll event (for individual page content)
         */
        this.handleScroll = (event) => {
            var _a, _b;
            const { contentOffset } = event.nativeEvent;
            this.updateScrollPosition(contentOffset);
            this.updateScrollDirection(contentOffset);
            (_b = (_a = this.scrollCallbacks).onScroll) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle scroll begin drag event (for individual page content)
         */
        this.handleScrollBeginDrag = (event) => {
            var _a, _b;
            this.isScrolling = true;
            (_b = (_a = this.scrollCallbacks).onScrollBeginDrag) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle scroll end drag event (for individual page content)
         */
        this.handleScrollEndDrag = (event) => {
            var _a, _b;
            this.isScrolling = false;
            (_b = (_a = this.scrollCallbacks).onScrollEndDrag) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle momentum scroll begin event (for individual page content)
         */
        this.handleMomentumScrollBegin = (event) => {
            var _a, _b;
            this.isScrolling = true;
            (_b = (_a = this.scrollCallbacks).onMomentumScrollBegin) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        /**
         * Handle momentum scroll end event (for individual page content)
         */
        this.handleMomentumScrollEnd = (event) => {
            var _a, _b;
            this.isScrolling = false;
            (_b = (_a = this.scrollCallbacks).onMomentumScrollEnd) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        this.pagerViewRef = null;
    }
    /**
     * Set the PagerView reference
     */
    setPagerViewRef(ref) {
        this.pagerViewRef = ref;
    }
    /**
     * Set scroll event callbacks
     */
    setScrollCallbacks(callbacks) {
        this.scrollCallbacks = Object.assign(Object.assign({}, this.scrollCallbacks), callbacks);
    }
    /**
     * Set page event callbacks
     */
    setPageCallbacks(callbacks) {
        this.pageCallbacks = Object.assign(Object.assign({}, this.pageCallbacks), callbacks);
    }
    /**
     * Set both scroll and page callbacks
     */
    setCallbacks(scrollCallbacks, pageCallbacks) {
        this.scrollCallbacks = Object.assign(Object.assign({}, this.scrollCallbacks), scrollCallbacks);
        if (pageCallbacks) {
            this.pageCallbacks = Object.assign(Object.assign({}, this.pageCallbacks), pageCallbacks);
        }
    }
    /**
     * Set total number of pages
     */
    setTotalPages(totalPages) {
        this.totalPages = totalPages;
    }
    /**
     * Get current page
     */
    getCurrentPage() {
        return this.currentPage;
    }
    /**
     * Get page scroll offset
     */
    getPageScrollOffset() {
        return this.pageScrollOffset;
    }
    /**
     * Get page scroll position
     */
    getPageScrollPosition() {
        return this.pageScrollPosition;
    }
    /**
     * Get current scroll position
     */
    getScrollPosition() {
        return Object.assign({}, this.lastScrollPosition);
    }
    /**
     * Check if currently scrolling
     */
    getIsScrolling() {
        return this.isScrolling;
    }
    /**
     * Get current scroll direction
     */
    getScrollDirection() {
        return this.scrollDirection;
    }
    /**
     * Set current page
     */
    setPage(page, animated = true) {
        var _a;
        if ((_a = this.pagerViewRef) === null || _a === void 0 ? void 0 : _a.current) {
            this.pagerViewRef.current.setPage(page);
        }
    }
    /**
     * Go to next page
     */
    nextPage(animated = true) {
        this.setPage(this.currentPage + 1, animated);
    }
    /**
     * Go to previous page
     */
    previousPage(animated = true) {
        this.setPage(this.currentPage - 1, animated);
    }
    /**
     * Scroll to specific position (for individual page content)
     */
    scrollTo(position, animated = true) {
        // This would need to be implemented per page if needed
        // For now, we'll just update the position tracking
        this.lastScrollPosition = Object.assign({}, position);
    }
    /**
     * Scroll to top (for individual page content)
     */
    scrollToTop(animated = true) {
        this.scrollTo({ x: 0, y: 0 }, animated);
    }
    /**
     * Scroll to bottom (for individual page content)
     */
    scrollToBottom(animated = true) {
        // This would need to be implemented per page if needed
        console.log('Scroll to bottom - implement per page');
    }
    /**
     * Scroll by offset (for individual page content)
     */
    scrollBy(offset, animated = true) {
        this.scrollTo({
            x: this.lastScrollPosition.x + offset.x,
            y: this.lastScrollPosition.y + offset.y,
        }, animated);
    }
    /**
     * Update scroll position and check for top/bottom
     */
    updateScrollPosition(position) {
        var _a, _b;
        this.lastScrollPosition = Object.assign({}, position);
        // Check if scrolled to top
        if (position.y <= 0) {
            (_b = (_a = this.scrollCallbacks).onScrollToTop) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        // Check if scrolled to bottom (this would need content height, simplified for now)
        // In a real implementation, you'd need to track content height
    }
    /**
     * Update scroll direction based on position change
     */
    updateScrollDirection(position) {
        const deltaX = position.x - this.lastScrollPosition.x;
        const deltaY = position.y - this.lastScrollPosition.y;
        if (Math.abs(deltaX) > this.scrollThreshold || Math.abs(deltaY) > this.scrollThreshold) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.scrollDirection = deltaX > 0 ? 'right' : 'left';
            }
            else {
                this.scrollDirection = deltaY > 0 ? 'down' : 'up';
            }
        }
    }
    /**
     * Set scroll threshold for direction detection
     */
    setScrollThreshold(threshold) {
        this.scrollThreshold = threshold;
    }
    /**
     * Reset scroll state
     */
    reset() {
        this.isScrolling = false;
        this.scrollDirection = null;
        this.lastScrollPosition = { x: 0, y: 0 };
        this.currentPage = 0;
        this.pageScrollOffset = 0;
        this.pageScrollPosition = 0;
        this.totalPages = null;
    }
    /**
     * Get total number of pages (if available)
     */
    getTotalPages() {
        return this.totalPages;
    }
    /**
     * Get page count (required by PageViewRef interface)
     */
    getPageCount() {
        return this.totalPages || 0;
    }
    /**
     * Check if at first page
     */
    isFirstPage() {
        return this.currentPage === 0;
    }
    /**
     * Check if at last page
     */
    isLastPage() {
        const totalPages = this.getTotalPages();
        return totalPages ? this.currentPage === totalPages - 1 : false;
    }
    /**
     * Get scroll metrics (simplified version)
     */
    getScrollMetrics() {
        return {
            contentOffset: this.lastScrollPosition,
            // Other metrics would need to be tracked from scroll events
        };
    }
}
exports.UIPageViewController = UIPageViewController;
