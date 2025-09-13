import { fonts, fontWeights } from "../../styles/_fonts";
import { defaultTheme } from "../../theme/theme";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { VoidCallback } from "react_oop";

export interface UIButtonProps {
  title: string;
  onPress: VoidCallback;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function UIButton({
  title,
  onPress,
  style,
  textStyle,
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
}: UIButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[size],
    styles[variant],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyleComposed = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyleComposed}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: defaultTheme.borderRadius.md,
    flexDirection: "row",
  },

  // Size variants
  small: {
    paddingVertical: defaultTheme.spacing.sm,
    paddingHorizontal: defaultTheme.spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: defaultTheme.spacing.md,
    paddingHorizontal: defaultTheme.spacing.lg,
    minHeight: 44,
  },
  large: {
    paddingVertical: defaultTheme.spacing.lg,
    paddingHorizontal: defaultTheme.spacing.xl,
    minHeight: 52,
  },

  // Variant styles
  primary: {
    backgroundColor: defaultTheme.colors.accent,
    ...defaultTheme.shadows.small,
  },
  secondary: {
    backgroundColor: defaultTheme.colors.surfaceVariant,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  ghost: {
    backgroundColor: "transparent",
  },

  // Text styles
  text: {
    fontSize: fonts.default.fontSize,
    fontWeight: fontWeights.medium.fontWeight,
    textAlign: "center",
  },
  smallText: {
    fontSize: fonts.small.fontSize,
  },
  mediumText: {
    fontSize: fonts.default.fontSize,
  },
  largeText: {
    fontSize: fonts.large.fontSize,
  },

  // Variant text colors
  primaryText: {
    color: defaultTheme.colors.background,
  },
  secondaryText: {
    color: defaultTheme.colors.onSurface,
  },
  outlineText: {
    color: defaultTheme.colors.onSurface,
  },
  ghostText: {
    color: defaultTheme.colors.accent,
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },

  // Layout
  fullWidth: {
    width: "100%",
  },
});
