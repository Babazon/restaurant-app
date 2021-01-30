import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import theme from '../../theme';
import MyContext from '../state/Context';
import { Restaurant } from '../state/Restaurant.model';


export const RestaurantList = (props: {navigation: any}) => {
	const {restaurants, loadRestaurants, selectRestaurant} = useContext(MyContext);
	if (!restaurants?.length && loadRestaurants) loadRestaurants();

  return (
    <View style={styles.wrapper}>
				<FlatList
					style={{flex: 1 }}
					contentContainerStyle={{flex:1}}
					keyExtractor={(restaurant: {id:string}) => restaurant.id}
					renderItem={({item}: {item: Restaurant})=> (
							<TouchableHighlight
								onPress={()=>{
									selectRestaurant!(item);
									props.navigation.navigate('ApplicationList');
								}}
								style={{
									backgroundColor: 'whitesmoke',
									borderColor: 'gray',
									borderStyle: 'solid',
									borderWidth: StyleSheet.hairlineWidth,
									margin: 2,
									padding: 2
								}}>
								<Text style={styles.text}>Restaurant: {item.label}</Text>
							</TouchableHighlight>
						)}
					data={restaurants}
				/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
		flex:1,
		padding: theme.spacing.base,
		justifyContent: 'flex-start',
		alignItems: 'stretch'
  },
  text: {
    ...theme.typography.body,
		textAlign: 'center',
		color: 'red'
  },
  annanasText: {color: theme.palette.pineapple, textAlign: 'center'},
  cucumberText: {color: theme.palette.cucumber},
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
});
