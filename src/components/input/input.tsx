import { defaultTheme } from "../../theme/theme";
import { fonts, fontWeights } from "../../styles/_fonts";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface UIInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  errorStyle?: TextStyle;
  variant?: "default" | "outlined" | "filled";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export function UIInput({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle = styles.input,
  errorStyle,
  variant = "default",
  size = "medium",
  fullWidth = false,
  ...props
}: UIInputProps) {
  const inputContainerStyle = [
    styles.container,
    fullWidth && styles.fullWidth,
    containerStyle,
  ];

  const inputComposedStyle = [
    styles.input,
    styles[variant],
    styles[size],
    error && styles.inputError,
    inputStyle,
  ];

  const labelComposedStyle = [styles.label, styles[`${size}Label`], labelStyle];

  const errorComposedStyle = [styles.error, errorStyle];

  return (
    <View style={inputContainerStyle}>
      {label && <Text style={labelComposedStyle}>{label}</Text>}
      <TextInput
        style={inputComposedStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={defaultTheme.colors.onSurfaceVariant}
        {...props}
      />
      {error && <Text style={errorComposedStyle}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: defaultTheme.spacing.md,
  },

  fullWidth: {
    width: "100%",
  },

  label: {
    fontSize: fonts.default.fontSize,
    fontWeight: fontWeights.medium.fontWeight,
    color: defaultTheme.colors.onSurfaceVariant,
    marginBottom: defaultTheme.spacing.sm,
  },

  smallLabel: {
    fontSize: fonts.small.fontSize,
  },
  mediumLabel: {
    fontSize: fonts.default.fontSize,
  },
  largeLabel: {
    fontSize: fonts.large.fontSize,
  },

  input: {
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
    borderRadius: defaultTheme.borderRadius.md,
    paddingHorizontal: defaultTheme.spacing.md,
    fontSize: fonts.default.fontSize,
    backgroundColor: defaultTheme.colors.background,
    color: defaultTheme.colors.onSurface,
  },

  // Variant styles
  default: {
    borderColor: defaultTheme.colors.border,
  },
  outlined: {
    borderColor: defaultTheme.colors.border,
    backgroundColor: "transparent",
  },
  filled: {
    borderColor: "transparent",
    backgroundColor: defaultTheme.colors.surfaceVariant,
  },

  // Size variants
  small: {
    paddingVertical: defaultTheme.spacing.sm,
    minHeight: 36,
  },
  medium: {
    paddingVertical: defaultTheme.spacing.md,
    minHeight: 44,
  },
  large: {
    paddingVertical: defaultTheme.spacing.lg,
    minHeight: 52,
  },

  // States
  inputError: {
    borderColor: defaultTheme.colors.error,
  },

  error: {
    fontSize: fonts.small.fontSize,
    color: defaultTheme.colors.error,
    marginTop: defaultTheme.spacing.xs,
    marginLeft: defaultTheme.spacing.sm,
  },
});
