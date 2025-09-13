"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabBarStyles = void 0;
const react_native_1 = require("react-native");
const theme_1 = require("../theme/theme");
const _fonts_1 = require("./_fonts");
exports.tabBarStyles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: theme_1.defaultTheme.colors.tabBarBackground,
        borderBottomWidth: 0.5,
        borderBottomColor: theme_1.defaultTheme.colors.tabBarBorder,
        paddingTop: 44,
        paddingBottom: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    header: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme_1.defaultTheme.spacing.sm,
    },
    title: {
        fontSize: _fonts_1.fonts.title.fontSize,
        fontWeight: '600',
        color: theme_1.defaultTheme.colors.onSurface,
        textAlign: 'center',
    },
    leftButton: {
        position: 'absolute',
        left: 0,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
    },
    rightButton: {
        position: 'absolute',
        right: 0,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
    },
    buttonText: {
        fontSize: _fonts_1.fonts.large.fontSize,
        color: theme_1.defaultTheme.colors.accent,
        fontWeight: _fonts_1.fontWeights.regular.fontWeight,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: -4,
    },
    backButtonText: {
        fontSize: _fonts_1.fonts.default.fontSize,
        color: theme_1.defaultTheme.colors.accent,
        marginLeft: 4,
    },
    largeTitle: {
        fontSize: 34,
        fontWeight: _fonts_1.fontWeights.bold.fontWeight,
        color: theme_1.defaultTheme.colors.onSurface,
        paddingHorizontal: theme_1.defaultTheme.spacing.md,
        paddingTop: theme_1.defaultTheme.spacing.sm,
        paddingBottom: theme_1.defaultTheme.spacing.xs,
    },
});
