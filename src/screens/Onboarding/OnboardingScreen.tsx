import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: {navigation: any}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const slideAnim = useRef(new Animated.Value(0)).current;
  
    const steps = [
      {
        question: 'What types of activities do you prioritize on your trips?',
        options: [
          'Exciting and adventurous activities',
          'Visits to historical sites and cultural landmarks',
          'Activities that are pre-planned and well-researched',
          'Enjoying beautiful locations and taking inspiring photos',
        ],
      },
      {
        question: 'How much time do you spend researching a destination before you visit?',
        options: [
          'Minimal research, prefer to go with the flow',
          'Extensive research to learn about the history and culture',
          'Detailed research and planning to create a thorough itinerary',
          'Some research for inspiration but not necessarily for booking trips',
        ],
      },
      {
        question: 'How important is trying local cuisine when you travel?',
        options: [
          "Very important, especially if it's exciting and exotic",
          "Very important, especially if it's traditional and culturally significant",
          'Important, but prefer well-reviewed and known eateries',
          'Important if the food is visually appealing and Instagram-worthy',
        ],
      },
    ];
  
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [currentStep]);
  
    
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
          Animated.timing(slideAnim, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setCurrentStep(currentStep + 1);
            slideAnim.setValue(width);
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
          });
        } else {
          navigation.navigate('ResultScreen');
        }
      };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View style={{ ...styles.slideContainer, transform: [{ translateX: slideAnim }] }}>
          <View style={styles.questionContainer}>
            <Icon name="search" size={30} />
            <Text style={styles.question}>{steps[currentStep].question}</Text>
          </View>
          <View style={styles.optionsContainer}>
            {steps[currentStep].options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionButton}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Save and Next</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    slideContainer: {
      width: '100%',
    },
    questionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    question: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    optionsContainer: {
      width: '100%',
      marginBottom: 20,
    },
    optionButton: {
      backgroundColor: '#e0e0e0',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
    },
    nextButton: {
      backgroundColor: '#000',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
    },
    nextButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default OnboardingScreen;
  