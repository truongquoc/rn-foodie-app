// src/screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@/types/navigation';
import { Image } from 'react-native-elements';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userData = await AsyncStorage.getItem('userToken');
      if (userData) {
        navigation.replace('MainDrawer', {screen: 'Onboarding'});
      }
    };

    checkUserLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    const payload = {
      username,
      password,
    };

    try {
      const response = await fetch('https://botunique.com/api/auth-token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Invalid username or password');
        return;
      }

      const data = await response.json();
      await AsyncStorage.setItem('userToken', data.token);
      Alert.alert('Success', 'User logged in successfully');
      navigation.replace('MainDrawer', {screen: 'Onboarding'});
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.optionsContainer}>
        <View style={styles.rememberMe}>
          <TouchableOpacity>
            <Text style={styles.optionText}>Remember me</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.optionText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don't have an account? SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signUpLink: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpText: {
    color: '#ff6347',
    fontSize: 14,
  },
  socialContainer: {
    alignItems: 'center',
  },
  orText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
  },
  socialIcon: {
    width: 40,
    height: 40,
    margin: 10,
  },
});

export default LoginScreen;
