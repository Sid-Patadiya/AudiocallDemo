import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {
  verticalScale,
  moderateScale,
  heightScale,
  widthScale,
} from '../../helpers/ResponsiveFonts';
import {scale} from '../../helpers/ResponsiveFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Blue,
  },
  safeArea: {
    flex: 0,
    backgroundColor: colors.ThemeColor,
  },
  childContainer: {
    flex: 1,
    backgroundColor: colors.White,
    // justifyContent: 'flex-end',
  },
  header: {
    color: colors.White,
    fontSize: moderateScale(22),
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: fonts.Muli,
    lineHeight: 40,
    letterSpacing: 0.02,
    // paddingLeft: moderateScale(80.11),
    position: 'absolute',
    alignSelf: 'center',
  },
  header1: {
    color: colors.White,
    fontSize: moderateScale(18),
    textAlign: 'center',
    fontFamily: fonts.Muli,
    letterSpacing: 0.02,
    paddingHorizontal: moderateScale(5),
  },
  headerWithBack: {
    marginHorizontal: moderateScale(13.02),
    justifyContent: 'center',
  },
  backButton: {
    paddingVertical: 10,
    paddingRight: 20,
  },
  iconContainer: {
    // width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  iconWithHeader: {
    // width: '85%',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: "space-evenly",
  },
  icon: {
    height: moderateScale(20),
    width: moderateScale(20),
    tintColor: colors.White,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginHorizontal: scale(5),
  },
  headerText1: {
    fontSize: moderateScale(22),
    color: colors.White,
    fontWeight: '600',
    marginLeft: scale(5),
  },
  drawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  isHeaderTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: colors.White,
    marginLeft: scale(10),
  },
  simpleHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(10),
  },
  notificationview: {
    backgroundColor: colors.Red,
    height: moderateScale(15),
    width: moderateScale(15),
    borderRadius: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: moderateScale(10),
    color: colors.White,
  },
  imageBackground: {
    bottom: moderateScale(-5),
    position: 'absolute',
    height: heightScale / 5,
    width: widthScale,
  },
});

export default styles;
