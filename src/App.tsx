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



/*
0. Get data from json/api.
1. Reduce applications into a list of restaurants (with applications/applicants)
2. Select restaurant from list and navigate to it , render applications
3. Select, unselect application
4. Select application to view details
*/

const RestaurantStack = createStackNavigator();

class App extends React.Component<{}, Partial<IAppState>> {
	state = initialAppState;

	render(){
		return (
			<MyContext.Provider
				value={{
					...this.state,
					selectApplication: (selectedApplication?: Application)=>{
						this.setState({selectedApplication})
					},
					selectRestaurant: (selectedRestaurant?: Restaurant)=>{
						this.setState({selectedRestaurant})
					},
					loadRestaurants: () => {
						this.setState({restaurants: reduceApplicationsIntoRestaurants(dummyData as Application[])})
					},
					toggleApplicationAsViewed: (application: Application) => {
						application.viewed = true;
					}
				}}
			>
				<NavigationContainer>
						<StatusBar barStyle="dark-content" />
						<RestaurantStack.Navigator initialRouteName="RestaurantList">
							<RestaurantStack.Screen name="RestaurantList" component={RestaurantList} options={{ title: 'Restaurants' }} />
							<RestaurantStack.Screen name="ApplicationDetail" component={ApplicationDetail} options={{title: `${this.state?.selectedApplication?.firstname} ${this.state?.selectedApplication?.lastname}`}}/>
							<RestaurantStack.Screen name="ApplicationList" component={ApplicationList} options={{title: this.state?.selectedRestaurant?.label}}/>
						</RestaurantStack.Navigator>
				</NavigationContainer>
			</MyContext.Provider>
  	);
	}

};

export default App;
