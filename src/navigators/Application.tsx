import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Example, HomeScreen, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { RootStackParamList } from '@/types/navigation';
import Sidebar from '@/components/sidebar/Sidebar';
import CategoryScreen from '@/screens/Category';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function ApplicationNavigator() {
	return (
		<NavigationContainer>
		  <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Cuisines" component={CategoryScreen}/> 
			<Drawer.Screen name="Search" component={HomeScreen} />
			<Drawer.Screen name="Cart" component={HomeScreen} />
			<Drawer.Screen name="Profile" component={HomeScreen} />
			<Drawer.Screen name="Orders" component={HomeScreen} />
		  </Drawer.Navigator>
		</NavigationContainer>
	  );
}

export default ApplicationNavigator;
