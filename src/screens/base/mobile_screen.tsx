import { Context, ReactNode } from "react";
import { AppScreen } from "react_oop";
import { MobileViewModel } from "./mobile_view_model";
import { UIDialog } from "../../components/dialog/ui_dialog";
import { KeyboardAvoidingView, Platform } from "react-native";

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
  avoidKeyboard = true,
  keyboardVerticalOffset = 0,
}: MobileScreenProps<VM>) {
  const behavior = Platform.OS === "ios" ? "padding" : "height";

  const screen = (
    <AppScreen<VM> viewModel={viewModel} viewModelContext={viewModelContext}>
      {children}
      {/* <UIAvoidKeyboard>
        <UILoading cubit={viewModel.loadingCubit}>{children}</UILoading>
      </UIAvoidKeyboard> */}
      <UIDialog controller={viewModel.dialogController} />
    </AppScreen>
  );
  if (avoidKeyboard) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={behavior}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {screen}
      </KeyboardAvoidingView>
    );
  }
  return screen;
}
