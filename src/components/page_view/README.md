# PageView Component

A powerful React Native page view component with **Controller-First Architecture** for managing page navigation, scroll events, and programmatic control.

## Features

- 🎯 **Controller-First Architecture**: All functionality centralized in UIPageViewController
- 📱 **React Native PagerView Integration**: Built on top of react-native-pager-view
- 🎨 **Dynamic Page Rendering**: Support for pageBuilder pattern
- 🔄 **Event Handling**: Comprehensive scroll and page event callbacks
- 🎛️ **Programmatic Control**: Navigate pages programmatically through controller
- 📊 **State Management**: Built-in state tracking and management
- 🎭 **Customizable**: Highly customizable appearance and behavior
- 🔗 **UIPageIndicator**: Integrated page indicator component

## Architecture

The PageView system follows a **Controller-First Architecture**:

- **UIPageViewController** - Contains all business logic and state management
- **PageView** - Simple React component that renders content and delegates to controller
- **UIPageIndicator** - Visual indicator that consumes controller state
- **PageViewRef** - Interface implemented by UIPageViewController

## Components

### UIPageViewController

The controller class that manages all page and scroll functionality:

```typescript
const controller = new UIPageViewController();
```

#### Key Methods

**Page Navigation:**
- `setPage(page, animated)` - Navigate to specific page
- `nextPage(animated)` - Go to next page
- `previousPage(animated)` - Go to previous page
- `getCurrentPage()` - Get current page index
- `getPageCount()` - Get total page count
- `isFirstPage()` / `isLastPage()` - Check page position

**Scroll Control:**
- `scrollTo(position, animated)` - Scroll to specific position
- `scrollToTop(animated)` - Scroll to top
- `scrollToBottom(animated)` - Scroll to bottom
- `scrollBy(offset, animated)` - Scroll by offset
- `getScrollPosition()` - Get current scroll position
- `getIsScrolling()` - Check if currently scrolling
- `getScrollDirection()` - Get current scroll direction
- `reset()` - Reset all state

### PageView

The main page view component that uses the controller:

```typescript
<PageView
  controller={controller}
  pageBuilder={pageBuilder}
  pageCount={5}
  // ... other props
/>
```

### UIPageIndicator

Visual page indicator component:

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="dots"
  activeColor="#007AFF"
  inactiveColor="#CCCCCC"
/>
```

## Usage

### Basic Usage

```typescript
import React from 'react';
import { PageView, UIPageViewController } from './ui_page_view';

function MyComponent() {
  const controller = new UIPageViewController();

  const goToNextPage = () => {
    controller.nextPage(true);
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

### With Page Builder

```typescript
function MyComponent() {
  const controller = new UIPageViewController();

  const pageBuilder = (index: number) => {
    return (
      <View style={{ backgroundColor: colors[index] }}>
        <Text>Page {index + 1}</Text>
      </View>
    );
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

### With Page Indicator

```typescript
function MyComponent() {
  const controller = new UIPageViewController();

  return (
    <View style={{ flex: 1 }}>
      <PageView
        controller={controller}
        pageBuilder={pageBuilder}
        pageCount={5}
      />
      <UIPageIndicator
        controller={controller}
        pageCount={5}
        variant="dots"
        onPagePress={(page) => controller.setPage(page)}
      />
    </View>
  );
}
```

### With Event Callbacks

```typescript
function MyComponent() {
  const controller = new UIPageViewController();
  const [currentPage, setCurrentPage] = useState(0);

  const pageCallbacks = {
    onPageSelected: (event) => {
      setCurrentPage(event.nativeEvent.position);
    },
    onPageScroll: (event) => {
      console.log('Page scrolling:', event.nativeEvent);
    },
  };

  const scrollCallbacks = {
    onScrollToTop: () => console.log('Reached top!'),
    onScrollToBottom: () => console.log('Reached bottom!'),
  };

  return (
    <PageView
      controller={controller}
      pageCallbacks={pageCallbacks}
      scrollCallbacks={scrollCallbacks}
      pageBuilder={pageBuilder}
      pageCount={5}
    />
  );
}
```

## Props

### PageView Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `controller` | `UIPageViewController` | - | **Required** - Controller instance |
| `pageBuilder` | `(index: number) => ReactNode` | - | Function to render pages dynamically |
| `pageCount` | `number` | - | Total number of pages |
| `children` | `ReactNode` | - | Static content (if not using pageBuilder) |
| `pageCallbacks` | `PageEventCallbacks` | - | Page event callbacks |
| `scrollCallbacks` | `ScrollEventCallbacks` | - | Scroll event callbacks |
| `style` | `ViewStyle` | - | Component style |
| `initialPage` | `number` | `0` | Initial page index |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Page orientation |
| `offscreenPageLimit` | `number` | `1` | Number of offscreen pages to keep |
| `keyboardDismissMode` | `"none" \| "on-drag"` | `"none"` | Keyboard dismiss mode |
| `scrollEnabled` | `boolean` | `true` | Enable scrolling |

### UIPageIndicator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `controller` | `UIPageViewController` | - | **Required** - Controller instance |
| `pageCount` | `number` | - | **Required** - Total number of pages |
| `variant` | `"dots" \| "numbers" \| "labels" \| "mixed"` | `"dots"` | Indicator variant |
| `indicatorSize` | `number` | `8` | Size of indicators |
| `indicatorSpacing` | `number` | `8` | Spacing between indicators |
| `activeColor` | `string` | `"#007AFF"` | Active indicator color |
| `inactiveColor` | `string` | `"#CCCCCC"` | Inactive indicator color |
| `labels` | `string[]` | `[]` | Custom labels for each page |
| `onPagePress` | `(page: number) => void` | - | Callback when indicator is pressed |
| `showCurrentPage` | `boolean` | `false` | Show current page counter |

## Event Callbacks

### PageEventCallbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onPageScroll` | `(event) => void` | Called during page scrolling |
| `onPageSelected` | `(event) => void` | Called when page is selected |
| `onPageScrollStateChanged` | `(event) => void` | Called when scroll state changes |

### ScrollEventCallbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onScroll` | `(event) => void` | Called on every scroll event |
| `onScrollBeginDrag` | `(event) => void` | Called when user starts dragging |
| `onScrollEndDrag` | `(event) => void` | Called when user stops dragging |
| `onMomentumScrollBegin` | `(event) => void` | Called when momentum scroll starts |
| `onMomentumScrollEnd` | `(event) => void` | Called when momentum scroll ends |
| `onScrollToTop` | `() => void` | Called when scrolled to top |
| `onScrollToBottom` | `() => void` | Called when scrolled to bottom |

## Advanced Usage

### Multiple Controllers

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

  return (
    <View>
      <PageView controller={mainController} />
      <UIPageIndicator controller={indicatorController} />
    </View>
  );
}
```

### External State Management

```typescript
function MyComponent() {
  const controller = new UIPageViewController();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    controller.setPageCallbacks({
      onPageSelected: (event) => {
        setCurrentPage(event.nativeEvent.position);
      },
    });
  }, [controller]);

  return <PageView controller={controller} />;
}
```

### Custom Page Builder

```typescript
const pageBuilder = (index: number) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  
  return (
    <ScrollView style={{ backgroundColor: colors[index] }}>
      <Text>Page {index + 1}</Text>
      {/* Dynamic content based on page index */}
    </ScrollView>
  );
};
```

## Examples

- **Basic Example**: `page_view_example.tsx` - Complete working example
- **Page Indicator Example**: `page_indicator_example.tsx` - UIPageIndicator integration
- **Architecture Guide**: `ARCHITECTURE.md` - Detailed architecture explanation

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { 
  PageView, 
  UIPageViewController, 
  UIPageIndicator,
  PageViewRef,
  PageEventCallbacks,
  ScrollEventCallbacks 
} from './ui_page_view';
```

## Performance Considerations

- Use `useMemo` for controller instances to prevent recreation
- Implement proper cleanup in `useEffect` hooks
- Use `offscreenPageLimit` to control memory usage
- Consider using `onMomentumScrollEnd` for final position updates

## Migration from Ref-based Architecture

### Before (Ref-based)
```typescript
const pageViewRef = useRef<PageViewRef>(null);
pageViewRef.current?.nextPage(true);
```

### After (Controller-based)
```typescript
const controller = new UIPageViewController();
controller.nextPage(true);
```

This architecture provides a clean, testable, and maintainable foundation for page-based navigation in React Native applications.