import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export default function Page({children}: {children: ReactNode}) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.fullPage}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullPage: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
