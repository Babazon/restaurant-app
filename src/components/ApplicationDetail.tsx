import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import theme from '../../theme';
import {RootState} from '../state/Redux';

const mapState = (state: RootState) => ({
  selectedApplication: state?.selectedApplication,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ApplicationDetail = (props: PropsFromRedux) => {
  return (
    <View style={styles.wrapper}>
      {props.selectedApplication != null && (
        <Text style={styles.text}>
          Application id: {props.selectedApplication.id}
        </Text>
      )}
    </View>
  );
};

export default connector(ApplicationDetail);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.palette.cucumber,
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
