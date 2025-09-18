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
    const [state, setState] = (0, react_1.useState)({
        state: FutureBuilderState.PENDING,
    });
    (0, react_1.useEffect)(() => {
        future
            .then((result) => {
            setState({ state: FutureBuilderState.FULFILLED, data: result });
        })
            .catch((err) => {
            console.error(`Error in FutureBuilder: ${err}`);
            setState({
                state: FutureBuilderState.REJECTED,
                error: err instanceof Error ? err : new Error(String(err)),
            });
        });
    }, []);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: builder(state) });
}
exports.FutureBuilder = FutureBuilder;
