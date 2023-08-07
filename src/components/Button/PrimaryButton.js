import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {moderateScale} from '../../helpers/ResponsiveFonts';

const PrimaryButton = props => {
  const {buttonText, onPress, buttonDisable} = props;
  return (
    <TouchableOpacity
      style={styles.buttonView}
      onPress={onPress}
      disabled={buttonDisable}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: colors.White,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.purpal,
  },
  buttonText: {
    color: colors.purpal,
    fontFamily: fonts.Muli,
    fontSize: moderateScale(22),
    fontWeight: '500',
    // lineHeight: 18,
    paddingVertical: moderateScale(10.5),
    textAlign: 'center',
  },
});
