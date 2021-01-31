import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import theme from '../theme';
import ApplicationDetail from './components/ApplicationDetail';
import ApplicationSwiper from './components/ApplicationSwiper';
import RestaurantList from './components/RestaurantList';
import { store } from './state/Redux';

/*
Todo List
	1. Implement real ajax/socket calls to update the state
	2. Type strings that should be enums for autocompletion and type safety
	3. Type route names and other strings for type safety
	4. Implement localisation for Danish, Swedish, English, Norwegian based on phone language
	5. Add jest unit tests for utility functions
	6. Implement husky for precommit hooks
	7. Set up pipeline for deploying, distributing on Appcenter, Bitrise etc.
	8. Style the app and pimp it, placeholders for photos, basically business card for applicant details
	9. Add mock login screen
	10. Implement Communications library for emailing, or making a phone call to the applicants
	11. Implement http/socket communication for setting applications as viewed, accepted, rejected
	12. If it gets too big, add redux, or mobx (yuck!) for improved state management. Context is for simple apps
	13. Create own ListItem and List renderers, and Card for application detail
*/

const RestaurantStack = createStackNavigator();

class App extends React.Component {

	render(){
		return (
			<Provider
				store={store}
			>
				<NavigationContainer>
						<StatusBar barStyle="dark-content" />
						<RestaurantStack.Navigator initialRouteName="RestaurantList">
							<RestaurantStack.Screen name="RestaurantList"
							 component={RestaurantList}
							 options={{
								title: 'Restaurants',
							 ...sharedHeaderOptions}} />
							<RestaurantStack.Screen name="ApplicationDetail"
							component={ApplicationDetail}
							options={{
								// title: `${this.state?.selectedApplication?.firstname} ${this.state?.selectedApplication?.lastname}`,
								...sharedHeaderOptions
								}}/>
							<RestaurantStack.Screen name="ApplicationList"
							component={ApplicationSwiper}
							options={{
								// title: `${this.state?.selectedRestaurant?.label} Applicants`,
								...sharedHeaderOptions,
								gestureEnabled: false
							}}/>
						</RestaurantStack.Navigator>
				</NavigationContainer>
			</Provider>
  	);
	}
};

const sharedHeaderOptions : Partial<StackNavigationOptions>= {
	headerStyle: {
		backgroundColor: theme.palette.pineapple,
	},
	headerTintColor: '#fff',
	headerTitleStyle: {
		fontWeight: 'bold',
	}
}

export default App;
