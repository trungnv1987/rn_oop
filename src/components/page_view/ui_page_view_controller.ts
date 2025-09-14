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
  contentInset: { top: number; right: number; bottom: number; left: number };
  contentOffset: ScrollPosition;
  layoutMeasurement: { width: number; height: number };
  zoomScale: number;
}

export interface PageViewRef {
  // Page navigation methods
  setPage: (page: number, animated?: boolean) => void;
  nextPage: (animated?: boolean) => void;
  previousPage: (animated?: boolean) => void;
  getCurrentPage: () => number;
  getPageScrollOffset: () => number;
  getPageScrollPosition: () => number;
  isFirstPage: () => boolean;
  isLastPage: () => boolean;
  getPageCount: () => number;

  // Scroll methods (for individual page content)
  scrollTo: (position: { x: number; y: number }, animated?: boolean) => void;
  scrollToTop: (animated?: boolean) => void;
  scrollToBottom: (animated?: boolean) => void;
  scrollBy: (offset: { x: number; y: number }, animated?: boolean) => void;
  getScrollPosition: () => { x: number; y: number };
  getIsScrolling: () => boolean;
  getScrollDirection: () => "up" | "down" | "left" | "right" | null;
  reset: () => void;
}

export class UIPageViewController implements PageViewRef {
  private pagerViewRef: React.RefObject<any> | null = null;
  private pageCallbacks: PageEventCallbacks = {};
  private scrollCallbacks: ScrollEventCallbacks = {};
  private isScrolling = false;
  private currentPage = 0;
  private pageScrollOffset = 0;
  private pageScrollPosition = 0;
  private totalPages: number | null = null;
  private scrollDirection: 'up' | 'down' | 'left' | 'right' | null = null;
  private lastScrollPosition: ScrollPosition = { x: 0, y: 0 };
  private scrollThreshold = 10; // Minimum distance to consider as scroll movement

  constructor() {
    this.pagerViewRef = null;
  }

  /**
   * Set the PagerView reference
   */
  setPagerViewRef(ref: React.RefObject<any>) {
    this.pagerViewRef = ref;
  }

  /**
   * Set scroll event callbacks
   */
  setScrollCallbacks(callbacks: ScrollEventCallbacks) {
    this.scrollCallbacks = { ...this.scrollCallbacks, ...callbacks };
  }

  /**
   * Set page event callbacks
   */
  setPageCallbacks(callbacks: PageEventCallbacks) {
    this.pageCallbacks = { ...this.pageCallbacks, ...callbacks };
  }

  /**
   * Set both scroll and page callbacks
   */
  setCallbacks(scrollCallbacks: ScrollEventCallbacks, pageCallbacks?: PageEventCallbacks) {
    this.scrollCallbacks = { ...this.scrollCallbacks, ...scrollCallbacks };
    if (pageCallbacks) {
      this.pageCallbacks = { ...this.pageCallbacks, ...pageCallbacks };
    }
  }

  /**
   * Set total number of pages
   */
  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }

  /**
   * Get current page
   */
  getCurrentPage(): number {
    return this.currentPage;
  }

  /**
   * Get page scroll offset
   */
  getPageScrollOffset(): number {
    return this.pageScrollOffset;
  }

  /**
   * Get page scroll position
   */
  getPageScrollPosition(): number {
    return this.pageScrollPosition;
  }

  /**
   * Get current scroll position
   */
  getScrollPosition(): ScrollPosition {
    return { ...this.lastScrollPosition };
  }

  /**
   * Check if currently scrolling
   */
  getIsScrolling(): boolean {
    return this.isScrolling;
  }

  /**
   * Get current scroll direction
   */
  getScrollDirection(): 'up' | 'down' | 'left' | 'right' | null {
    return this.scrollDirection;
  }

  /**
   * Set current page
   */
  setPage(page: number, animated: boolean = true) {
    if (this.pagerViewRef?.current) {
      this.pagerViewRef.current.setPage(page);
    }
  }

  /**
   * Go to next page
   */
  nextPage(animated: boolean = true) {
    this.setPage(this.currentPage + 1, animated);
  }

  /**
   * Go to previous page
   */
  previousPage(animated: boolean = true) {
    this.setPage(this.currentPage - 1, animated);
  }

  /**
   * Scroll to specific position (for individual page content)
   */
  scrollTo(position: ScrollPosition, animated: boolean = true) {
    // This would need to be implemented per page if needed
    // For now, we'll just update the position tracking
    this.lastScrollPosition = { ...position };
  }

  /**
   * Scroll to top (for individual page content)
   */
  scrollToTop(animated: boolean = true) {
    this.scrollTo({ x: 0, y: 0 }, animated);
  }

  /**
   * Scroll to bottom (for individual page content)
   */
  scrollToBottom(animated: boolean = true) {
    // This would need to be implemented per page if needed
    console.log('Scroll to bottom - implement per page');
  }

  /**
   * Scroll by offset (for individual page content)
   */
  scrollBy(offset: ScrollPosition, animated: boolean = true) {
    this.scrollTo({
      x: this.lastScrollPosition.x + offset.x,
      y: this.lastScrollPosition.y + offset.y,
    }, animated);
  }

  /**
   * Handle page scroll event
   */
  handlePageScroll = (event: any) => {
    const { position, offset } = event.nativeEvent;
    this.currentPage = position;
    this.pageScrollOffset = offset;
    this.pageScrollPosition = position + offset;
    this.isScrolling = true;
    this.pageCallbacks.onPageScroll?.(event);
  };

  /**
   * Handle page selected event
   */
  handlePageSelected = (event: any) => {
    const { position } = event.nativeEvent;
    this.currentPage = position;
    this.isScrolling = false;
    this.pageCallbacks.onPageSelected?.(event);
  };

  /**
   * Handle page scroll state changed event
   */
  handlePageScrollStateChanged = (event: any) => {
    const { pageScrollState } = event.nativeEvent;
    this.isScrolling = pageScrollState === 'dragging' || pageScrollState === 'settling';
    this.pageCallbacks.onPageScrollStateChanged?.(event);
  };

  /**
   * Handle scroll event (for individual page content)
   */
  handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    this.updateScrollPosition(contentOffset);
    this.updateScrollDirection(contentOffset);
    this.scrollCallbacks.onScroll?.(event);
  };

  /**
   * Handle scroll begin drag event (for individual page content)
   */
  handleScrollBeginDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.isScrolling = true;
    this.scrollCallbacks.onScrollBeginDrag?.(event);
  };

  /**
   * Handle scroll end drag event (for individual page content)
   */
  handleScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.isScrolling = false;
    this.scrollCallbacks.onScrollEndDrag?.(event);
  };

  /**
   * Handle momentum scroll begin event (for individual page content)
   */
  handleMomentumScrollBegin = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.isScrolling = true;
    this.scrollCallbacks.onMomentumScrollBegin?.(event);
  };

  /**
   * Handle momentum scroll end event (for individual page content)
   */
  handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.isScrolling = false;
    this.scrollCallbacks.onMomentumScrollEnd?.(event);
  };

  /**
   * Update scroll position and check for top/bottom
   */
  private updateScrollPosition(position: ScrollPosition) {
    this.lastScrollPosition = { ...position };
    
    // Check if scrolled to top
    if (position.y <= 0) {
      this.scrollCallbacks.onScrollToTop?.();
    }
    
    // Check if scrolled to bottom (this would need content height, simplified for now)
    // In a real implementation, you'd need to track content height
  }

  /**
   * Update scroll direction based on position change
   */
  private updateScrollDirection(position: ScrollPosition) {
    const deltaX = position.x - this.lastScrollPosition.x;
    const deltaY = position.y - this.lastScrollPosition.y;

    if (Math.abs(deltaX) > this.scrollThreshold || Math.abs(deltaY) > this.scrollThreshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        this.scrollDirection = deltaX > 0 ? 'right' : 'left';
      } else {
        this.scrollDirection = deltaY > 0 ? 'down' : 'up';
      }
    }
  }

  /**
   * Set scroll threshold for direction detection
   */
  setScrollThreshold(threshold: number) {
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
  getTotalPages(): number | null {
    return this.totalPages;
  }

  /**
   * Get page count (required by PageViewRef interface)
   */
  getPageCount(): number {
    return this.totalPages || 0;
  }

  /**
   * Check if at first page
   */
  isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  /**
   * Check if at last page
   */
  isLastPage(): boolean {
    const totalPages = this.getTotalPages();
    return totalPages ? this.currentPage === totalPages - 1 : false;
  }

  /**
   * Get scroll metrics (simplified version)
   */
  getScrollMetrics(): Partial<ScrollMetrics> {
    return {
      contentOffset: this.lastScrollPosition,
      // Other metrics would need to be tracked from scroll events
    };
  }
}
