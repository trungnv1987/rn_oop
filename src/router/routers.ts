import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Lang } from "react_oop";

export enum RouterType {
  // Root level routes
  Root = 'Root',
  TabsNavigator = 'TabsNavigator',
  PracticeDetail = 'PracticeDetail',
  
  // Login flow routes
  Login = 'Login',
  
  // Tab routes
  VocabulariesTab = 'VocabulariesTab',
  PracticeTab = 'PracticeTab',
  SettingsTab = 'SettingsTab',
  
  // Screen routes within tabs
  Vocabularies = 'Vocabularies',
  Practice = 'Practice',
  Settings = 'Settings',
  
  // Other screen routes
  Home = 'Home',
  WordDetail = 'WordDetail',
  Collections = 'Collections',
  Sample = 'Sample',


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

export type NavigationParams = RootStackParams &
  LoginStackParams &
  VocabulariesStackParams &
  PracticeStackParams &
  SettingsStackParams &
  
  PracticeDetailStackParams &
  TabStackParams;


  export const modalScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerBackVisible: true,
    animation: 'slide_from_bottom',
    presentation: 'modal',
    headerBackTitle: Lang.localize('common.back'),
  }