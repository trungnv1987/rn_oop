import React from 'react';
import { View } from 'react-native';

/**
 * Adds separators between ReactNode elements in an array
 * @param items Array of ReactNode elements
 * @param separator ReactNode to insert between items
 * @returns Array with separators inserted between items
 */
export function addSeparators<T extends React.ReactNode>(
  items: T[],
  separator: React.ReactNode,
): React.ReactNode[] {
  console.log('addSeparators - items length:', items?.length);
  console.log('addSeparators - separator:', separator);
  console.log(
    'addSeparators - separator isValidElement:',
    React.isValidElement(separator),
  );

  if (!items || items.length <= 1) {
    console.log('addSeparators - returning original items (length <= 1)');
    return items;
  }

  const result: React.ReactNode[] = [];

  items.forEach((item, index) => {
    // Add the item
    result.push(item);

    // Add separator between items (not after the last item)
    if (index < items.length - 1) {
      console.log(`addSeparators - adding separator at index ${index}`);
      // Check if separator is a React element that can be cloned
      if (React.isValidElement(separator)) {
        const clonedSeparator = React.cloneElement(separator, {
          key: `separator-${index}`,
        });
        console.log('addSeparators - cloned separator:', clonedSeparator);
        result.push(clonedSeparator);
      } else {
        // If separator is not a React element, just add it as is
        result.push(separator);
      }
    }
  });

  console.log('addSeparators - final result length:', result.length);
  return result;
}

/**
 * Adds vertical spacing between ReactNode elements in an array (React Native)
 * @param items Array of ReactNode elements
 * @param spacing Size of spacing in pixels
 * @returns Array with spacing views inserted between items
 */
export function addVerticalSpacing(
  items: React.ReactNode[],
  spacing: number,
): React.ReactNode[] {
  if (!items || items.length <= 1) {
    return items;
  }

  const result: React.ReactNode[] = [];

  items.forEach((item, index) => {
    // Add the item
    result.push(item);

    // Add spacing between items (not after the last item)
    if (index < items.length - 1) {
      result.push(
        <React.Fragment key={`vertical-spacing-${index}`}>
          <View style={{ height: spacing }} />
        </React.Fragment>,
      );
    }
  });

  return result;
}

/**
 * Adds horizontal spacing between ReactNode elements in an array (React Native)
 * @param items Array of ReactNode elements
 * @param spacing Size of spacing in pixels
 * @returns Array with spacing views inserted between items
 */
export function addHorizontalSpacing(
  items: React.ReactNode[],
  spacing: number,
): React.ReactNode[] {
  if (!items || items.length <= 1) {
    return items;
  }

  const result: React.ReactNode[] = [];

  items.forEach((item, index) => {
    // Add the item
    result.push(item);

    // Add spacing between items (not after the last item)
    if (index < items.length - 1) {
      result.push(
        <React.Fragment key={`horizontal-spacing-${index}`}>
          <View style={{ width: spacing }} />
        </React.Fragment>,
      );
    }
  });

  return result;
}
