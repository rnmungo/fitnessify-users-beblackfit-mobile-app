import * as SecureStore from 'expo-secure-store';

export class SecureStorage {
  static async deleteItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error: unknown) {
      // TODO: Log error
    }
  }

  static async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error: unknown) {
      return null;
    }
  }

  static async setItem(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error: unknown) {
      // TODO: Log error
    }
  }
}
