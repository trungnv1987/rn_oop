import { Context, ReactNode } from "react";
import { AppScreen } from "react_oop";
import { MobileViewModel } from "./mobile_view_model";
import { UIDialog } from "../../components/dialog/ui_dialog";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { sizes } from "../../styles";

export interface MobileScreenProps<VM extends MobileViewModel> {
  viewModel: VM;
  viewModelContext: Context<VM | undefined>;
  children: ReactNode;
  avoidKeyboard?: boolean;
  keyboardVerticalOffset?: number;
}

export function MobileScreen<VM extends MobileViewModel>({
  viewModel,
  viewModelContext,
  children,
}: MobileScreenProps<VM>) {
  const screen = (
    <AppScreen<VM> viewModel={viewModel} viewModelContext={viewModelContext}>
      <View style={{ flex: 1, padding: sizes.md }}>{children}</View>
      {/* <UIAvoidKeyboard>
        <UILoading cubit={viewModel.loadingCubit}>{children}</UILoading>
      </UIAvoidKeyboard> */}
      <UIDialog controller={viewModel.dialogController} />
    </AppScreen>
  );
  return screen;
}

export function KeyboardAvoidingScreen<VM extends MobileViewModel>(
  props: MobileScreenProps<VM>
) {
  const behavior = Platform.OS === "ios" ? "padding" : "height";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={behavior}
      keyboardVerticalOffset={props.keyboardVerticalOffset}
    >
      <MobileScreen
        viewModel={props.viewModel}
        viewModelContext={props.viewModelContext}
        avoidKeyboard={false}
      >
        {props.children}
      </MobileScreen>
    </KeyboardAvoidingView>
  );
}
