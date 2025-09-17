import { ReactNode } from "react";
export declare enum FutureBuilderState {
    PENDING = 0,
    FULFILLED = 1,
    REJECTED = 2
}
export interface FutureBuilderProps<T> {
    future: Promise<T>;
    builder: (state: _FutureBuilderState<T>) => ReactNode;
}
interface _FutureBuilderState<T> {
    state: FutureBuilderState;
    data?: T;
    error?: Error;
}
export declare function FutureBuilder<T>({ future, builder }: FutureBuilderProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=future_builder.d.ts.map