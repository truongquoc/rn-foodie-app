// src/screens/FoodDetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type FoodDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FoodDetails'>;

type Props = {
  navigation: FoodDetailsScreenNavigationProp;
};

const FoodDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    setQuantity((prevQuantity) => {
      if (action === 'increment') return prevQuantity + 1;
      if (action === 'decrement' && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  return (
    <Text>Food Details Screen</Text>
    // <ScrollView style={styles.container}>
    //   <View style={styles.header}>
    //     <TouchableOpacity onPress={() => navigation.goBack()}>
    //       <Text style={styles.backButton}>{'<'}</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <Text style={styles.favoriteButton}>❤</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <Image source={{uri: 'https://lh5.googleusercontent.com/p/AF1QipMg1505Yqok-XCz8mySPSoe7pqOlnhsqSGxLlz2=w1920-h1080-k-no'}} style={styles.foodImage} /> {/* Adjust the path as necessary */}
    //   <View style={styles.detailsContainer}>
    //     <Text style={styles.title}>Burger Bistro</Text>
    //     <Text style={styles.subtitle}>Rose Garden</Text>
    //     <View style={styles.ratingContainer}>
    //       <Text style={styles.rating}>⭐ 4.7</Text>
    //       <Text style={styles.delivery}>Free Delivery</Text>
    //       <Text style={styles.time}>20 min</Text>
    //     </View>
    //     <Text style={styles.description}>
    //       Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
    //     </Text>
    //     <Text style={styles.sectionTitle}>SIZE:</Text>
    //     <View style={styles.sizeContainer}>
    //       <TouchableOpacity style={[styles.sizeButton, styles.selectedSizeButton]}>
    //         <Text style={styles.sizeButtonText}>10</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.sizeButton}>
    //         <Text style={styles.sizeButtonText}>14"</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity style={styles.sizeButton}>
    //         <Text style={styles.sizeButtonText}>16"</Text>
    //       </TouchableOpacity>
    //     </View>
    //     <Text style={styles.sectionTitle}>INGREDIENTS:</Text>
    //     <View style={styles.ingredientsContainer}>
    //     </View>
    //     <View style={styles.priceContainer}>
    //       <Text style={styles.price}>$32</Text>
    //       <View style={styles.quantityContainer}>
    //         <TouchableOpacity onPress={() => handleQuantityChange('decrement')} style={styles.quantityButton}>
    //           <Text style={styles.quantityButtonText}>-</Text>
    //         </TouchableOpacity>
    //         <Text style={styles.quantity}>{quantity}</Text>
    //         <TouchableOpacity onPress={() => handleQuantityChange('increment')} style={styles.quantityButton}>
    //           <Text style={styles.quantityButtonText}>+</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
    //     <TouchableOpacity style={styles.addToCartButton}>
    //       <Text style={styles.addToCartButtonText}>ADD TO CART</Text>
    //     </TouchableOpacity>
    //   </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    fontSize: 24,
    color: '#ff6347',
  },
  favoriteButton: {
    fontSize: 24,
    color: '#ff6347',
  },
  foodImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginRight: 10,
  },
  delivery: {
    fontSize: 16,
    marginRight: 10,
  },
  time: {
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sizeButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#ff6347',
  },
  sizeButtonText: {
    color: '#fff',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 10,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FoodDetailsScreen;
