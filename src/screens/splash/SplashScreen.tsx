import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation } : {navigation:any}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Splash2');
    }, 2000); // Display for 2 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://as1.ftcdn.net/v2/jpg/02/52/38/80/1000_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg'}} style={styles.image} />
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
