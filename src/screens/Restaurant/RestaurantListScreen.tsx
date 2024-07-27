// src/screens/RestaurantListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@/types/navigation';
import { log } from 'console';

type RestaurantListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantList'>;

type Props = {
  navigation: RestaurantListScreenNavigationProp;
};

type Restaurant = {
  id: number;
  name: string;
  address: string;
  rating: string;
  main_image_url: string;
};

const RestaurantListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialRestaurants = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        fetchRestaurants('https://botunique.com/api/restaurants/?next=3&page=30&page_size=10', token);
      }
    };
    fetchInitialRestaurants();
  }, []);

  const fetchRestaurants = async (url: string, token: string) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('data', data);
      setRestaurants(prevRestaurants => [...prevRestaurants, ...data.results]);
      setNextUrl(data.next);
    } catch (error) {
      console.error('message restaurant', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (nextUrl && token) {
      console.log('handle load more url', nextUrl.replace('http', 'https'));
      console.log('handle load more', token);
      fetchRestaurants(nextUrl.replace('http', 'https'), token);
    }
  };

  const renderFooter = () => {
    return (
      loading ? <ActivityIndicator size="large" color="#ff6347" /> : null
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food or restaurants"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.filterButton}>
          
        </TouchableOpacity>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FoodDetails', { restaurant: item })}>
            <View style={styles.restaurantContainer}>
              <Image source={{ uri: item.main_image_url }} style={styles.restaurantImage} />
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantRating}>⭐ {item.rating}</Text>
                <Text style={styles.restaurantAddress}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  restaurantContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantRating: {
    fontSize: 14,
    color: '#888',
  },
  restaurantAddress: {
    fontSize: 12,
    color: '#888',
  },
});

export default RestaurantListScreen;
