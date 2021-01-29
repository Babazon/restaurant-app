import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Header from './components/Header';
import Page from './components/Page';
import Welcome from './components/Welcome';
import { createStackNavigator } from '@react-navigation/stack';
import Detail from './components/Detail';


const RestaurantStack = createStackNavigator();


const App: () => JSX.Element = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Page>
				<RestaurantStack.Navigator initialRouteName="Home">
        	<RestaurantStack.Screen name="Home" component={Welcome} />
					<RestaurantStack.Screen name="Detail" component={Detail} />
      	</RestaurantStack.Navigator>
      </Page>
		</NavigationContainer>
  );
};

export default App;
