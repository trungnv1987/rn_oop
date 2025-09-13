import { BaseViewModel, BaseViewModelProps, LangType } from "react_oop";

export interface AppViewModelProps extends BaseViewModelProps {
}
export abstract class AppViewModel<
  P extends AppViewModelProps
> extends BaseViewModel<P> {
  constructor(props?: P) {
    super(props);
  }
  
}
