import React from "react";
import { View, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";

export interface ExpandedProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: number; // Similar to Flutter's Expanded(flex: n)
}

// Optional gluestack import
let GS: any = null;
try {
  // @ts-ignore
  GS = require("@gluestack-ui/themed");
} catch (e) {
  GS = null;
}

export function Expanded({ children, style, flex = 1 }: ExpandedProps) {
  if (GS?.Box) {
    const { Box } = GS;
    return (
      <Box style={style as any} flex={flex}>
        {children}
      </Box>
    );
  }

  const expandedStyle: ViewStyle = {
    flex,
  };

  return (
    <View style={StyleSheet.compose(expandedStyle, style)}>{children}</View>
  );
}
