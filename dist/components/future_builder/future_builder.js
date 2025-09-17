"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FutureBuilder = exports.FutureBuilderState = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
var FutureBuilderState;
(function (FutureBuilderState) {
    FutureBuilderState[FutureBuilderState["PENDING"] = 0] = "PENDING";
    FutureBuilderState[FutureBuilderState["FULFILLED"] = 1] = "FULFILLED";
    FutureBuilderState[FutureBuilderState["REJECTED"] = 2] = "REJECTED";
})(FutureBuilderState = exports.FutureBuilderState || (exports.FutureBuilderState = {}));
function FutureBuilder({ future, builder }) {
    const [state, setState] = (0, react_1.useState)(FutureBuilderState.PENDING);
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    (0, react_1.useEffect)(() => {
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
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: builder({ data, state, error }) });
}
exports.FutureBuilder = FutureBuilder;
