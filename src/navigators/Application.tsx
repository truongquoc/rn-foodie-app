import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Example, HomeScreen, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import Sidebar from '@/components/sidebar/Sidebar';
import CategoryScreen from '@/screens/Category';
import OnboardingScreen from '@/screens/Onboarding/OnboardingScreen';
import SplashScreen from '@/screens/splash/SplashScreen';
import ResultScreen from '@/screens/Result/ResultScreen';
import LocationAccessScreen from '@/screens/Result/LocationAccessScreen';
import LoginScreen from '@/screens/Auth/LoginScreen';
import SignUpScreen from '@/screens/Auth/SignUpScreen';
import RestaurantListScreen from '@/screens/Restaurant/RestaurantListScreen';
import FoodDetailsScreen from '@/screens/Restaurant/FoodDetailsScreen';
import CustomDrawerContent from '@/screens/Auth/CustomDrawerContent';
import NextScreen from '@/screens/Restaurant/NextScreen';
import ScheduleScreen from '@/screens/Restaurant/ScheduleScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
	return (
	  <Drawer.Navigator initialRouteName="Onboarding"
	  drawerContent={(props) => <CustomDrawerContent {...props} />}
	  >
		<Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Persona' }} />
		<Stack.Screen name="LocationAccessScreen" component={LocationAccessScreen} />
		<Stack.Screen name="ResultScreen" component={ResultScreen} />
		<Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
		<Stack.Screen name="FoodDetails" component={FoodDetailsScreen} />
		<Stack.Screen name="NextScreen" component={NextScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
	  </Drawer.Navigator>
	);
}

function ApplicationNavigator() {
	// return (
	// 	<NavigationContainer>
	// 	<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
	// 	  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
	// 	  <Stack.Screen name="ResultScreen" component={ResultScreen} />
	// 	  <Stack.Screen name="LocationAccessScreen" component={LocationAccessScreen} />
	// 	  <Stack.Screen name="Login" component={LoginScreen} />
	// 	  <Stack.Screen name="SignUp" component={SignUpScreen} />
	// 	  <Stack.Screen name="MainDrawer" component={MainDrawer} />
	// 	</Stack.Navigator>
	//   </NavigationContainer>
	//   )

	return (
		<NavigationContainer>
		  <Stack.Navigator initialRouteName="SplashScreen">
			<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="SignUp" component={SignUpScreen} />
			<Stack.Screen name="MainDrawer" component={MainDrawer}  options={{ headerShown: false }} />
		  </Stack.Navigator>
		</NavigationContainer>
	  );
}

export default ApplicationNavigator;
