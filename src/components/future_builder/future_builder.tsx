import React, { ReactNode, useEffect, useState } from "react";

export enum FutureBuilderState {
  PENDING,
  FULFILLED,
  REJECTED,
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

export function FutureBuilder<T>({ future, builder }: FutureBuilderProps<T>) {
  const [state, setState] = useState<_FutureBuilderState<T>>({
    state: FutureBuilderState.PENDING,
  });

  useEffect(() => {
    future
      .then((result) => {
        setState({ state: FutureBuilderState.FULFILLED, data: result });
      })
      .catch((err) => {
        setState({
          state: FutureBuilderState.REJECTED,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });
  }, []);

  return <>{builder(state)}</>;
}
