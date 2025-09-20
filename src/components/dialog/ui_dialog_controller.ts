import { GenericCallback, GenericCubit } from "react_oop";


export interface UIDialogDisplayProps {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    
    dismissible?: boolean;
    isDelete?: boolean;
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