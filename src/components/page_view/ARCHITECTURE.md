# PageView Architecture

This document explains the refactored architecture where all PageView functionality is centralized in the UIPageViewController.

## Architecture Overview

The PageView system follows a **Controller-First Architecture** where:

1. **UIPageViewController** - Contains all business logic and state management
2. **PageView** - A simple React component that renders content and delegates to controller
3. **UIPageIndicator** - Consumes controller state and provides visual feedback
4. **PageViewRef** - Interface implemented by UIPageViewController

## Key Benefits

### ✅ **Single Source of Truth**
- All page logic lives in UIPageViewController
- No duplication between component and ref methods
- Consistent state management across all consumers

### ✅ **Better Separation of Concerns**
- Controller handles all business logic
- Component focuses only on rendering
- Clear boundaries between layers

### ✅ **Improved Testability**
- Controller can be tested independently
- No need to test through React refs
- Easier to mock and unit test

### ✅ **Enhanced Reusability**
- Controller can be used without React components
- Multiple components can share the same controller
- Easier to integrate with different UI libraries

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    UIPageViewController                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PageViewRef Interface                  │   │
│  │  • setPage()                                       │   │
│  │  • nextPage()                                      │   │
│  │  • previousPage()                                  │   │
│  │  • getCurrentPage()                                │   │
│  │  • getPageCount()                                  │   │
│  │  • isFirstPage() / isLastPage()                    │   │
│  │  • scrollTo() / scrollToTop() / scrollToBottom()   │   │
│  │  • getScrollPosition() / getIsScrolling()          │   │
│  │  • reset()                                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Internal State                         │   │
│  │  • currentPage, pageScrollOffset                   │   │
│  │  • isScrolling, scrollDirection                    │   │
│  │  • pageCallbacks, scrollCallbacks                  │   │
│  │  • pagerViewRef                                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                │
                                │ implements
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                        PageView                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React Component                        │   │
│  │  • Renders pages using pageBuilder or children     │   │
│  │  • Delegates all operations to controller          │   │
│  │  • Exposes controller as ref                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                │
                                │ uses
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                    UIPageIndicator                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Visual Indicator                       │   │
│  │  • Subscribes to controller state                  │   │
│  │  • Renders dots, numbers, or labels                │   │
│  │  • Handles user interactions                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Usage Patterns

### 1. Direct Controller Usage (Recommended)

```typescript
function MyComponent() {
  const controller = new UIPageViewController();

  const goToNextPage = () => {
    controller.nextPage(true);
  };

  const getPageInfo = () => {
    console.log('Current page:', controller.getCurrentPage());
    console.log('Total pages:', controller.getPageCount());
  };

  return (
    <PageView
      controller={controller}
      pageBuilder={pageBuilder}
      pageCount={5}
    />
  );
}
```

### 2. Controller with Multiple Consumers

```typescript
function MyComponent() {
  const controller = new UIPageViewController();

  return (
    <View>
      <PageView
        controller={controller}
        pageBuilder={pageBuilder}
        pageCount={5}
      />
      <UIPageIndicator
        controller={controller}
        pageCount={5}
        variant="dots"
      />
      <CustomNavigation
        controller={controller}
      />
    </View>
  );
}
```

### 3. External State Management

```typescript
function MyComponent() {
  const controller = new UIPageViewController();
  const [currentPage, setCurrentPage] = useState(0);

  // Sync external state with controller
  useEffect(() => {
    const pageCallbacks = {
      onPageSelected: (event) => {
        setCurrentPage(event.nativeEvent.position);
      },
    };
    controller.setPageCallbacks(pageCallbacks);
  }, [controller]);

  return (
    <PageView
      controller={controller}
      pageBuilder={pageBuilder}
      pageCount={5}
    />
  );
}
```

## Migration Guide

### Before (Ref-based)

```typescript
// Old approach
const pageViewRef = useRef<PageViewRef>(null);

const goToNextPage = () => {
  pageViewRef.current?.nextPage(true);
};

<PageView ref={pageViewRef} />
```

### After (Controller-based)

```typescript
// New approach
const controller = new UIPageViewController();

const goToNextPage = () => {
  controller.nextPage(true);
};

<PageView controller={controller} />
```

## API Changes

### PageView Component

| Before | After | Notes |
|--------|-------|-------|
| `ref={pageViewRef}` | `controller={controller}` | Required prop |
| `pageViewRef.current?.method()` | `controller.method()` | Direct method calls |

### UIPageViewController

| Method | Description | Return Type |
|--------|-------------|-------------|
| `setPage(page, animated)` | Navigate to specific page | `void` |
| `nextPage(animated)` | Go to next page | `void` |
| `previousPage(animated)` | Go to previous page | `void` |
| `getCurrentPage()` | Get current page index | `number` |
| `getPageCount()` | Get total page count | `number` |
| `isFirstPage()` | Check if at first page | `boolean` |
| `isLastPage()` | Check if at last page | `boolean` |
| `scrollTo(position, animated)` | Scroll to position | `void` |
| `scrollToTop(animated)` | Scroll to top | `void` |
| `scrollToBottom(animated)` | Scroll to bottom | `void` |
| `scrollBy(offset, animated)` | Scroll by offset | `void` |
| `getScrollPosition()` | Get scroll position | `ScrollPosition` |
| `getIsScrolling()` | Check if scrolling | `boolean` |
| `getScrollDirection()` | Get scroll direction | `string \| null` |
| `reset()` | Reset all state | `void` |

## Best Practices

### 1. Controller Lifecycle

```typescript
function MyComponent() {
  const controller = useMemo(() => new UIPageViewController(), []);

  useEffect(() => {
    // Set up callbacks
    controller.setPageCallbacks({
      onPageSelected: (event) => {
        console.log('Page selected:', event.nativeEvent.position);
      },
    });

    // Cleanup
    return () => {
      controller.setPageCallbacks({});
    };
  }, [controller]);

  return <PageView controller={controller} />;
}
```

### 2. State Synchronization

```typescript
function MyComponent() {
  const controller = new UIPageViewController();
  const [currentPage, setCurrentPage] = useState(0);

  // Sync controller state with local state
  useEffect(() => {
    const updateState = () => {
      setCurrentPage(controller.getCurrentPage());
    };

    controller.setPageCallbacks({
      onPageSelected: updateState,
      onPageScroll: updateState,
    });

    return () => controller.setPageCallbacks({});
  }, [controller]);
}
```

### 3. Multiple Controllers

```typescript
function MyComponent() {
  const mainController = new UIPageViewController();
  const indicatorController = new UIPageViewController();

  // Sync controllers
  useEffect(() => {
    const syncControllers = () => {
      const currentPage = mainController.getCurrentPage();
      indicatorController.setPage(currentPage, false);
    };

    mainController.setPageCallbacks({
      onPageSelected: syncControllers,
    });
  }, [mainController, indicatorController]);
}
```

## Testing

### Unit Testing Controller

```typescript
describe('UIPageViewController', () => {
  let controller: UIPageViewController;

  beforeEach(() => {
    controller = new UIPageViewController();
  });

  it('should navigate to next page', () => {
    controller.setTotalPages(5);
    controller.nextPage();
    expect(controller.getCurrentPage()).toBe(1);
  });

  it('should detect first and last pages', () => {
    controller.setTotalPages(3);
    expect(controller.isFirstPage()).toBe(true);
    
    controller.setPage(2);
    expect(controller.isLastPage()).toBe(true);
  });
});
```

### Integration Testing

```typescript
describe('PageView Integration', () => {
  it('should sync controller and component', () => {
    const controller = new UIPageViewController();
    const { getByTestId } = render(
      <PageView controller={controller} pageCount={3} />
    );

    controller.nextPage();
    expect(controller.getCurrentPage()).toBe(1);
  });
});
```

## Performance Considerations

### 1. Controller Memoization

```typescript
const controller = useMemo(() => new UIPageViewController(), []);
```

### 2. Callback Optimization

```typescript
const pageCallbacks = useMemo(() => ({
  onPageSelected: (event) => {
    // Handle page selection
  },
}), []);

controller.setPageCallbacks(pageCallbacks);
```

### 3. Conditional Rendering

```typescript
{pageCount > 1 && (
  <UIPageIndicator
    controller={controller}
    pageCount={pageCount}
  />
)}
```

This architecture provides a clean, testable, and maintainable foundation for page-based navigation in React Native applications.
