import { fonts } from "../../styles/_fonts";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { Lang } from "react_oop";

interface NotFoundLabelProps {
  text?: string;
  style?: any;
}

export function NotFoundLabel({ text, style }: NotFoundLabelProps) {
  const _text = text ?? Lang.localize("common.noResultsFound");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...(style ?? {}),
      }}
    >
      <Text style={{ fontSize: fonts.large.fontSize, color: "#666" }}>
        {_text}
      </Text>
    </View>
  );
}
