import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import theme from '../../theme';
import {RootState} from '../state/Redux';
import {getAvatarEmoji} from '../util/getAvatarEmoji';

const mapState = (state: RootState) => ({
  selectedApplication: state?.selectedApplication,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

const ApplicationDetail = (props: PropsFromRedux) => {
  if (!props.selectedApplication) {
    return <></>;
  }
  return (
    <ScrollView style={styles.wrapper} contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.avatarStyle}>{getAvatarEmoji()}</Text>
      </View>
      <View>
        <Text
          style={
            styles.header
          }>{`${props.selectedApplication.firstname} ${props.selectedApplication.lastname}`}</Text>
      </View>
      <View>
        <Text style={styles.header}> </Text>
      </View>
      {/*
          Wrapper with margin and padding
          Avatar on top
          Title/Applied positions
          Other information and details (contact info)(Communications enable)
          map answers
          Use collapsible where possible
      */}
    </ScrollView>
  );
};

export default connector(ApplicationDetail);

const styles = StyleSheet.create({
  avatarStyle: {
    fontSize: 250,
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
    margin: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
