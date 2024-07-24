// ResultScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const ResultScreen = ({ navigation }: {navigation: any}) => {
  const handleSurpriseMe = () => {
    navigation.navigate('LocationAccessScreen');
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('./path/to/your/image.png')} style={styles.image} />  */}
      {/* Replace with your image path */}
      <Text style={styles.title}>Escapists</Text>
      <Text style={styles.subtitle}>You're most likely</Text>
      {/* <Image source={require('./path/to/your/emoji.png')} style={styles.emoji} />  */}
      <TouchableOpacity style={styles.button} onPress={handleSurpriseMe}>
        <Text style={styles.buttonText}>Surprise me with your magic</Text>
        <Icon name="star" color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineButton} onPress={() => navigation.navigate('NextScreen')}>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default ResultScreen;
