# UIPageIndicator Component

A flexible and customizable page indicator component that works seamlessly with UIPageViewController to show page navigation indicators.

## Features

- 🎯 **Controller Integration**: Automatically syncs with UIPageViewController
- 🎨 **Multiple Variants**: Dots, numbers, labels, and mixed indicators
- 📱 **Responsive Design**: Adapts to different screen sizes and orientations
- 🎛️ **Highly Customizable**: Colors, sizes, spacing, and styling options
- 🔄 **Real-time Updates**: Automatically updates when pages change
- 👆 **Interactive**: Tap to navigate to specific pages
- 📊 **Page Counter**: Optional current page display
- 🎭 **Animation Support**: Smooth transitions and scaling effects

## Variants

### 1. Dots (Default)
Simple circular indicators showing current page position.

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="dots"
  indicatorSize={10}
  activeColor="#007AFF"
  inactiveColor="#CCCCCC"
/>
```

### 2. Numbers
Numbered indicators with page numbers.

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="numbers"
  indicatorSize={12}
  activeColor="#007AFF"
  textColor="#666666"
  activeTextColor="#FFFFFF"
/>
```

### 3. Labels
Text-based indicators with custom labels.

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="labels"
  labels={["Welcome", "Features", "Settings", "Profile", "Complete"]}
  activeColor="#007AFF"
  textColor="#666666"
  activeTextColor="#FFFFFF"
/>
```

### 4. Mixed
Combination of dots and labels.

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="mixed"
  labels={["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"]}
  indicatorSize={8}
  activeColor="#007AFF"
  textColor="#666666"
  activeTextColor="#007AFF"
/>
```

## Props

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `controller` | `UIPageViewController` | Controller instance for page management |
| `pageCount` | `number` | Total number of pages |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | - | External current page (overrides controller) |
| `style` | `ViewStyle` | - | Container style |
| `indicatorStyle` | `ViewStyle` | - | Base indicator style |
| `activeIndicatorStyle` | `ViewStyle` | - | Active indicator style |
| `inactiveIndicatorStyle` | `ViewStyle` | - | Inactive indicator style |
| `indicatorSize` | `number` | `8` | Size of indicators |
| `indicatorSpacing` | `number` | `8` | Spacing between indicators |
| `showLabels` | `boolean` | `false` | Show labels (deprecated, use variant) |
| `labels` | `string[]` | `[]` | Custom labels for each page |
| `onPagePress` | `(page: number) => void` | - | Callback when indicator is pressed |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Indicator orientation |
| `variant` | `"dots" \| "numbers" \| "labels" \| "mixed"` | `"dots"` | Indicator variant |
| `color` | `string` | `"#CCCCCC"` | Base color for indicators |
| `activeColor` | `string` | `"#007AFF"` | Active indicator color |
| `inactiveColor` | `string` | `"#CCCCCC"` | Inactive indicator color |
| `textColor` | `string` | `"#666666"` | Text color for labels/numbers |
| `activeTextColor` | `string` | `"#007AFF"` | Active text color |
| `showCurrentPage` | `boolean` | `false` | Show current page counter |
| `currentPageStyle` | `ViewStyle` | - | Current page counter style |
| `currentPageTextStyle` | `ViewStyle` | - | Current page text style |

## Usage Examples

### Basic Usage

```typescript
import { UIPageIndicator, UIPageViewController } from './ui_page_indicator';

function MyComponent() {
  const controller = new UIPageViewController();

  return (
    <UIPageIndicator
      controller={controller}
      pageCount={5}
      variant="dots"
      activeColor="#007AFF"
      inactiveColor="#CCCCCC"
    />
  );
}
```

### With PageView Integration

```typescript
import { PageView, UIPageIndicator, UIPageViewController } from './ui_page_view';

function MyComponent() {
  const pageViewRef = useRef<PageViewRef>(null);
  const controller = new UIPageViewController();

  return (
    <View style={{ flex: 1 }}>
      <PageView
        ref={pageViewRef}
        controller={controller}
        pageBuilder={pageBuilder}
        pageCount={5}
      />
      <UIPageIndicator
        controller={controller}
        pageCount={5}
        variant="dots"
        onPagePress={(page) => pageViewRef.current?.setPage(page)}
      />
    </View>
  );
}
```

### Custom Styling

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="numbers"
  indicatorSize={16}
  indicatorSpacing={12}
  activeColor="#FF6B6B"
  inactiveColor="#E0E0E0"
  textColor="#666666"
  activeTextColor="#FFFFFF"
  style={{
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  }}
  activeIndicatorStyle={{
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  }}
  onPagePress={(page) => console.log('Navigate to page:', page)}
/>
```

### With Labels

```typescript
const pageLabels = [
  "Welcome",
  "Features", 
  "Settings",
  "Profile",
  "Complete"
];

<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="labels"
  labels={pageLabels}
  indicatorSize={10}
  indicatorSpacing={8}
  activeColor="#007AFF"
  inactiveColor="#F0F0F0"
  textColor="#666666"
  activeTextColor="#FFFFFF"
/>
```

### Vertical Orientation

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="dots"
  orientation="vertical"
  indicatorSize={8}
  indicatorSpacing={12}
  style={{ height: 200 }}
/>
```

### With Page Counter

```typescript
<UIPageIndicator
  controller={controller}
  pageCount={5}
  variant="dots"
  showCurrentPage={true}
  currentPageStyle={{
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  }}
  currentPageTextStyle={{
    fontSize: 12,
    fontWeight: '600',
  }}
/>
```

## Controller Integration

The UIPageIndicator automatically syncs with the UIPageViewController:

```typescript
const controller = new UIPageViewController();

// Set up page callbacks
controller.setPageCallbacks({
  onPageSelected: (event) => {
    console.log('Page selected:', event.nativeEvent.position);
  },
  onPageScroll: (event) => {
    console.log('Page scrolling:', event.nativeEvent);
  },
});

// Use with indicator
<UIPageIndicator
  controller={controller}
  pageCount={5}
  onPagePress={(page) => controller.setPage(page, true)}
/>
```

## Event Handling

### Page Press Events

```typescript
const handlePagePress = (page: number) => {
  console.log('Indicator pressed for page:', page);
  // Navigate to page
  pageViewRef.current?.setPage(page, true);
};

<UIPageIndicator
  controller={controller}
  pageCount={5}
  onPagePress={handlePagePress}
/>
```

### External Page Control

```typescript
const [currentPage, setCurrentPage] = useState(0);

// Update indicator when page changes externally
<UIPageIndicator
  controller={controller}
  pageCount={5}
  currentPage={currentPage}
  onPagePress={(page) => setCurrentPage(page)}
/>
```

## Styling Guidelines

### Color Schemes

#### iOS Style
```typescript
activeColor="#007AFF"
inactiveColor="#CCCCCC"
textColor="#666666"
activeTextColor="#FFFFFF"
```

#### Material Design
```typescript
activeColor="#2196F3"
inactiveColor="#E0E0E0"
textColor="#666666"
activeTextColor="#FFFFFF"
```

#### Custom Theme
```typescript
activeColor="#FF6B6B"
inactiveColor="#F0F0F0"
textColor="#333333"
activeTextColor="#FFFFFF"
```

### Size Guidelines

- **Small**: `indicatorSize={6}`, `indicatorSpacing={6}`
- **Medium**: `indicatorSize={8}`, `indicatorSpacing={8}` (default)
- **Large**: `indicatorSize={12}`, `indicatorSpacing={12}`
- **Extra Large**: `indicatorSize={16}`, `indicatorSpacing={16}`

## Performance Considerations

### Memoization

```typescript
const MemoizedPageIndicator = React.memo(UIPageIndicator);

// Use in component
<MemoizedPageIndicator
  controller={controller}
  pageCount={pageCount}
  variant="dots"
/>
```

### Conditional Rendering

```typescript
{pageCount > 1 && (
  <UIPageIndicator
    controller={controller}
    pageCount={pageCount}
    variant="dots"
  />
)}
```

## Accessibility

The component includes built-in accessibility features:

- Touch targets meet minimum size requirements
- Proper contrast ratios for text and indicators
- Screen reader support for page information
- Keyboard navigation support

## Troubleshooting

### Common Issues

1. **Indicator not updating**: Ensure controller is properly connected
2. **Wrong page count**: Verify pageCount prop matches actual pages
3. **Styling issues**: Check style prop inheritance and specificity
4. **Performance**: Use memoization for large page counts

### Debug Tips

```typescript
// Add debug logging
<UIPageIndicator
  controller={controller}
  pageCount={5}
  onPagePress={(page) => {
    console.log('Page pressed:', page);
    console.log('Controller current page:', controller.getCurrentPage());
  }}
/>
```

## Best Practices

1. **Use appropriate variant** for your use case
2. **Provide meaningful labels** for better UX
3. **Test with different page counts** to ensure scalability
4. **Consider accessibility** when choosing colors and sizes
5. **Use consistent styling** across your app
6. **Handle edge cases** like single page scenarios

This component provides a complete solution for page indication in your React Native applications!
