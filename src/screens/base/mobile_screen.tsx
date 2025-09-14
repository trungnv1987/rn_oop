import React, { Context, ReactNode } from "react";
import { AppScreen } from "react_oop";
import { UIAvoidKeyboard, UILoading } from "../../components";
import { MobileViewModel } from "./mobile_view_model";

export interface MobileScreenProps<VM extends MobileViewModel> {
  viewModel: VM;
  viewModelContext: Context<VM | undefined>;
  children: ReactNode;
}

export function MobileScreen<VM extends MobileViewModel>({
  viewModel,
  viewModelContext,
  children,
}: MobileScreenProps<VM>) {
  return (
    <AppScreen<VM> viewModel={viewModel} viewModelContext={viewModelContext}>
      <UIAvoidKeyboard>
        <UILoading cubit={viewModel.loadingCubit}>{children}</UILoading>
      </UIAvoidKeyboard>
    </AppScreen>
  );
}
