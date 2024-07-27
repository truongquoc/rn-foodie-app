import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
	SplashScreen: undefined;
	Onboarding: undefined;
	Login: undefined;
	SignUp: undefined;
	LocationAccessScreen: undefined;
	ResultScreen: undefined;
	NextScreen: undefined;
	FoodDetails: undefined;
	RestaurantList: undefined;
};

export type RootScreenProps<
	S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
