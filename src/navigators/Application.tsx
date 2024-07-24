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
import NextSplashScreen from '@/screens/splash/NextSplashScreen';
import ResultScreen from '@/screens/Result/ResultScreen';
import LocationAccessScreen from '@/screens/Result/LocationAccessScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
	return (
	  <Drawer.Navigator initialRouteName="Home">
		<Drawer.Screen name="Home" component={HomeScreen} />
		<Drawer.Screen name="Cuisines" component={CategoryScreen}/> 

		{/* Add more screens here */}
	  </Drawer.Navigator>
	);
}

function ApplicationNavigator() {
	return (
		<NavigationContainer>
		<Stack.Navigator initialRouteName="Splash1" screenOptions={{ headerShown: false }}>
		  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
		  <Stack.Screen name="ResultScreen" component={ResultScreen} />
		  <Stack.Screen name="LocationAccessScreen" component={LocationAccessScreen} />
		  <Stack.Screen name="MainDrawer" component={MainDrawer} />
		</Stack.Navigator>
	  </NavigationContainer>
	  )
}

export default ApplicationNavigator;
