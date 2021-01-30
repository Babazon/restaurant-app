import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
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
								style={{
									height: 100,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									backgroundColor: 'whitesmoke',
									borderColor: 'gray',
									borderStyle: 'solid',
									borderWidth: StyleSheet.hairlineWidth,
									margin: 2,
									padding: 4
								}}>
									<>
								<Text style={styles.text}>Restaurant: {item.label}</Text>
								<Text style={{fontWeight: 'bold', textAlign: 'right', fontSize: 50}}>{'>'}</Text>
								</>
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
		textAlign: 'left',
		color: 'red'
  },
  annanasText: {color: theme.palette.pineapple, textAlign: 'center'},
  cucumberText: {color: theme.palette.cucumber},
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
});
