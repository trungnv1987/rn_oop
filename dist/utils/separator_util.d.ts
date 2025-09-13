import React from 'react';
/**
 * Adds separators between ReactNode elements in an array
 * @param items Array of ReactNode elements
 * @param separator ReactNode to insert between items
 * @returns Array with separators inserted between items
 */
export declare function addSeparators<T extends React.ReactNode>(items: T[], separator: React.ReactNode): React.ReactNode[];
/**
 * Adds vertical spacing between ReactNode elements in an array (React Native)
 * @param items Array of ReactNode elements
 * @param spacing Size of spacing in pixels
 * @returns Array with spacing views inserted between items
 */
export declare function addVerticalSpacing(items: React.ReactNode[], spacing: number): React.ReactNode[];
/**
 * Adds horizontal spacing between ReactNode elements in an array (React Native)
 * @param items Array of ReactNode elements
 * @param spacing Size of spacing in pixels
 * @returns Array with spacing views inserted between items
 */
export declare function addHorizontalSpacing(items: React.ReactNode[], spacing: number): React.ReactNode[];
//# sourceMappingURL=separator_util.d.ts.map