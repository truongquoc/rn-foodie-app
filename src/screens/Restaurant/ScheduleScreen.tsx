// src/screens/ScheduleScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, SafeAreaView, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';

type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Schedule'>;

type ScheduleScreenRouteProp = RouteProp<RootStackParamList, 'Schedule'>;

type Props = {
  navigation: ScheduleScreenNavigationProp;
  route: ScheduleScreenRouteProp;
};

const ScheduleScreen: React.FC<Props> = ({ navigation, route }) => {
  const { foodItem } = route.params;
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const saveSchedule = async () => {
    try {
      const scheduledItem = {
        ...foodItem,
        scheduledDate: date,
      };
      const scheduledItems = JSON.parse(await AsyncStorage.getItem('scheduledItems')) || [];
      scheduledItems.push(scheduledItem);
      await AsyncStorage.setItem('scheduledItems', JSON.stringify(scheduledItems));
      Alert.alert('Success', 'Food item scheduled successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule the food item');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Schedule Food Item</Text>
      <View style={styles.foodItemContainer}>
        <Image source={{ uri: foodItem.main_image_url }} style={styles.foodImage} />
        <Text style={styles.foodName}>{foodItem.name}</Text>
      </View>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
        <Text style={styles.saveButtonText}>Save Schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  foodItemContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  foodImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ScheduleScreen;
