import React from 'react';
import {Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {moderateScale} from '../../helpers/ResponsiveFonts';

const HeaderTextComponent = props => {
  const {headerText} = props;
  return <Text style={styles.header}>{headerText}</Text>;
};

export default HeaderTextComponent;

const styles = StyleSheet.create({
  header: {
    color: colors.White,
    fontSize: moderateScale(22),
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: fonts.Muli,
    lineHeight: 40,
    letterSpacing: 0.02,
  },
});
