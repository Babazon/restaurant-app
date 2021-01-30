import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../theme';
import MyContext from '../state/Context';
import { Restaurant } from '../state/Restaurant.model';


export const RestaurantList = () => {
	const {restaurants, loadRestaurants, selectRestaurant} = useContext(MyContext);
	if (!restaurants?.length && loadRestaurants) loadRestaurants();
	const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
				<FlatList
					style={{flex: 1 }}
					contentContainerStyle={{flex:1}}
					keyExtractor={(restaurant: {id:string}) => restaurant.id}
					renderItem={({item}: {item: Restaurant})=> (
							<TouchableOpacity
								onPress={()=>{
									selectRestaurant!(item);
									navigation.navigate('ApplicationList');
								}}
								style={styles.listItem}>
								<Text numberOfLines={1} style={styles.text}>{item.label}</Text>
							</TouchableOpacity>
						)}
					data={restaurants}
				/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
		flex:1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: theme.palette.cucumber
  },
  text: {
    ...theme.typography.body,
		textAlign: 'center',
		color: 'white',
		alignSelf: 'center',
		fontSize: 50,
		marginHorizontal: 8
  },
  annanasText: {color: theme.palette.pineapple, textAlign: 'center'},
  cucumberText: {color: theme.palette.cucumber},
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
	},
	listItem: {
		height: 100,
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.palette.pineapple,
		borderColor: 'gray',
		borderStyle: 'solid',
		borderWidth: StyleSheet.hairlineWidth,
		margin: 2,
		padding: 4
	}
});
