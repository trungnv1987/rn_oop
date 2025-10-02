import { GenericCallback, GenericCubit } from "react_oop";
interface _UIDialogControllerState {
    props?: UIDialogDisplayProps;
    setProps: (props: UIDialogDisplayProps) => void;
}
export declare const _uiDialogControllerStore: import("zustand").UseBoundStore<import("zustand").StoreApi<_UIDialogControllerState>>;
export interface UIDialogDisplayProps {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    dismissible?: boolean;
    isDelete?: boolean;
    input?: string;
}
interface _UIDialogController {
    dispose(): void;
    show(props: UIDialogDisplayProps): void;
    hide(): void;
    get isVisible(): boolean;
}
export declare class UIDialogController implements _UIDialogController {
    onFinished?: GenericCallback<any>;
    show(props: UIDialogDisplayProps): void;
    hide(): void;
    get isVisible(): boolean;
    cubit: GenericCubit<UIDialogDisplayProps>;
    dispose(): void;
}
export {};
//# sourceMappingURL=ui_dialog_controller.d.ts.map