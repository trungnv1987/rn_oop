import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { addSeparators } from "../../utils/separator_util";

type MainAxisAlignment =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type CrossAxisAlignment = "start" | "end" | "center" | "stretch" | "baseline";

export interface ColumnProps {
  children?: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  gap?: number;
  separator?: ReactNode;
}

function mapMainAxisAlignment(
  value?: MainAxisAlignment
): ViewStyle["justifyContent"] {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "space-between":
      return "space-between";
    case "space-around":
      return "space-around";
    case "space-evenly":
      return "space-evenly";
    default:
      return undefined;
  }
}

function mapCrossAxisAlignment(
  value?: CrossAxisAlignment
): ViewStyle["alignItems"] {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "stretch":
      return "stretch";
    default:
      return undefined;
  }
}

export function Column({
  children,
  style,
  mainAxisAlignment,
  crossAxisAlignment,
  gap,
  separator,
}: ColumnProps) {
  const containerStyle: ViewStyle = {
    flexDirection: "column",
    justifyContent: mapMainAxisAlignment(mainAxisAlignment),
    alignItems: mapCrossAxisAlignment(crossAxisAlignment),
    gap,
  };

  const renderChildren = () => {
    if (!separator || !children) {
      return children;
    }

    // Convert children to array if it's not already an array
    const childrenArray = Array.isArray(children) ? children : [children];

    if (childrenArray.length <= 1) {
      return children;
    }

    // Use the utility function to add separators
    return addSeparators(childrenArray, separator);
  };

  return (
    <View style={StyleSheet.compose(containerStyle, style)}>
      {renderChildren()}
    </View>
  );
}
