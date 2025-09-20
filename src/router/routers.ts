import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { GenericCallback, Lang } from "react_oop";


  export const modalScreenOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerBackVisible: true,
    animation: 'slide_from_bottom',
    presentation: 'modal',
    headerBackTitle: Lang.localize('common.back'),
  }

  export interface BaseScreenParams {
    onReturn?: GenericCallback<any>;
  }
  