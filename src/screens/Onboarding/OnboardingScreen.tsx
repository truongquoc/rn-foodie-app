import React, {useRef} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

export default function OnboardingScreen({ navigation }: {navigation: any}) {
    const swiperRef = useRef(null);

    const goToNextSlide = () => {
        swiperRef.current.scrollBy(1);
    };

      
    return (
        <Swiper ref={swiperRef} style={styles.wrapper} showsButtons={false} loop={false} dotColor="#ddd" activeDotColor="#ff7f50">
        <View style={styles.slide}>
            <Image source={{uri: 'https://as1.ftcdn.net/v2/jpg/02/21/80/44/1000_F_221804493_KGdmFhJ8dOIntuTVvBcOobPAf32gScUd.jpg'}} style={styles.image} />
            <Text style={styles.title}>Choose A Tasty Dish</Text>
            <Text style={styles.subtitle}>Order anything you want from your favorite restaurant.</Text>
            <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.slide}>
            <Image source={{uri:'https://as1.ftcdn.net/v2/jpg/02/21/80/44/1000_F_221804493_KGdmFhJ8dOIntuTVvBcOobPAf32gScUd.jpg'}} style={styles.image} />
            <Text style={styles.title}>Order</Text>
            <Text style={styles.subtitle}>Place your personal order and make your day more delicious.</Text>
        </View>
        <View style={styles.slide}>
        <Image source={{uri: 'https://as1.ftcdn.net/v2/jpg/02/21/80/44/1000_F_221804493_KGdmFhJ8dOIntuTVvBcOobPAf32gScUd.jpg'}} style={styles.image} />
        <Text style={styles.title}>Order</Text>
        <Text style={styles.subtitle}>Place your personal order and make your day more delicious.</Text>
        <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.slide}>
            <Image source={{uri: 'https://as1.ftcdn.net/v2/jpg/02/21/80/44/1000_F_221804493_KGdmFhJ8dOIntuTVvBcOobPAf32gScUd.jpg'}} style={styles.image} />
            <Text style={styles.title}>Pick Up or Delivery</Text>
            <Text style={styles.subtitle}>We make food ordering fast, simple and free - no matter if you order online or cash.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainDrawer')}>
            <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
        </Swiper>
    );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: '50%',
    resizeMode: 'cover',
    borderRadius: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#ff7f50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
