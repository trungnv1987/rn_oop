import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

export interface ExpandedProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: number; // Similar to Flutter's Expanded(flex: n)
}

export function Expanded({ children, style, flex = 1 }: ExpandedProps) {
  const expandedStyle: ViewStyle = {
    // In RN, numeric `flex` maps to flexGrow, flexShrink: 1, flexBasis: 0
    flex,
  };

  return (
    <View style={StyleSheet.compose(expandedStyle, style)}>{children}</View>
  );
}
