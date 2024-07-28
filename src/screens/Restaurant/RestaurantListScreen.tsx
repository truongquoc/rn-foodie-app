import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '@/types/navigation';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

type RestaurantListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantList'>;

type Props = {
  navigation: RestaurantListScreenNavigationProp;
};

type Restaurant = {
  id: number;
  name: string;
  address: string;
  rating: string | null;
  main_image_url: string;
  vegan_options: boolean;
};

const RestaurantListScreen: React.FC<Props> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isVegan, setIsVegan] = useState<boolean | null>(null); // null: no preference, true: vegan, false: non-vegan

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const fetchInitialRestaurants = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      fetchRestaurants('https://botunique.com/api/restaurants/persona_recommendations/?page=1&page_size=10', token);
    }
  };

  useEffect(() => {
    fetchInitialRestaurants();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSearch('');
      setRestaurants([]);
      setNextUrl(null);
      setLoading(false);
      fetchInitialRestaurants();
    }, [])
  );

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
        let validRestaurants = data.results.filter(
          (restaurant: Restaurant) => restaurant.main_image_url !== null && restaurant.main_image_url !== ''
        );
        if (isVegan !== null) {
          validRestaurants = validRestaurants.filter((restaurant: Restaurant) => restaurant.vegan_options === isVegan);
        }
        const uniqueRestaurants = validRestaurants.filter(
          (restaurant) => !restaurants.some((existingRestaurant) => existingRestaurant.id === restaurant.id)
        );
        if (url.includes('name')) {
          setRestaurants(uniqueRestaurants);
        } else {
          setRestaurants((prevRestaurants) => [...(prevRestaurants ?? []), ...uniqueRestaurants]);
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

  const applyFilter = () => {
    // Apply the filter and refetch restaurants
    setFilterVisible(false);
    setRestaurants([]);
    setNextUrl(null);
    fetchInitialRestaurants();
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
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
          <Icon name="filter-list" size={24} />
        </TouchableOpacity>
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
                {item.rating && <Text style={styles.restaurantRating}>⭐ {item.rating}</Text>}
                <Text style={styles.restaurantAddress}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <Modal
        visible={filterVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter your search</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setFilterVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Food Preference</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[styles.optionButton, isVegan === true && styles.selectedOption]}
                onPress={() => setIsVegan(true)}
              >
                <Text>Vegan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, isVegan === false && styles.selectedOption]}
                onPress={() => setIsVegan(false)}
              >
                <Text>Non-Vegan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionButton, isVegan === null && styles.selectedOption]}
                onPress={() => setIsVegan(null)}
              >
                <Text>No Preference</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
              <Text style={styles.applyButtonText}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  selectedOption: {
    backgroundColor: '#ff6347',
    color: '#fff',
  },
  applyButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RestaurantListScreen;
