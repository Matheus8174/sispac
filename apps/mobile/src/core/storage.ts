import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem<T>(key: string) {
  const value = await AsyncStorage.getItem(key);

  const parsed = value ? (JSON.parse(value) as T) : undefined;

  return parsed;
}

export async function setItem<T>(key: string, value: T) {
  const parsedValue = JSON.stringify(value);

  await AsyncStorage.setItem(key, parsedValue);
}

export async function removeItem(key: string) {
  await AsyncStorage.removeItem(key);
}
