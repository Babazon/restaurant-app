import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {connect, ConnectedProps} from 'react-redux';
import theme from '../../theme';
import {Application} from '../state/Application.model';
import {loadRestaurants, RootState, SELECT_RESTAURANT} from '../state/Redux';
import {Restaurant} from '../state/Restaurant.model';
import applications from '../../dummyData/applications.json';

const mapState = (state: RootState) => ({
  restaurants: state.restaurants ?? [],
});

const mapDispatch = {
  loadRestaurants,
  selectRestaurant: (restaurant: Restaurant) => ({
    type: SELECT_RESTAURANT,
    restaurant,
  }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const RestaurantList = (props: PropsFromRedux) => {
  console.log(props);
  if (!props.restaurants?.length) {
    props.loadRestaurants(applications as Application[]);
  }
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(restaurant: {id: string}) => restaurant.id}
        renderItem={({item}: {item: Restaurant}) => (
          <TouchableOpacity
            onPress={() => {
              props.selectRestaurant(item);
              navigation.navigate('ApplicationList');
            }}
            style={styles.listItem}>
            <Text numberOfLines={1} style={styles.text}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        data={props.restaurants}
      />
    </View>
  );
};

export default connector(RestaurantList);

const styles = StyleSheet.create({
  annanasText: {
    color: theme.palette.pineapple,
    textAlign: 'center',
  },
  contentContainerStyle: {
    flex: 1,
  },
  cucumberText: {
    color: theme.palette.cucumber,
  },
  flatlist: {
    flex: 1,
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: theme.palette.pineapple,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 100,
    justifyContent: 'center',
    margin: 2,
    padding: 4,
  },
  myPineappleIsBiggerThanYours: {
    fontSize: 80,
  },
  text: {
    ...theme.typography.body,
    textAlign: 'center',
    color: 'white',
    alignSelf: 'center',
    fontSize: 50,
    marginHorizontal: 8,
  },
  wrapper: {
    alignItems: 'stretch',
    backgroundColor: theme.palette.cucumber,
    flex: 1,
    justifyContent: 'flex-start',
  },
});
