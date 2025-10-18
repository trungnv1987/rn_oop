import { defaultTheme } from '../theme/theme';
import Toast from 'react-native-toast-message';

export class ToastUtil {
  static success(message: string) {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
    });
  }

  static error(message: string) {
    Toast.show({
      type: 'error',
      text1: message,
      position: 'bottom',
    });
  }
  
}