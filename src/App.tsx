import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { ApplicationDetail } from './components/ApplicationDetail';
import { ApplicationList } from './components/ApplicationList';
import { RestaurantList } from './components/RestaurantList';
import MyContext, { IAppState, initialAppState } from './state/Context';
import dummyData from '../dummyData/applications.json';
import { Restaurant } from './state/Restaurant.model';
import { Application } from './state/Application.model';
import { reduceApplicationsIntoRestaurants } from './util/reduceApplicationsIntoRestaurants';
import theme from '../theme';
import Page from './components/Page';
import { ApplicationSwiper } from './components/ApplicationSwiper';


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

class App extends React.Component<{}, Partial<IAppState>> {
	state = initialAppState;

	render(){
		return (
			<MyContext.Provider
				value={{
					...this.state,
					selectApplication: (selectedApplication?: Application)=>this.setState({selectedApplication}),
					selectRestaurant: (selectedRestaurant?: Restaurant)=>	this.setState({selectedRestaurant}),
					loadRestaurants: () => 	this.setState({restaurants: reduceApplicationsIntoRestaurants(dummyData as Application[])}),
					toggleApplicationAsViewed: (application: Application) => application.viewed = true,
				}}
			>
				<NavigationContainer>
						<StatusBar barStyle="dark-content" />
						<RestaurantStack.Navigator initialRouteName="RestaurantList">
							<RestaurantStack.Screen name="RestaurantList"
							 component={RestaurantList}
							 options={{
								title: 'Restaurants',
							 	headerStyle: {
           			 backgroundColor: theme.palette.pineapple,
        			  },
								headerTintColor: '#fff',
								headerTitleStyle: {
          			  fontWeight: 'bold',
         			 }}} />
							<RestaurantStack.Screen name="ApplicationDetail"
							component={ApplicationDetail}
							options={{
								title: `${this.state?.selectedApplication?.firstname} ${this.state?.selectedApplication?.lastname}`,
								headerStyle: {
           			 backgroundColor: theme.palette.pineapple,
        			  },
								headerTintColor: '#fff',
								headerTitleStyle: {
          			  fontWeight: 'bold',
         			 }
								}}/>
							<RestaurantStack.Screen name="ApplicationList"
							component={ApplicationSwiper}
							options={{
								title: this.state?.selectedRestaurant?.label,
								headerStyle: {
           			 backgroundColor: theme.palette.pineapple,
        			  },
								headerTintColor: '#fff',
								headerTitleStyle: {
          			  fontWeight: 'bold',
								},
								gestureEnabled: false
							}}/>
						</RestaurantStack.Navigator>
				</NavigationContainer>
			</MyContext.Provider>
  	);
	}
};

export default App;
