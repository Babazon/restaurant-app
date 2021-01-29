import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Annanas from '../assets/images/lets-go.png';
import theme from '../theme';

export default function Header() {
  return (
    <View style={styles.wrapper}>
      <Image source={Annanas} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.spacing.base,
    alignItems: 'center',
  },
});
