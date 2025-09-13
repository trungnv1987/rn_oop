# RN OOP - React Native Component Library

A React Native component library built with object-oriented programming principles, providing a comprehensive set of reusable UI components and utilities.

## Installation

```bash
npm install @your-username/rn-oop
# or
yarn add @your-username/rn-oop
```

## Features

- 🎨 Modern UI Components
- 📱 React Native optimized
- 🔧 TypeScript support
- 🎯 Object-oriented design
- 🌐 Internationalization support
- 🎭 Theme support
- 📦 Tree-shakeable

## Components

### UI Components
- **Button** - Customizable button components
- **Input** - Form input components
- **Loading** - Loading indicators
- **Navigation Bar** - Navigation components
- **Check Box** - Checkbox components
- **Separator** - Visual separators

### Layout Components
- **Column** - Vertical layout component
- **Row** - Horizontal layout component
- **Expanded** - Flexible layout component

### Advanced Components
- **Avoid Keyboard** - Keyboard-aware components
- **Load More** - Infinite scroll components
- **Cubit** - State management components

## Usage

```tsx
import React from 'react';
import { Button, Input, Column, Loading } from '@your-username/rn-oop';

const MyComponent = () => {
  return (
    <Column>
      <Input placeholder="Enter your name" />
      <Button onPress={() => console.log('Pressed!')}>
        Submit
      </Button>
      <Loading visible={true} />
    </Column>
  );
};
```

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run build:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]
