import { GenericCallback, GenericCubit } from "react_oop";
import { create } from 'zustand';

interface _UIDialogControllerState {
    props?: UIDialogDisplayProps;
    setProps: (props: UIDialogDisplayProps) => void;
}


export const _uiDialogControllerStore = create<_UIDialogControllerState>(set => ({
    props: undefined,
    setProps: (props: UIDialogDisplayProps) => set({ props }),
  }));
  

export interface UIDialogDisplayProps {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    
    dismissible?: boolean;
    isDelete?: boolean;
    input?: string;
}

interface _UIDialogController{
    dispose(): void;
    show(props: UIDialogDisplayProps): void;
    hide(): void;
    get isVisible(): boolean;
}
export class UIDialogController implements _UIDialogController {

    onFinished?: GenericCallback<any>;
    show(props: UIDialogDisplayProps): void {
        this.cubit.update(props);
    }
    hide(): void {
        this.cubit.update(undefined);
    }
    
    get isVisible(): boolean {
        return this.cubit.value != undefined;
    }
  
    cubit = new GenericCubit<UIDialogDisplayProps>();

    dispose(): void {
        this.cubit.dispose();
    }    

}