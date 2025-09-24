import React, { ReactNode, useMemo } from "react";
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

export interface RowProps {
  children?: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  wrap?: boolean;
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
    // 'baseline' is not supported on all platforms; leaving undefined falls back gracefully
    default:
      return undefined;
  }
}

// Attempt to load gluestack primitives if present
let GS: any = null;
try {
  // @ts-ignore - optional dependency
  GS = require("@gluestack-ui/themed");
} catch (e) {
  GS = null;
}

const RowComponent = ({
  children,
  style,
  mainAxisAlignment,
  crossAxisAlignment,
  wrap,
  gap,
  separator,
}: RowProps) => {
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "row",
      justifyContent: mapMainAxisAlignment(mainAxisAlignment),
      alignItems: mapCrossAxisAlignment(crossAxisAlignment),
      flexWrap: wrap ? "wrap" : "nowrap",
      gap,
    }),
    [mainAxisAlignment, crossAxisAlignment, wrap, gap]
  );

  const childrenWithSeparators = useMemo(() => {
    if (!separator || !children) {
      return children;
    }

    const childrenArray = Array.isArray(children) ? children : [children];
    if (childrenArray.length <= 1) {
      return children;
    }
    return addSeparators(childrenArray, separator);
  }, [children, separator]);

  if (GS?.HStack) {
    // Gluestack HStack supports space and flexWrap via props
    const { HStack } = GS;
    return (
      <HStack
        style={style as any}
        justifyContent={mapMainAxisAlignment(mainAxisAlignment)}
        alignItems={mapCrossAxisAlignment(crossAxisAlignment)}
        space={gap}
        flexWrap={wrap ? "wrap" : "nowrap"}
      >
        {childrenWithSeparators}
      </HStack>
    );
  }

  return (
    <View style={StyleSheet.compose(containerStyle, style)}>
      {childrenWithSeparators}
    </View>
  );
};

RowComponent.displayName = "Row";

export const Row = React.memo(RowComponent);
