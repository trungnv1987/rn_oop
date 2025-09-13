import { defaultTheme } from '../theme/theme';
import Toast from 'react-native-root-toast';

export class ToastUtil {
  static success(message: string, {position = Toast.positions.BOTTOM, duration = Toast.durations.LONG}: {position?: number, duration?: number} = {}) {
    Toast.show(message, {
      duration: duration,
      position: position,
      backgroundColor: defaultTheme.colors.success,      
      containerStyle: { width: '100%' },
    });
  }
}