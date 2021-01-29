import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export default function Page({children}: {children: ReactNode}) {
  return <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
