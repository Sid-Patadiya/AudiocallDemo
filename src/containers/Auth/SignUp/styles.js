import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import fonts from '../../../constants/fonts';
import {moderateScale, verticalScale} from '../../../helpers/ResponsiveFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    marginHorizontal: moderateScale(20),
    marginTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    // backgroundColor: 'red',
  },
  forgotPassword: {
    color: colors.purpal,
    fontFamily: fonts.Muli,
    fontSize: moderateScale(16),
    fontWeight: '400',
    letterSpacing: 0.05,
    lineHeight: 19,
    paddingTop: moderateScale(10),
    textAlign: 'right',
  },
  headerText: {
    color: colors.inputLabelColor,
    fontFamily: fonts.Muli,
    fontSize: moderateScale(25),
    fontWeight: '500',
    letterSpacing: 0.05,
    lineHeight: 30,
    // paddingTop: moderateScale(10),
  },
  buttonView: {
    flex: 1,
    marginTop: moderateScale(30),
    marginHorizontal: '30%',
    justifyContent: 'center',
  },
  signUp: {
    fontFamily: fonts.Muli,
    fontSize: moderateScale(15),
    fontWeight: '400',
    letterSpacing: 0.03,
    lineHeight: 14,
    paddingTop: moderateScale(32.34),
    textAlign: 'center',
  },
  socialButtonView: {
    flexDirection: 'row',
    marginTop: verticalScale(16.17),
    alignSelf: 'center',
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: colors.White,
    borderColor: '#e8e8e8',
    borderRadius: 19,
    borderWidth: 1,
    elevation: 5,
    height: moderateScale(38),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2.5},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    width: moderateScale(38),
  },
  account: {
    marginTop: verticalScale(157),
    marginBottom: moderateScale(17),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  register: {
    color: colors.inputLabelColor,
    fontFamily: fonts.Muli,
    fontSize: moderateScale(14),
    lineHeight: 17,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    color: colors.inputLabelColor,
    fontSize: moderateScale(16),
    fontWeight: '400',
    fontFamily: fonts.Muli,
    textAlign: 'center',
  },
});

export default styles;
