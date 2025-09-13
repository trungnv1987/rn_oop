export interface ThemeColors {
    background: string;
    surface: string;
    surfaceVariant: string;
    primary: string;
    secondary: string;
    onBackground: string;
    onSurface: string;
    onSurfaceVariant: string;
    accent: string;
    accentVariant: string;
    success: string;
    warning: string;
    error: string;
    border: string;
    borderVariant: string;
    tabBarBackground: string;
    tabBarBorder: string;
    tabBarActive: string;
    tabBarInactive: string;
}
declare const spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
declare const borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
export interface Theme {
    colors: ThemeColors;
    spacing: typeof spacing;
    borderRadius: typeof borderRadius;
    shadows: {
        small: object;
        medium: object;
        large: object;
    };
}
export declare const lightTheme: Theme;
export declare const defaultTheme: Theme;
export declare const darkTheme: Theme;
export {};
//# sourceMappingURL=theme.d.ts.map