import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface SafeAreaProps {
  children?: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  edges?: ("top" | "bottom" | "left" | "right")[];
  backgroundColor?: string;
}

export function SafeArea({
  children,
  style,
  edges = ["top", "bottom", "left", "right"],
  backgroundColor,
}: SafeAreaProps) {
  const containerStyle: ViewStyle = {
    backgroundColor,
  };

  return (
    <SafeAreaView
      style={StyleSheet.compose(containerStyle, style)}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
}
