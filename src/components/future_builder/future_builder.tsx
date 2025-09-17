import React, { ReactNode, useEffect, useState } from "react";

export enum FutureBuilderState {
  PENDING,
  FULFILLED,
  REJECTED,
}

export interface FutureBuilderProps<T> {
  future: Promise<T>;
  builder: ({
    data,
    state,
    error,
  }: {
    data?: T;
    state: FutureBuilderState;
    error?: Error;
  }) => ReactNode;
}

export function FutureBuilder<T>({ future, builder }: FutureBuilderProps<T>) {
  const [state, setState] = useState<FutureBuilderState>(
    FutureBuilderState.PENDING
  );
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    // Reset state when future changes
    setState(FutureBuilderState.PENDING);
    setData(undefined);
    setError(undefined);

    future
      .then((result) => {
        if (isMounted) {
          setData(result);
          setState(FutureBuilderState.FULFILLED);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setState(FutureBuilderState.REJECTED);
        }
      });

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  });

  return <>{builder({ data, state, error })}</>;
}
