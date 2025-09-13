import { defaultTheme } from "../theme/theme";
import { StyleSheet } from "react-native";

export const fonts = StyleSheet.create({
  small: {
    fontSize: 12,
  },
  default: {
    fontSize: 14,
  },
  large: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
  },
  button: {
    fontSize: 16,
  },
  appbarTitle: {
    fontSize: 24,
  },
});

export const fontWeights = StyleSheet.create({
  light: {
    fontWeight: "300",
  },
  regular: {
    fontWeight: "400",
  },
  medium: {
    fontWeight: "500",
  },
  semibold: {
    fontWeight: "600",
  },
  bold: {
    fontWeight: "700",
  },
});

export const card = StyleSheet.create({
  title: {
    ...fonts.large,
    ...fontWeights.bold,
    color: defaultTheme.colors.onSurface,
  },
  subtitle: {
    ...fonts.default,
    ...fontWeights.regular,
    color: defaultTheme.colors.onSurfaceVariant,
  },
});
