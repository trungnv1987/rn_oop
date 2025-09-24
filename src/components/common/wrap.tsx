import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { addSeparators } from "../../utils/separator_util";

type WrapAlignment =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

type WrapCrossAlignment = "start" | "end" | "center" | "stretch";

type WrapDirection = "horizontal" | "vertical";

export interface WrapProps {
  children?: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  direction?: WrapDirection;
  alignment?: WrapAlignment;
  runAlignment?: WrapAlignment;
  crossAxisAlignment?: WrapCrossAlignment;
  spacing?: number;
  runSpacing?: number;
  separator?: ReactNode;
}

function mapAlignment(value?: WrapAlignment): ViewStyle["justifyContent"] {
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
      return "flex-start";
  }
}

function mapCrossAxisAlignment(
  value?: WrapCrossAlignment
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
      return "flex-start";
  }
}

function mapAlignContent(value?: WrapAlignment): ViewStyle["alignContent"] {
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
      return "flex-start";
  }
}

let GS: any = null;
try {
  // @ts-ignore - optional dependency
  GS = require("@gluestack-ui/themed");
} catch (e) {
  GS = null;
}

export function Wrap({
  children,
  style,
  direction = "horizontal",
  alignment = "start",
  runAlignment = "start",
  crossAxisAlignment = "start",
  spacing = 0,
  runSpacing = 0,
  separator,
}: WrapProps) {
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: direction === "horizontal" ? "row" : "column",
      flexWrap: "wrap",
      justifyContent: mapAlignment(alignment),
      alignItems: mapCrossAxisAlignment(crossAxisAlignment),
      alignContent: mapAlignContent(runAlignment),
      gap: spacing,
      rowGap: runSpacing,
      columnGap: spacing,
    }),
    [
      direction,
      alignment,
      crossAxisAlignment,
      runAlignment,
      spacing,
      runSpacing,
    ]
  );

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

  // If spacing is provided and no gap support, we need to wrap children with margin
  const wrappedChildren = React.useMemo(() => {
    if (spacing === 0 && runSpacing === 0) {
      return renderChildren();
    }

    const childrenToRender = renderChildren();
    if (!childrenToRender) return null;

    const childrenArray = Array.isArray(childrenToRender)
      ? childrenToRender
      : [childrenToRender];

    return childrenArray.map((child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      // Apply spacing as margin to each child for better cross-platform compatibility
      const marginStyle: ViewStyle = {};

      if (direction === "horizontal") {
        if (index > 0) marginStyle.marginLeft = spacing;
        marginStyle.marginBottom = runSpacing;
      } else {
        if (index > 0) marginStyle.marginTop = spacing;
        marginStyle.marginRight = runSpacing;
      }

      return (
        <View key={index} style={marginStyle}>
          {child}
        </View>
      );
    });
  }, [children, spacing, runSpacing, direction, separator]);

  if (GS?.Wrap) {
    const { Wrap: GSWrap } = GS;
    return (
      <GSWrap
        style={style as any}
        // Gluestack Wrap supports direction and space props
        direction={direction === "horizontal" ? "row" : "column"}
        justifyContent={mapAlignment(alignment)}
        alignItems={mapCrossAxisAlignment(crossAxisAlignment)}
        alignContent={mapAlignContent(runAlignment)}
        space={spacing}
        rowGap={runSpacing}
        columnGap={spacing}
      >
        {spacing === 0 && runSpacing === 0 ? renderChildren() : wrappedChildren}
      </GSWrap>
    );
  }

  return (
    <View style={StyleSheet.compose(containerStyle, style)}>
      {spacing === 0 && runSpacing === 0 ? renderChildren() : wrappedChildren}
    </View>
  );
}
