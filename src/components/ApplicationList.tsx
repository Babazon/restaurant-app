import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../theme';
import { Application } from '../state/Application.model';
import MyContext from '../state/Context';

export const ApplicationList = ()=>  {
	const {selectedRestaurant, selectApplication, toggleApplicationAsViewed} = useContext(MyContext);
	const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
				{selectedRestaurant?.applications != null &&
					<FlatList
						keyExtractor={(restaurant: {id:string}) => restaurant.id}
						renderItem={({item}: {item:Application})=> (
						<TouchableOpacity
							style={{
								height: 100,
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: item.viewed ? 'lightgray': 'green',
								borderColor: 'gray',
								borderStyle: 'solid',
								borderWidth: StyleSheet.hairlineWidth,
								margin: 2,
								padding: 4,
								flexWrap: 'nowrap',
							}}
							onPress={()=>{
								selectApplication && selectApplication(item);
								toggleApplicationAsViewed && toggleApplicationAsViewed(item);
								navigation.navigate('ApplicationDetail');
							}}
						>
							<>
							<Text style={StyleSheet.flatten([styles.text, {flex: 4}])}>{`${item.firstname} ${item.lastname}`}</Text>
							<Text style={{fontWeight: 'bold', textAlign: 'right', fontSize: 50, flex: 1}}>{'>'}</Text>
							</>
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
		backgroundColor: theme.palette.cucumber
  },
  text: {
    ...theme.typography.body,
    textAlign: 'left',
  },
  annanasText: {color: theme.palette.pineapple},
  cucumberText: {color: theme.palette.cucumber},
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
});
