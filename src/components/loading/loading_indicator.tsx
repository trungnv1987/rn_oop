import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface LoadingIndicatorProps extends ActivityIndicatorProps {}

export function LoadingIndicator({ style, ...props }: LoadingIndicatorProps) {
  return <ActivityIndicator style={style} {...props} />;
}
