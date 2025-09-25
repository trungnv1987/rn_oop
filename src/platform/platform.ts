import { AppStorage, AppStorageInterface } from "react_oop";
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class PlatformImpl {
  static secureStorage:AppStorageInterface;
  static localStorage:AppStorageInterface;
  static async init(): Promise<void> {
    this.secureStorage = {
        getItem:EncryptedStorage.getItem,
        setItem:EncryptedStorage.setItem,
        removeItem:EncryptedStorage.removeItem,
        clear:EncryptedStorage.clear,
    };
    this.localStorage = {
        getItem:AsyncStorage.getItem,
        setItem:AsyncStorage.setItem,
        removeItem:AsyncStorage.removeItem,
        clear:AsyncStorage.clear,
    };
    await AppStorage.init({
        secureStorage:this.secureStorage,
        localStorage:this.localStorage,
    });
  }
}