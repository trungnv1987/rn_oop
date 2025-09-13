import { Context, ReactNode } from "react";
import { MobileViewModel } from "./mobile_view_model";
export interface MobileScreenProps<VM extends MobileViewModel> {
    viewModel: VM;
    viewModelContext: Context<VM | undefined>;
    children: ReactNode;
}
export declare function MobileScreen<VM extends MobileViewModel>({ viewModel, viewModelContext, children, }: MobileScreenProps<VM>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=mobile_screen.d.ts.map