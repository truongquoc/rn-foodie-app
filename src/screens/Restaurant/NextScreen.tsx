// src/screens/NextScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@/types/navigation';

type NextScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NextScreen'>;

type Props = {
  navigation: NextScreenNavigationProp;
  route: { params: { position: { latitude: number; longitude: number } } };
};

type Restaurant = {
  id: number;
  name: string;
  address: string;
  rating: string;
  main_image_url: string;
};

const NextScreen: React.FC<Props> = ({ navigation, route }) => {
  const { position } = route.params;
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  useEffect(() => {
    const fetchInitialRestaurants = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        console.log('lat', position.latitude, 'lon', position.longitude);
        
        fetchRestaurants(`https://botunique.com/api/restaurants/nearest/?lat=${position.latitude}&lon=${position.longitude}`, token);
      }
    };
    fetchInitialRestaurants();
  }, []);

  const handleSearch = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      fetchRestaurants(`https://botunique.com/api/restaurants/?name=${encodeURIComponent(search)}`, token);
    }
  };

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
      if (data.results) {
        if (url.includes('name')) {
          setRestaurants(data.results);
        } else {
          setRestaurants(prevRestaurants => [...(prevRestaurants ?? []), ...data.results]);
        }
        setNextUrl(data.next);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (nextUrl && token) {
      fetchRestaurants(nextUrl.replace('http', 'https'), token);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#ff6347" /> : null;
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
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={() => generateUUID()}
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
  searchIcon: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 10,
  },
  restaurantAddress: {
    fontSize: 12,
    color: '#888',
  },
});

export default NextScreen;
