"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIDialogController = exports._uiDialogControllerStore = void 0;
const react_oop_1 = require("react_oop");
const zustand_1 = require("zustand");
exports._uiDialogControllerStore = (0, zustand_1.create)(set => ({
    props: undefined,
    setProps: (props) => set({ props }),
}));
class UIDialogController {
    constructor() {
        this.cubit = new react_oop_1.GenericCubit();
    }
    show(props) {
        this.cubit.update(props);
    }
    hide() {
        this.cubit.update(undefined);
    }
    get isVisible() {
        return this.cubit.value != undefined;
    }
    dispose() {
        this.cubit.dispose();
    }
}
exports.UIDialogController = UIDialogController;
