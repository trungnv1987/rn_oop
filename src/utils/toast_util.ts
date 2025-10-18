import Toast from 'react-native-toast-message';

export class ToastUtil {
  static success(message: string, {description}: {description?: string} = {}) {
    Toast.show({
      type: 'success',
      text1: message,
      text2: description,
      position: 'bottom',
    });
  }

  static error(message: string, {description}: {description?: string} = {}) {
    Toast.show({
      type: 'error',
      text1: message,
      text2: description,
      position: 'bottom',
    });
  }
  
}