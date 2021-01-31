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
				{!!selectedRestaurant?.applications?.length &&
					<FlatList
						keyExtractor={(restaurant: {id:string}) => restaurant.id}
						renderItem={({item}: {item:Application})=> (
						<TouchableOpacity
							style={StyleSheet.flatten([styles.listItem, {	backgroundColor: item.viewed ? 'lightgray': 'green',}])}
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
				{!selectedRestaurant?.applications.length &&
					<View>
						<Text>No applications.. </Text>
					</View>
				}
    </View>
  );
}

const styles = StyleSheet.create({
  annanasText: {
    color: theme.palette.pineapple
  },
  cucumberText: {
    color: theme.palette.cucumber
	},
  listItem: {
    alignItems: 'center',
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 100,
    justifyContent: 'space-between',
    margin: 2,
    padding: 4
  },
  myPineappleIsBiggerThanYours: {
    fontSize: 80
	},
	text: {
    ...theme.typography.body,
    textAlign: 'left',
  },
  wrapper: {
    backgroundColor: theme.palette.cucumber,
    flex: 1
  }
});
