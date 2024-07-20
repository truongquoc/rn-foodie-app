// screens/HomeScreen.tsx
import { url } from 'inspector';
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface CategoryItemProps {
  image: any;
  title: string;
}

interface SearchResultProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ title, description, price, image }) => (
  <View style={styles.searchResult}>
    <Image source={{ uri: image }} style={styles.searchResultImage} />
    <View style={styles.searchResultText}>
      <Text style={styles.searchResultTitle}>{title}</Text>
      <Text>{description}</Text>
      <Text>{price}</Text>
    </View>
  </View>
);


const CategoryItem: React.FC<CategoryItemProps> = ({ image, title }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <Image source={{ uri: image }} style={styles.categoryImage} />
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultProps[]>([]);

  const mockSearchResults = [
    {
      title: 'Saumon a la Parisienne',
      description: 'Atlantic Salmon served with mixed vegetables or risotto',
      price: '$32',
      image: 'https://lh5.googleusercontent.com/p/AF1QipNBR1NSE_vCRGZifugpNqOTMGqV6pkiKKnJ9R_S=w1920-h1080-k-no'
    },
    {
      title: 'Salade de Truite Fumee',
      description: 'Flakes of smoked trout with mâche, fingerling potato coins, shaved red onion, & toasted pumpkin seeds.',
      price: '$16',
      image: 'https://lh5.googleusercontent.com/p/AF1QipPB0pX2Eax8UszLMMRrnVMWp6JPSF37fW8aIEqr=w1920-h1080-k-no'
    },
    {
      title: 'Salade de Truite Fumee',
      description: 'Flakes of smoked trout with mâche, fingerling potato coins, shaved red onion, & toasted pumpkin seeds.',
      price: '$16',
      image: 'https://lh5.googleusercontent.com/p/AF1QipM9jyOqdolSqC0eqJxB27QWmJaP7v7zysODNcC0=w1920-h1080-k-no'
    },
    {
      title: 'Salade de Truite Fumee',
      description: 'Flakes of smoked trout with mâche, fingerling potato coins, shaved red onion, & toasted pumpkin seeds.',
      price: '$16',
      image: 'https://lh5.googleusercontent.com/p/AF1QipNBR1NSE_vCRGZifugpNqOTMGqV6pkiKKnJ9R_S=w1920-h1080-k-no'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchResults(mockSearchResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {searchQuery ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchResult {...item} />}
          keyExtractor={(item) => item.title}
          style={styles.searchResultsList}
          ListHeaderComponent={<View style={{ marginTop: 20 }} />} // Adds margin to the top
        />
      ) : (
        <>
          <Text style={styles.title}>Popular Categories</Text>
          <ScrollView horizontal={true} style={styles.categories}>
           <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Burgers" />
           <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Sandwiches" />
          <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Ramen" />
          <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Japanese" />
        </ScrollView>
        <Text style={styles.title}>Best Deals</Text>
       <View style={styles.deal}>
         <Image source={{uri: 'https://lh5.googleusercontent.com/p/AF1QipNETLLaVzmlseIBDIuyoQ3ARkOs04uwdaX72Pdi=w1920-h1080-k-no'}} style={styles.dealImage} />
       </View>
         <Text style={styles.title}>Most Popular</Text>
         <View style={styles.popular}>
           <Image source={{uri: 'https://lh5.googleusercontent.com/p/AF1QipNETLLaVzmlseIBDIuyoQ3ARkOs04uwdaX72Pdi=w1920-h1080-k-no'}} style={styles.popularImage} />
         </View>
        </>
      )}
    </View>
  );

  // return (
  //   <ScrollView style={styles.container}>
  //     <View style={styles.header}>
  //       <TextInput
  //         style={styles.searchBar}
  //         placeholder="Search..."
  //         value={searchQuery}
  //         onChangeText={handleSearch}
  //       />

  //       <Text style={styles.time}>10:51</Text>
  //       <View style={styles.cart}>
  //         <Text style={styles.cartText}>1</Text>
  //       </View>
  //     </View>
  //     <Text style={styles.title}>Popular Categories</Text>
  //     <ScrollView horizontal={true} style={styles.categories}>
  //       <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Burgers" />
  //       <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Sandwiches" />
  //       <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Ramen" />
  //       <CategoryItem image="https://lh5.googleusercontent.com/p/AF1QipNzhTDLEvW1KpFqSu3sF15XAFulimQIAIsEo5RC=w1920-h1080-k-no" title="Japanese" />
  //     </ScrollView>
  //     <Text style={styles.title}>Best Deals</Text>
  //     <View style={styles.deal}>
  //       <Image source={{uri: 'https://lh5.googleusercontent.com/p/AF1QipNETLLaVzmlseIBDIuyoQ3ARkOs04uwdaX72Pdi=w1920-h1080-k-no'}} style={styles.dealImage} />
  //     </View>
  //     <Text style={styles.title}>Most Popular</Text>
  //     <View style={styles.popular}>
  //       <Image source={{uri: 'https://lh5.googleusercontent.com/p/AF1QipNETLLaVzmlseIBDIuyoQ3ARkOs04uwdaX72Pdi=w1920-h1080-k-no'}} style={styles.popularImage} />
  //     </View>
  //   </ScrollView>
  // );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
  },
  cart: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  cartText: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categories: {
    flexDirection: 'row',
  },
  categoryItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
  },
  searchResult: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  deal: {
    marginVertical: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchResultImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  dealImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  searchResultText: {
    flex: 1,
    justifyContent: 'center',
  },
  searchResultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchResultsList: {
    marginTop: 10,
  },
  popular: {
    marginVertical: 10,
  },
  popularImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default HomeScreen;