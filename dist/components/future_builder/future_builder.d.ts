import { ReactNode } from "react";
export declare enum FutureBuilderState {
    PENDING = 0,
    FULFILLED = 1,
    REJECTED = 2
}
export interface FutureBuilderProps<T> {
    future: Promise<T>;
    builder: ({ data, state, error, }: {
        data?: T;
        state: FutureBuilderState;
        error?: Error;
    }) => ReactNode;
}
export declare function FutureBuilder<T>({ future, builder }: FutureBuilderProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=future_builder.d.ts.map