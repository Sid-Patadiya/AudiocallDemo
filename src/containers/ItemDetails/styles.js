import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {moderateScale, verticalScale} from '../../helpers/ResponsiveFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageView: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10),
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: colors.White,
    borderColor: colors.borderColor,
    shadowColor: colors.Black,
    shadowOffset: {width: 0, height: 1},
    alignItems: 'center',
  },
  sendView: {
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendicon: {
    height: moderateScale(25),
    width: moderateScale(25),
    top: -4,
    transform: [{rotate: '-45deg'}],
  },
  upcomingTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: colors.inputLabelColor,
    marginLeft: moderateScale(20),
    marginTop: moderateScale(20),
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
  contentView: {
    flex: 1,
    paddingBottom: 20,
    // marginHorizontal: moderateScale(20),
  },
  flatlistcontainer: {
    marginTop: verticalScale(15),
    borderRadius: 15,
    borderWidth: 1,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: colors.White,
    borderColor: colors.borderColor,
    shadowColor: colors.Black,
    shadowOffset: {width: 0, height: 1},
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: colors.purpal,
    fontFamily: fonts.Muli,
    paddingVertical: moderateScale(10),
  },
  categotry: {
    fontSize: moderateScale(15),
    fontWeight: '800',
    color: colors.purpal,
    fontFamily: fonts.Muli,
  },
  addresstxt: {
    fontSize: moderateScale(14),
    color: colors.inputLabelColor,
    // marginTop: 5,
    textAlign: 'center',
    lineHeight: 24,
  },
  profilebutton: {
    backgroundColor: colors.purpal,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(15),
  },
  addressicon: {
    height: moderateScale(15),
    width: moderateScale(15),
    marginRight: moderateScale(10),
  },
  chatbutton: {
    backgroundColor: colors.DarkYellow,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  profileimage: {
    tintColor: colors.White,
    height: moderateScale(20),
    width: moderateScale(20),
  },
});

export default styles;
