import { defaultTheme } from "../../theme/theme";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { VoidCallback } from "react_oop";
import React from "react";

export interface UIIconButtonProps {
  onPress: VoidCallback;
  style?: ViewStyle;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children: React.ReactNode;
}

export function UIIconButton({
  onPress,
  style,
  variant = "ghost",
  size = "medium",
  disabled = false,
  children,
}: UIIconButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children}
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
    padding: defaultTheme.spacing.sm,
    minHeight: 36,
    minWidth: 36,
  },
  medium: {
    padding: defaultTheme.spacing.md,
    minHeight: 44,
    minWidth: 44,
  },
  large: {
    padding: defaultTheme.spacing.lg,
    minHeight: 52,
    minWidth: 52,
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

  // States
  disabled: {
    opacity: 0.5,
  },
});
