import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { defaultTheme } from "../../theme/theme";
import { GenericCubit, UICubit } from "react_oop";

interface UILoadingProps {
  children: React.ReactNode;
  cubit: GenericCubit<boolean>;
  visible?: boolean;
  loadingText?: string;
  style?: ViewStyle;
  overlayStyle?: ViewStyle;
  indicatorColor?: string;
  textColor?: string;
  backgroundColor?: string;
}

export function UILoading({
  children,
  cubit,
  loadingText = "Loading...",
  style,
  overlayStyle,
  indicatorColor,
  textColor,
  backgroundColor,
}: UILoadingProps) {
  const defaultIndicatorColor = indicatorColor || defaultTheme.colors.accent;
  const defaultTextColor = textColor || defaultTheme.colors.onSurface;
  const defaultBackgroundColor = backgroundColor || defaultTheme.colors.surface;
  const [visible, setVisible] = useState(cubit.value);
  const callback = (value: boolean | undefined) => {
    setVisible(value);
  };
  useEffect(() => {
    cubit.addCallback(callback);
    return () => {
      cubit.removeCallback(callback);
    };
  }, [cubit]);
  return (
    <UICubit cubit={cubit}>
      {(value) => {
        return (
          <View style={[{ flex: 1 }, style]}>
            {children}
            {visible && (
              <View
                style={[
                  styles.overlay,
                  { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                  overlayStyle,
                ]}
              >
                <View style={styles.loadingContainer}>
                  <ActivityIndicator
                    size="large"
                    color={defaultIndicatorColor}
                    style={styles.indicator}
                  />
                  {loadingText && (
                    <Text
                      style={[styles.loadingText, { color: defaultTextColor }]}
                    >
                      {loadingText}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
        );
      }}
    </UICubit>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    minWidth: 120,
    minHeight: 120,
  },
  indicator: {
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
