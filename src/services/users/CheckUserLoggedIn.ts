// src/services/authService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';


export const checkUserLoggedIn = async (): Promise<boolean> => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    return !!userToken;
  } catch (error) {
    console.error('Failed to check if user is logged in', error);
    return false;
  }
};

