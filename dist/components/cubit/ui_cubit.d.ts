/// <reference types="react" />
import { GenericCubit } from 'react_oop';
interface UICubitProps<T> {
    cubit: GenericCubit<T>;
    children: (value: T | undefined) => React.ReactNode;
}
export declare function UICubit<T>({ cubit, children }: UICubitProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ui_cubit.d.ts.map