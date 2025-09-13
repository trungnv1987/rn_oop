import { AppStorage } from "react_oop";
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class PlatformImpl {
  static async init(): Promise<void> {
    const secureStorage = {
        getItem:EncryptedStorage.getItem,
        setItem:EncryptedStorage.setItem,
        removeItem:EncryptedStorage.removeItem,
        clear:EncryptedStorage.clear,
    };
    const localStorage = {
        getItem:AsyncStorage.getItem,
        setItem:AsyncStorage.setItem,
        removeItem:AsyncStorage.removeItem,
        clear:AsyncStorage.clear,
    };
    await AppStorage.init({
        secureStorage,
        localStorage,
    });
  }
}