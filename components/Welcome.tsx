import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import theme from '../theme';

export default function Welcome() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>
        Welcome to the <Text style={styles.annanasText}>mobile</Text>{' '}
        <Text style={styles.cucumberText}>challenge!</Text>{' '}
        <Text style={styles.myPineappleIsBiggerThanYours}>🍍</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
