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

// Attempt optional gluestack import
let GS: any = null;
try {
  // @ts-ignore - optional dependency
  GS = require("@gluestack-ui/themed");
} catch (e) {
  GS = null;
}

const ColumnComponent = ({
  children,
  style,
  mainAxisAlignment,
  crossAxisAlignment,
  gap,
  separator,
}: ColumnProps) => {
  const containerStyle: ViewStyle = useMemo(
    () => ({
      flexDirection: "column",
      justifyContent: mapMainAxisAlignment(mainAxisAlignment),
      alignItems: mapCrossAxisAlignment(crossAxisAlignment),
      gap,
    }),
    [mainAxisAlignment, crossAxisAlignment, gap]
  );

  const renderChildren = () => {
    if (!separator || !children) {
      return children;
    }
    const childrenArray = Array.isArray(children) ? children : [children];
    if (childrenArray.length <= 1) {
      return children;
    }
    return addSeparators(childrenArray, separator);
  };

  if (GS?.VStack) {
    const { VStack } = GS;
    return (
      <VStack
        style={style as any}
        justifyContent={mapMainAxisAlignment(mainAxisAlignment)}
        alignItems={mapCrossAxisAlignment(crossAxisAlignment)}
        space={gap}
      >
        {renderChildren()}
      </VStack>
    );
  }

  return (
    <View style={StyleSheet.compose(containerStyle, style)}>
      {renderChildren()}
    </View>
  );
};

ColumnComponent.displayName = "Column";
export const Column = React.memo(ColumnComponent);
