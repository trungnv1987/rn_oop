"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalScreenOptions = exports.RouterType = void 0;
const react_oop_1 = require("react_oop");
var RouterType;
(function (RouterType) {
    // Root level routes
    RouterType["Root"] = "Root";
    RouterType["TabsNavigator"] = "TabsNavigator";
    RouterType["PracticeDetail"] = "PracticeDetail";
    // Login flow routes
    RouterType["Login"] = "Login";
    // Tab routes
    RouterType["VocabulariesTab"] = "VocabulariesTab";
    RouterType["PracticeTab"] = "PracticeTab";
    RouterType["SettingsTab"] = "SettingsTab";
    // Screen routes within tabs
    RouterType["Vocabularies"] = "Vocabularies";
    RouterType["Practice"] = "Practice";
    RouterType["Settings"] = "Settings";
    // Other screen routes
    RouterType["Home"] = "Home";
    RouterType["WordDetail"] = "WordDetail";
    RouterType["Collections"] = "Collections";
    RouterType["Sample"] = "Sample";
})(RouterType = exports.RouterType || (exports.RouterType = {}));
exports.modalScreenOptions = {
    headerShown: true,
    headerBackVisible: true,
    animation: 'slide_from_bottom',
    presentation: 'modal',
    headerBackTitle: react_oop_1.Lang.localize('common.back'),
};
