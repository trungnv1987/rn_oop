import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MobileViewModel } from '../screens/base/mobile_view_model';
import { NavigationProp } from '@react-navigation/native';
import { NavigationParams } from '../router/routers';

/**
 * Custom hook that automatically sets navigation for MobileViewModel instances
 * @param viewModel - The MobileViewModel instance
 */
export function useViewModel<T extends MobileViewModel>(viewModel: T): T {
  const navigation = useNavigation<NavigationProp<NavigationParams>>();
  const viewModelRef = useRef<T>(viewModel);

  useEffect(() => {
    if (viewModelRef.current) {
      viewModelRef.current.setNavigation(navigation);
    }
  }, [navigation]);

  return viewModelRef.current;
}
