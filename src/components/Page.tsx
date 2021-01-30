import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export default function Page({children}: {children: ReactNode}) {
  return (
		<SafeAreaView style={styles.wrapper}>
			<View style={{flex: 1}}>{children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  wrapper: {
		flex: 1,
		flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
