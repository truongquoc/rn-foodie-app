// src/screens/OnboardingScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

const { width } = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

type Props = {
  navigation: OnboardingScreenNavigationProp;
};

const questions = [
  {
    question: "What do you most look forward to when planning a trip?",
    answers: [
      "Experiencing thrilling adventures",
      "Learning about the culture and history",
      "Having a detailed and well-organized plan",
      "Imagining and dreaming about potential trips"
    ]
  },
  {
    question: "What types of activities do you prioritize on your trips?",
    answers: [
      "Exciting and adventurous activities",
      "Visits to historical sites and cultural landmarks",
      "Activities that are pre-planned and well-researched",
      "Enjoying beautiful locations and taking inspiring photos"
    ]
  },
  {
    question: "How much time do you spend researching a destination before you visit?",
    answers: [
      "Minimal research, prefer to go with the flow",
      "Extensive research to learn about the history and culture",
      "Detailed research and planning to create a thorough itinerary",
      "Some research for inspiration but not necessarily for booking trips"
    ]
  },
  {
    question: "How important is trying local cuisine when you travel?",
    answers: [
      "Very important, especially if it's exciting and exotic",
      "Very important, especially if it's traditional and culturally significant",
      "Important, but prefer well-reviewed and known eateries",
      "Important if the food is visually appealing and Instagram-worthy"
    ]
  },
  {
    question: "What makes you feel satisfied and comfortable during a trip?",
    answers: [
      "Having a sense of escape and adventure",
      "Feeling well-informed and educated about the destination",
      "Knowing everything is planned and organized",
      "Immersing in the beauty and potential of the destination"
    ]
  }
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const swiperRef = useRef<Swiper>(null);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = (questionIndex: number) => {
    if (answers[questionIndex] === -1) {
      Alert.alert('Error', 'Please select an answer before proceeding');
      return;
    }

    if (questionIndex < questions.length - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      calculatePersona();
    }
  };

  const calculatePersona = () => {
    const personaScores = { Escapists: 0, Learners: 0, Planners: 0, Dreamers: 0 };

    answers.forEach(answer => {
      switch (answer) {
        case 0:
          personaScores.Escapists++;
          break;
        case 1:
          personaScores.Learners++;
          break;
        case 2:
          personaScores.Planners++;
          break;
        case 3:
          personaScores.Dreamers++;
          break;
        default:
          break;
      }
    });

    const maxScore = Math.max(
      personaScores.Escapists,
      personaScores.Learners,
      personaScores.Planners,
      personaScores.Dreamers
    );

    let persona = 'Escapists';
    if (personaScores.Learners === maxScore) persona = 'Learners';
    if (personaScores.Planners === maxScore) persona = 'Planners';
    if (personaScores.Dreamers === maxScore) persona = 'Dreamers';

    navigation.navigate('ResultScreen', { persona });
  };

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsPagination={true}
      paginationStyle={styles.pagination}
      activeDotColor="#ff6347"
    >
      {questions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.slide}>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.answers.map((answer, answerIndex) => (
            <TouchableOpacity
              key={answerIndex}
              style={[
                styles.answerButton,
                answers[questionIndex] === answerIndex && styles.selectedAnswerButton
              ]}
              onPress={() => handleAnswer(questionIndex, answerIndex)}
            >
              <Text
                style={[
                  styles.answerButtonText,
                  answers[questionIndex] === answerIndex && styles.selectedAnswerButtonText
                ]}
              >
                {answer}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => handleNext(questionIndex)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pagination: {
    bottom: 70,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: width * 0.8,
  },
  selectedAnswerButton: {
    backgroundColor: '#ff6347',
  },
  answerButtonText: {
    color: '#333',
    textAlign: 'center',
  },
  selectedAnswerButtonText: {
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: width * 0.5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OnboardingScreen;
