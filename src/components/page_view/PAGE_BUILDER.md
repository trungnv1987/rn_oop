# PageBuilder Functionality

The PageView component now supports a `pageBuilder` prop that allows you to dynamically render pages based on their index. This is particularly useful for creating paginated content where each page is generated programmatically.

## Features

- 🎯 **Dynamic Page Rendering**: Render pages based on index using a builder function
- 📊 **Page Count Management**: Specify total number of pages
- 🔄 **Lazy Loading**: Pages are rendered on-demand
- 🎨 **Flexible Content**: Each page can have completely different content
- 📱 **Performance Optimized**: Only visible pages are rendered

## Usage

### Basic PageBuilder Usage

```typescript
import { PageView, PageViewRef, UIPageViewController } from './ui_page_view';

function MyComponent() {
  const pageViewRef = useRef<PageViewRef>(null);
  const controller = new UIPageViewController();

  // Define how each page should be rendered
  const pageBuilder = (index: number) => {
    return (
      <View style={{ flex: 1, backgroundColor: getPageColor(index) }}>
        <Text>Page {index + 1}</Text>
        <Text>This is dynamically generated content</Text>
      </View>
    );
  };

  return (
    <PageView
      ref={pageViewRef}
      controller={controller}
      pageBuilder={pageBuilder}
      pageCount={5}
      initialPage={0}
      orientation="horizontal"
    />
  );
}
```

### Advanced PageBuilder with Different Content Types

```typescript
const pageBuilder = (index: number) => {
  const pageData = getPageData(index);
  
  switch (pageData.type) {
    case 'text':
      return <TextPage data={pageData} />;
    case 'image':
      return <ImagePage data={pageData} />;
    case 'form':
      return <FormPage data={pageData} />;
    default:
      return <DefaultPage data={pageData} />;
  }
};
```

### PageBuilder with State Management

```typescript
function MyComponent() {
  const [pageData, setPageData] = useState([]);
  const pageViewRef = useRef<PageViewRef>(null);

  const pageBuilder = (index: number) => {
    const data = pageData[index];
    
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.pageHeader}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>Page {index + 1} of {pageData.length}</Text>
        </View>
        {data.items.map((item, itemIndex) => (
          <View key={itemIndex} style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <PageView
      ref={pageViewRef}
      pageBuilder={pageBuilder}
      pageCount={pageData.length}
      onPageSelected={(event) => {
        console.log('Selected page:', event.nativeEvent.position);
      }}
    />
  );
}
```

## Props

### PageView Props

| Prop | Type | Description |
|------|------|-------------|
| `pageBuilder` | `(index: number) => ReactNode` | Function that renders a page at the given index |
| `pageCount` | `number` | Total number of pages to render |
| `children` | `ReactNode` | Alternative to pageBuilder - static children |
| `controller` | `UIPageViewController` | Controller instance for managing page state |
| `initialPage` | `number` | Initial page to display (default: 0) |
| `orientation` | `"horizontal" \| "vertical"` | Page orientation (default: "horizontal") |
| `offscreenPageLimit` | `number` | Number of pages to keep in memory (default: 1) |

### PageViewRef Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `setPage` | `page: number, animated?: boolean` | `void` | Navigate to specific page |
| `nextPage` | `animated?: boolean` | `void` | Go to next page |
| `previousPage` | `animated?: boolean` | `void` | Go to previous page |
| `getCurrentPage` | - | `number` | Get current page index |
| `getPageCount` | - | `number` | Get total number of pages |
| `isFirstPage` | - | `boolean` | Check if at first page |
| `isLastPage` | - | `boolean` | Check if at last page |

## Event Callbacks

### Page Events

```typescript
const pageCallbacks = {
  onPageScroll: (event) => {
    const { position, offset } = event.nativeEvent;
    console.log('Scrolling to page:', position, 'offset:', offset);
  },
  onPageSelected: (event) => {
    const { position } = event.nativeEvent;
    console.log('Page selected:', position);
  },
  onPageScrollStateChanged: (event) => {
    const { pageScrollState } = event.nativeEvent;
    console.log('Scroll state:', pageScrollState);
  },
};
```

## Best Practices

### 1. Memoize PageBuilder Function

```typescript
const pageBuilder = useCallback((index: number) => {
  return <MyPageComponent index={index} data={pageData[index]} />;
}, [pageData]);
```

### 2. Use Lazy Loading for Heavy Content

```typescript
const pageBuilder = (index: number) => {
  const isVisible = Math.abs(index - currentPage) <= 1;
  
  return (
    <View style={{ flex: 1 }}>
      {isVisible ? (
        <HeavyContentComponent data={pageData[index]} />
      ) : (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} />
      )}
    </View>
  );
};
```

### 3. Handle Dynamic Page Count

```typescript
const [pageCount, setPageCount] = useState(0);

useEffect(() => {
  // Update page count when data changes
  setPageCount(pageData.length);
}, [pageData]);

const pageBuilder = (index: number) => {
  if (index >= pageData.length) {
    return <LoadingPage />;
  }
  
  return <ContentPage data={pageData[index]} />;
};
```

### 4. Performance Optimization

```typescript
const pageBuilder = useCallback((index: number) => {
  // Only render essential content for off-screen pages
  const isOffScreen = Math.abs(index - currentPage) > 1;
  
  if (isOffScreen) {
    return <PlaceholderPage index={index} />;
  }
  
  return <FullContentPage index={index} />;
}, [currentPage]);
```

## Examples

### Image Gallery

```typescript
const imageGalleryBuilder = (index: number) => {
  const image = images[index];
  
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: image.url }} style={styles.image} />
      <Text style={styles.caption}>{image.caption}</Text>
    </View>
  );
};

<PageView
  pageBuilder={imageGalleryBuilder}
  pageCount={images.length}
  orientation="horizontal"
/>
```

### Onboarding Flow

```typescript
const onboardingBuilder = (index: number) => {
  const step = onboardingSteps[index];
  
  return (
    <View style={styles.onboardingPage}>
      <Image source={step.image} style={styles.stepImage} />
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.description}>{step.description}</Text>
      {index === onboardingSteps.length - 1 && (
        <Button title="Get Started" onPress={handleComplete} />
      )}
    </View>
  );
};

<PageView
  pageBuilder={onboardingBuilder}
  pageCount={onboardingSteps.length}
  initialPage={0}
/>
```

### Data Table with Pagination

```typescript
const tablePageBuilder = (index: number) => {
  const startIndex = index * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = data.slice(startIndex, endIndex);
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text style={styles.pageHeader}>
        Page {index + 1} of {Math.ceil(data.length / itemsPerPage)}
      </Text>
      {pageItems.map((item, itemIndex) => (
        <View key={itemIndex} style={styles.tableRow}>
          <Text>{item.name}</Text>
          <Text>{item.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

<PageView
  pageBuilder={tablePageBuilder}
  pageCount={Math.ceil(data.length / itemsPerPage)}
/>
```

## Migration from Children

### Before (Static Children)

```typescript
<PageView>
  <View><Text>Page 1</Text></View>
  <View><Text>Page 2</Text></View>
  <View><Text>Page 3</Text></View>
</PageView>
```

### After (PageBuilder)

```typescript
const pageBuilder = (index: number) => (
  <View><Text>Page {index + 1}</Text></View>
);

<PageView
  pageBuilder={pageBuilder}
  pageCount={3}
/>
```

## Controller Integration

The pageBuilder works seamlessly with the UIPageViewController:

```typescript
const controller = new UIPageViewController();

// Set up callbacks
controller.setPageCallbacks({
  onPageSelected: (event) => {
    console.log('Page selected:', event.nativeEvent.position);
  },
});

// Use with pageBuilder
<PageView
  ref={pageViewRef}
  controller={controller}
  pageBuilder={pageBuilder}
  pageCount={10}
/>
```

This provides a powerful and flexible way to create dynamic, paginated content in your React Native applications!
