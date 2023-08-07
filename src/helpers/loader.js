import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const Loader = Props => {
  return Props.value === true ? (
    <View style={styles.Container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  Container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: 'transparent',
  },
});
export default Loader;
