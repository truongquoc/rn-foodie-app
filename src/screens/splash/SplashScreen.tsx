import { checkUserLoggedIn } from '@/services/users/CheckUserLoggedIn';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation } : {navigation:any}) {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await checkUserLoggedIn();
      if (isLoggedIn) {
        navigation.replace('MainDrawer', { screen: 'Onboarding' });
      } else {
        navigation.replace('Login');
      }
    };

    const timer = setTimeout(checkLoginStatus, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/AuthenBiteLogo.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
