import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Check } from "lucide-react-native";
import { GenericCallback } from "react_oop";
import { fonts, fontWeights } from "../../styles/_fonts";
import { defaultTheme } from "../../theme/theme";
import { Expanded, HorizontalSpacing, Row } from "../components";
import { spacing } from "../../styles/styles";

interface UICheckBoxProps {
  selected?: boolean;
  onChanged?: GenericCallback<boolean>;
  label?: string;
  labelStyle?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export function UICheckBox({
  selected = false,
  onChanged,
  label,
  labelStyle,
  style,
  disabled = false,
  size = "medium",
}: UICheckBoxProps) {
  const handlePress = () => {
    if (!disabled && onChanged) {
      onChanged(!selected);
    }
  };

  const checkboxSize = size === "small" ? 16 : size === "large" ? 24 : 20;
  const iconSize = size === "small" ? 12 : size === "large" ? 18 : 14;
  const icon = selected ? (
    <Check size={iconSize} color={styles.selected.borderColor} />
  ) : null;
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.container, style]}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Row
        crossAxisAlignment="center"
        separator={<HorizontalSpacing size={spacing.sm} />}
      >
        <View
          style={[
            styles.checkbox,
            styles[size],
            selected && styles.selected,
            disabled && styles.disabled,
          ]}
        >
          {icon}
        </View>

        {label && (
          <Expanded>
            <Text
              style={[
                styles.label,
                styles[`${size}Label`],
                disabled && styles.disabledLabel,
                labelStyle,
              ]}
            >
              {label}
            </Text>
          </Expanded>
        )}
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    borderWidth: 2,
    borderColor: defaultTheme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: defaultTheme.borderRadius.sm,
  },

  // Size variants
  small: {
    width: 16,
    height: 16,
  },
  medium: {
    width: 20,
    height: 20,
  },
  large: {
    width: 24,
    height: 24,
  },

  // Selected state
  selected: {
    borderColor: defaultTheme.colors.accent,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
    borderColor: defaultTheme.colors.borderVariant,
  },

  // Label styles
  label: {
    color: defaultTheme.colors.onSurface,
    ...fonts.default,
    ...fontWeights.regular,
  },

  smallLabel: {
    ...fonts.small,
  },
  mediumLabel: {
    ...fonts.default,
  },
  largeLabel: {
    ...fonts.large,
  },

  disabledLabel: {
    color: defaultTheme.colors.onSurfaceVariant,
    opacity: 0.6,
  },
});
