// src/screens/ResultScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { log } from 'console';

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResultScreen'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'ResultScreen'>;

type Props = {
  navigation: ResultScreenNavigationProp;
  route: ResultScreenRouteProp;
};

const personaImages = {
  Escapists: require('../../assets//escapist.png'),
  Learners: require('../../assets//escapist.png'),
  Planners: require('../../assets//escapist.png'),
  Dreamers: require('../../assets//escapist.png'),
};

const ResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { persona } = route.params;

  const handleSurpriseMe = () => {
    navigation.navigate('LocationAccessScreen');
  };

  const handleFindItMyself = () => {
    navigation.navigate('RestaurantList');
  };

  console.log('personal image', persona);
  return (
    <View style={styles.container}>
      <Image source={personaImages[persona]} style={styles.image} />
      <Text style={styles.title}>{persona}</Text>
      <Text style={styles.subtitle}>You're most likely a {persona}</Text>
      <Image source={require('../../assets/emoij.png')} style={styles.emoji} />
      <TouchableOpacity style={styles.button} onPress={handleSurpriseMe}>
        <Text style={styles.buttonText}>Surprise me with your magic</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineButton} onPress={handleFindItMyself}>
        <Text style={styles.outlineButtonText}>Nah! I will find it myself</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  emoji: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ff6347',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: '#ff6347',
    fontSize: 16,
  },
});

export default ResultScreen;
