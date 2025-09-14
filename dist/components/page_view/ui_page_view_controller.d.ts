/// <reference types="react" />
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
export interface PageEventCallbacks {
    onPageScroll?: (event: any) => void;
    onPageSelected?: (event: any) => void;
    onPageScrollStateChanged?: (event: any) => void;
}
export interface ScrollEventCallbacks {
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollBeginDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onMomentumScrollBegin?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onMomentumScrollEnd?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    onScrollToTop?: () => void;
    onScrollToBottom?: () => void;
}
export interface ScrollPosition {
    x: number;
    y: number;
}
export interface ScrollMetrics {
    contentLength: number;
    contentInset: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    contentOffset: ScrollPosition;
    layoutMeasurement: {
        width: number;
        height: number;
    };
    zoomScale: number;
}
export interface PageViewRef {
    setPage: (page: number, animated?: boolean) => void;
    nextPage: (animated?: boolean) => void;
    previousPage: (animated?: boolean) => void;
    getCurrentPage: () => number;
    getPageScrollOffset: () => number;
    getPageScrollPosition: () => number;
    isFirstPage: () => boolean;
    isLastPage: () => boolean;
    getPageCount: () => number;
    scrollTo: (position: {
        x: number;
        y: number;
    }, animated?: boolean) => void;
    scrollToTop: (animated?: boolean) => void;
    scrollToBottom: (animated?: boolean) => void;
    scrollBy: (offset: {
        x: number;
        y: number;
    }, animated?: boolean) => void;
    getScrollPosition: () => {
        x: number;
        y: number;
    };
    getIsScrolling: () => boolean;
    getScrollDirection: () => "up" | "down" | "left" | "right" | null;
    reset: () => void;
}
export declare class UIPageViewController implements PageViewRef {
    private pagerViewRef;
    private pageCallbacks;
    private scrollCallbacks;
    private isScrolling;
    private currentPage;
    private pageScrollOffset;
    private pageScrollPosition;
    private totalPages;
    private scrollDirection;
    private lastScrollPosition;
    private scrollThreshold;
    constructor();
    /**
     * Set the PagerView reference
     */
    setPagerViewRef(ref: React.RefObject<any>): void;
    /**
     * Set scroll event callbacks
     */
    setScrollCallbacks(callbacks: ScrollEventCallbacks): void;
    /**
     * Set page event callbacks
     */
    setPageCallbacks(callbacks: PageEventCallbacks): void;
    /**
     * Set both scroll and page callbacks
     */
    setCallbacks(scrollCallbacks: ScrollEventCallbacks, pageCallbacks?: PageEventCallbacks): void;
    /**
     * Set total number of pages
     */
    setTotalPages(totalPages: number): void;
    /**
     * Get current page
     */
    getCurrentPage(): number;
    /**
     * Get page scroll offset
     */
    getPageScrollOffset(): number;
    /**
     * Get page scroll position
     */
    getPageScrollPosition(): number;
    /**
     * Get current scroll position
     */
    getScrollPosition(): ScrollPosition;
    /**
     * Check if currently scrolling
     */
    getIsScrolling(): boolean;
    /**
     * Get current scroll direction
     */
    getScrollDirection(): 'up' | 'down' | 'left' | 'right' | null;
    /**
     * Set current page
     */
    setPage(page: number, animated?: boolean): void;
    /**
     * Go to next page
     */
    nextPage(animated?: boolean): void;
    /**
     * Go to previous page
     */
    previousPage(animated?: boolean): void;
    /**
     * Scroll to specific position (for individual page content)
     */
    scrollTo(position: ScrollPosition, animated?: boolean): void;
    /**
     * Scroll to top (for individual page content)
     */
    scrollToTop(animated?: boolean): void;
    /**
     * Scroll to bottom (for individual page content)
     */
    scrollToBottom(animated?: boolean): void;
    /**
     * Scroll by offset (for individual page content)
     */
    scrollBy(offset: ScrollPosition, animated?: boolean): void;
    /**
     * Handle page scroll event
     */
    handlePageScroll: (event: any) => void;
    /**
     * Handle page selected event
     */
    handlePageSelected: (event: any) => void;
    /**
     * Handle page scroll state changed event
     */
    handlePageScrollStateChanged: (event: any) => void;
    /**
     * Handle scroll event (for individual page content)
     */
    handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Handle scroll begin drag event (for individual page content)
     */
    handleScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Handle scroll end drag event (for individual page content)
     */
    handleScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Handle momentum scroll begin event (for individual page content)
     */
    handleMomentumScrollBegin: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Handle momentum scroll end event (for individual page content)
     */
    handleMomentumScrollEnd: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    /**
     * Update scroll position and check for top/bottom
     */
    private updateScrollPosition;
    /**
     * Update scroll direction based on position change
     */
    private updateScrollDirection;
    /**
     * Set scroll threshold for direction detection
     */
    setScrollThreshold(threshold: number): void;
    /**
     * Reset scroll state
     */
    reset(): void;
    /**
     * Get total number of pages (if available)
     */
    getTotalPages(): number | null;
    /**
     * Get page count (required by PageViewRef interface)
     */
    getPageCount(): number;
    /**
     * Check if at first page
     */
    isFirstPage(): boolean;
    /**
     * Check if at last page
     */
    isLastPage(): boolean;
    /**
     * Get scroll metrics (simplified version)
     */
    getScrollMetrics(): Partial<ScrollMetrics>;
}
//# sourceMappingURL=ui_page_view_controller.d.ts.map