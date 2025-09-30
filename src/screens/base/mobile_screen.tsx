import React, { Context, ReactNode } from "react";
import { AppScreen } from "react_oop";
import { UIAvoidKeyboard, UILoading } from "../../components";
import { MobileViewModel } from "./mobile_view_model";
import { UIDialog } from "../../components/dialog/ui_dialog";
import { KeyboardAvoidingView, Platform } from "react-native";

export interface MobileScreenProps<VM extends MobileViewModel> {
  viewModel: VM;
  viewModelContext: Context<VM | undefined>;
  children: ReactNode;
  avoidKeyboard?: boolean;
}

export function MobileScreen<VM extends MobileViewModel>({
  viewModel,
  viewModelContext,
  children,
  avoidKeyboard = true,
}: MobileScreenProps<VM>) {
  const behavior = Platform.OS === "ios" ? "padding" : "height";

  return (
    <AppScreen<VM> viewModel={viewModel} viewModelContext={viewModelContext}>
      {avoidKeyboard ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={behavior}
          // keyboardVerticalOffset={100}
        >
          {children}
        </KeyboardAvoidingView>
      ) : (
        children
      )}
      {/* <UIAvoidKeyboard>
        <UILoading cubit={viewModel.loadingCubit}>{children}</UILoading>
      </UIAvoidKeyboard> */}
      <UIDialog controller={viewModel.dialogController} />
    </AppScreen>
  );
}
