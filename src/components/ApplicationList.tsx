import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../theme';
import { Application } from '../state/Application.model';
import MyContext from '../state/Context';

export const ApplicationList = (props: {navigation: any})=>  {
	const {selectedRestaurant, selectApplication, toggleApplicationAsViewed} = useContext(MyContext);
  return (
    <View style={styles.wrapper}>
				{selectedRestaurant?.applications != null &&
					<FlatList
						keyExtractor={(restaurant: {id:string}) => restaurant.id}
						renderItem={({item}: {item:Application})=> (
						<TouchableOpacity
							style={{
								height: 50,
								backgroundColor: item.viewed ? 'gray': 'green',
								borderColor: 'gray',
								borderStyle: 'solid',
								borderWidth: StyleSheet.hairlineWidth,
								margin: 2,
								padding: 2
							}}
							onPress={()=>{
								selectApplication && selectApplication(item);
								toggleApplicationAsViewed && toggleApplicationAsViewed(item);
								props.navigation.navigate('ApplicationDetail');
							}}
						>
							<Text style={styles.text}>Application id {item.id}</Text>
						</TouchableOpacity>
						)}
						data={selectedRestaurant.applications}
					/>
				}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
		flex:1,
    padding: theme.spacing.base,
  },
  text: {
    ...theme.typography.body,
    textAlign: 'center',
  },
  annanasText: {color: theme.palette.pineapple},
  cucumberText: {color: theme.palette.cucumber},
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
});
