import React from "react";
import { View, StyleSheet } from "react-native";
import { defaultTheme } from "../../theme/theme";
import { sizes } from "../../styles/_sizes";

interface SeparatorProps {
  padding?: number;
  margin?: number;
  color?: string;
}

function _Spacing({
  isHorizontal,
  size = 10,
}: {
  isHorizontal?: boolean;
  size?: number;
}) {
  const _isHorizontal = isHorizontal == true;
  const height = _isHorizontal ? undefined : size;
  const width = _isHorizontal ? size : undefined;
  return (
    <View
      style={[
        {
          height: height,
          width: width,
        },
      ]}
    />
  );
}

export function HorizontalSpacing({ size = sizes.md }: { size?: number }) {
  return <_Spacing isHorizontal={true} size={size} />;
}

export function VerticalSpacing({ size = sizes.md }: { size?: number }) {
  return <_Spacing isHorizontal={false} size={size} />;
}

export function Separator({ padding, margin, color }: SeparatorProps) {
  return (
    <View
      style={[
        styles.separator,
        {
          marginVertical: margin,
          backgroundColor: color || defaultTheme.colors.borderVariant,
        },
      ]}
    >
      <View style={{ paddingVertical: padding }} />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: defaultTheme.colors.borderVariant,
  },
});
