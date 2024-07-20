import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const categories = [
  { id: '1', title: 'Burgers', image: 'https://lh5.googleusercontent.com/p/AF1QipPuAz_1AbEI5ONIpbCvIUaYDlJ_fhfko7tNKtCS=w1920-h1080-k-no' },
  { id: '2', title: 'Sushi', image: 'https://lh5.googleusercontent.com/p/AF1QipNLaTRzAElc4FaHQhQATd3uK--48RExAVnruz6b=w1920-h1080-k-no' },
  { id: '3', title: 'Ramen', image: 'https://lh5.googleusercontent.com/p/AF1QipM_hL4w8GmD64wHK_v0rWyg0YAl1sB0se_cdYnm=w1920-h1080-k-no' },
  { id: '4', title: 'Bar Food', image: 'https://lh5.googleusercontent.com/p/AF1QipNBR1NSE_vCRGZifugpNqOTMGqV6pkiKKnJ9R_S=w1920-h1080-k-no' },
  { id: '5', title: 'Breakfast', image: 'https://lh5.googleusercontent.com/p/AF1QipMg1505Yqok-XCz8mySPSoe7pqOlnhsqSGxLlz2=w1920-h1080-k-no' },
  { id: '6', title: 'Italian', image: 'https://lh5.googleusercontent.com/p/AF1QipMT9wB1EP7V7N6HXofoGjLhYwH1eENdCjueYhYf=w1920-h1080-k-no' },
  { id: '7', title: 'Japanese', image: 'https://lh5.googleusercontent.com/p/AF1QipPWxC54UNypuAdcWB-qp9coMFO1NqLa3IVlo1Zk=w1920-h1080-k-no' },
  { id: '8', title: 'New Mexican', image: 'https://lh5.googleusercontent.com/p/AF1QipNpFZpLBRD9q-1c2CXX8q5ANkvrNMbHkCK1d_qG=w1920-h1080-k-no' },
  { id: '9', title: 'Sandwiches', image: 'https://lh5.googleusercontent.com/p/AF1QipPUAbW3gd5ZnRoeLoI4j9y-3eojGWHZgeH9vwMn=w1920-h1080-k-no' },
  { id: '10', title: 'Mediterranean', image: 'https://lh5.googleusercontent.com/p/AF1QipNMZ923UwIdK-2agyc4sGrX9yYGp-8Ej0hOwXJg=w1920-h1080-k-no' },
];

const CategoryScreen = () => {
  const renderItem = ({ item }: {item:any}) => (
    <TouchableOpacity style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cuisines</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CategoryScreen;
