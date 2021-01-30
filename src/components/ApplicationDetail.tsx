import React, { useContext } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../../theme';
import MyContext from '../state/Context';

export const ApplicationDetail = ()=>  {
	const {selectedApplication} = useContext(MyContext);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
				{selectedApplication != null &&
					<>
						<Text>Application id: {selectedApplication.id}</Text>
					</>
				}
      </Text>
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
    textAlign: 'center',
  },
  annanasText: {color: theme.palette.pineapple},
  cucumberText: {color: theme.palette.cucumber},
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
});
