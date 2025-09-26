"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkTheme = exports.defaultTheme = exports.lightTheme = void 0;
const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
};
const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
};
exports.lightTheme = {
    colors: {
        // Background colors
        background: "#FFFFFF",
        surface: "#f6f8fa",
        surfaceVariant: "#F1F3F4",
        // Text colors
        primary: "#1976D2",
        secondary: "#5F6368",
        onBackground: "#202124",
        onSurface: "#202124",
        onSurfaceVariant: "#5F6368",
        // Accent colors
        accent: "#007AFF",
        accentVariant: "#0056CC",
        // Status colors
        success: "#34A853",
        warning: "#FBBC04",
        error: "#EA4335",
        // Border colors
        border: "#DADCE0",
        borderVariant: "#E8EAED",
        // Tab bar colors
        tabBarBackground: "#FFFFFF",
        tabBarBorder: "#E8EAED",
        tabBarActive: "#007AFF",
        tabBarInactive: "#9AA0A6",
    },
    spacing: spacing,
    borderRadius: borderRadius,
    shadows: {
        small: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        },
        medium: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        large: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
        },
    },
};
exports.defaultTheme = exports.lightTheme;
exports.darkTheme = {
    colors: {
        // Background colors
        background: "#000000",
        surface: "#1a1a1a",
        surfaceVariant: "#2d2d2d",
        // Text colors
        primary: "#90CAF9",
        secondary: "#B0BEC5",
        onBackground: "#FFFFFF",
        onSurface: "#FFFFFF",
        onSurfaceVariant: "#B0BEC5",
        // Accent colors
        accent: "#007AFF",
        accentVariant: "#0056CC",
        // Status colors
        success: "#81C784",
        warning: "#FFD54F",
        error: "#E57373",
        // Border colors
        border: "#333333",
        borderVariant: "#424242",
        // Tab bar colors
        tabBarBackground: "#1a1a1a",
        tabBarBorder: "#333333",
        tabBarActive: "#007AFF",
        tabBarInactive: "#888888",
    },
    spacing: spacing,
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
    },
    shadows: {
        small: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 1,
        },
        medium: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 3,
        },
        large: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 6,
        },
    },
};
