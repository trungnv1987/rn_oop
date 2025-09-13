import { StyleSheet } from 'react-native';
import { defaultTheme } from '../theme/theme';
import { fonts, fontWeights } from './_fonts';

export const tabBarStyles = StyleSheet.create({
  container: {
    backgroundColor: defaultTheme.colors.tabBarBackground,
    borderBottomWidth: 0.5,
    borderBottomColor: defaultTheme.colors.tabBarBorder,
    paddingTop: 44, // Status bar height
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
    paddingHorizontal: defaultTheme.spacing.sm,
  },
  title: {
    fontSize: fonts.title.fontSize,
    fontWeight: '600',
    color: defaultTheme.colors.onSurface,
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
    fontSize: fonts.large.fontSize,
    color: defaultTheme.colors.accent,
    fontWeight: fontWeights.regular.fontWeight,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: -4,
  },
  backButtonText: {
    fontSize: fonts.default.fontSize,
    color: defaultTheme.colors.accent,
    marginLeft: 4,
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: fontWeights.bold.fontWeight,
    color: defaultTheme.colors.onSurface,
    paddingHorizontal: defaultTheme.spacing.md,
    paddingTop: defaultTheme.spacing.sm,
    paddingBottom: defaultTheme.spacing.xs,
  },
});
