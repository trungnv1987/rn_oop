import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
export declare enum RouterType {
    Root = "Root",
    TabsNavigator = "TabsNavigator",
    PracticeDetail = "PracticeDetail",
    Login = "Login",
    VocabulariesTab = "VocabulariesTab",
    PracticeTab = "PracticeTab",
    SettingsTab = "SettingsTab",
    Vocabularies = "Vocabularies",
    Practice = "Practice",
    Settings = "Settings",
    Home = "Home",
    WordDetail = "WordDetail",
    Collections = "Collections",
    Sample = "Sample"
}
export interface NavigationParam {
    navigationId?: string;
    [key: string]: any;
}
export type RootStackParams = {
    [RouterType.TabsNavigator]: NavigationParam;
    [RouterType.Login]: NavigationParam;
    [RouterType.Collections]: NavigationParam;
    [RouterType.PracticeDetail]: NavigationParam;
};
export type LoginStackParams = {
    [RouterType.Login]: NavigationParam;
};
export type VocabulariesStackParams = {
    [RouterType.Vocabularies]: NavigationParam;
};
export type PracticeStackParams = {
    [RouterType.Practice]: NavigationParam;
};
export type PracticeDetailStackParams = {
    [RouterType.PracticeDetail]: NavigationParam;
};
export type SettingsStackParams = {
    [RouterType.Settings]: NavigationParam;
};
export type TabStackParams = {
    [RouterType.VocabulariesTab]: NavigationParam;
    [RouterType.PracticeTab]: NavigationParam;
    [RouterType.SettingsTab]: NavigationParam;
};
export type NavigationParams = RootStackParams & LoginStackParams & VocabulariesStackParams & PracticeStackParams & SettingsStackParams & PracticeDetailStackParams & TabStackParams;
export declare const modalScreenOptions: NativeStackNavigationOptions;
//# sourceMappingURL=routers.d.ts.map