import React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface AvoidKeyboardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function UIAvoidKeyboard({ children, style }: AvoidKeyboardProps) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[{ flex: 1 }, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
