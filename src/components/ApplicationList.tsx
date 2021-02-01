import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import theme from '../../theme';
import {Application} from '../state/Application.model';
import {RootState, selectApplication} from '../state/Redux';

const mapState = (state: RootState): {applications: Application[]} => ({
  applications: state?.selectedRestaurant?.applications ?? [],
});

const mapDispatch = {
  selectApplication,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ApplicationList = (props: PropsFromRedux) => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      {!!props.applications?.length && (
        <FlatList
          keyExtractor={(restaurant: {id: string}) => restaurant.id}
          renderItem={({item}: {item: Application}) => (
            <TouchableOpacity
              style={StyleSheet.flatten([styles.listItem])}
              onPress={() => {
                props.selectApplication(item);
                navigation.navigate('ApplicationDetail');
              }}>
              <>
                <Text
                  style={StyleSheet.flatten([
                    styles.text,
                    {flex: 4},
                  ])}>{`${item.firstname} ${item.lastname}`}</Text>
                <Text style={styles.chevron}>{'>'}</Text>
              </>
            </TouchableOpacity>
          )}
          data={props.applications}
        />
      )}
      {!props.applications.length && (
        <View>
          <Text>No applications.. </Text>
        </View>
      )}
    </View>
  );
};

export default connector(ApplicationList);

const styles = StyleSheet.create({
  annanasText: {
    color: theme.palette.pineapple,
  },
  chevron: {
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 50,
    flex: 1,
  },
  cucumberText: {
    color: theme.palette.cucumber,
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
    padding: 4,
  },
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
  text: {
    ...theme.typography.body,
    textAlign: 'left',
  },
  wrapper: {
    backgroundColor: theme.palette.cucumber,
    flex: 1,
  },
});
