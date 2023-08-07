import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {moderateScale} from '../../helpers/ResponsiveFonts';

const ErrorComponent = props => {
  const {errorMessage, right, top} = props;
  const topSpace = top ? moderateScale(top) : moderateScale(5);
  return (
    <Text
      style={[
        styles.errorText,
        {textAlign: right ? right : 'left', paddingTop: topSpace},
      ]}>
      {errorMessage}
    </Text>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({
  errorText: {
    color: colors.Red,
    fontFamily: fonts.Muli,
    fontSize: moderateScale(14),
    fontWeight: '400',
    letterSpacing: 0.03,
    lineHeight: 17,
  },
});
