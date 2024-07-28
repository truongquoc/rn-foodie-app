// src/screens/FoodDetailsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type FoodDetailsScreenRouteProp = RouteProp<RootStackParamList, 'FoodDetails'>;
type FoodDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FoodDetails'>;

type Props = {
  route: FoodDetailsScreenRouteProp;
  navigation: FoodDetailsScreenNavigationProp;
};

const FoodDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { restaurant, index } = route.params;

  const handleBackToList = () => {
    navigation.navigate('RestaurantList', { index });
  };

  const renderOpeningHours = (openingHours: any) => {
    return Object.keys(openingHours).map((day) => (
      <Text key={day} style={styles.openingHoursText}>
        {day}: {openingHours[day]}
      </Text>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: restaurant.main_image_url || 'https://via.placeholder.com/150' }} style={styles.image} />
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.rating}>Rating: ⭐ {restaurant.rating || 'N/A'}</Text>
      <Text style={styles.address}>{restaurant.address}</Text>
      {restaurant.phone_number && (
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${restaurant.phone_number}`)}>
          <Text style={styles.phone}>Phone: {restaurant.phone_number}</Text>
        </TouchableOpacity>
      )}
      {restaurant.website && (
        <TouchableOpacity onPress={() => Linking.openURL(restaurant.website)}>
          <Text style={styles.website}>Website: {restaurant.website}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.status}>Status: {restaurant.is_open ? 'Open' : 'Closed'}</Text>
      <Text style={styles.veganOptions}>Vegan Options: {restaurant.vegan_options ? 'Available' : 'Not Available'}</Text>
      {restaurant.opening_hours_formatted && (
        <View style={styles.openingHoursContainer}>
          <Text style={styles.openingHoursTitle}>Opening Hours:</Text>
          {renderOpeningHours(restaurant.opening_hours_formatted)}
        </View>
      )}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
        <Text style={styles.backButtonText}>Back to List</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: '#888',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: '#ff6347',
    marginBottom: 8,
  },
  website: {
    fontSize: 16,
    color: '#ff6347',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  veganOptions: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  openingHoursContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  openingHoursTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  openingHoursText: {
    fontSize: 16,
    color: '#888',
  },
  backButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    paddingLeft: 100,
    paddingRight: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scheduleButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FoodDetailsScreen;
