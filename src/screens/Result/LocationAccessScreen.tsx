// LocationAccessScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

type RootStackParamList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  LocationAccessScreen: undefined;
  ResultScreen: undefined;
  NextScreen: undefined;
  FoodDetails: undefined;
  RestaurantList: undefined;
};

type LocationAccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LocationAccessScreen'>;

type Props = {
  navigation: LocationAccessScreenNavigationProp;
};

const LocationAccessScreen: React.FC<Props> = ({ navigation }) => {
  const handleAccessLocation = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            navigation.navigate('NextScreen'); // Navigate to the next screen
          },
          (error) => {
            console.error(error);
            Alert.alert('Location Error', 'Unable to retrieve location. Please try again.');
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to access this feature.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while requesting location permission.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Vector-Location-PNG.png')} style={styles.image} /> 
      <TouchableOpacity style={styles.button} onPress={handleAccessLocation}>
        <Text style={styles.buttonText}>ACCESS LOCATION</Text>
      </TouchableOpacity>
      <Text style={styles.infoText}>DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  infoText: {
    color: '#7d7d7d',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LocationAccessScreen;
