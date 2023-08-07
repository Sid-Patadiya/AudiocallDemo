import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import {moderateScale, verticalScale} from '../../helpers/ResponsiveFonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.purpal,
    fontFamily: fonts.Muli,
  },
  addresstxt: {
    fontSize: moderateScale(14),
    color: colors.inputLabelColor,
    marginTop: 5,
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
  AddButton: {
    backgroundColor: colors.Blue,
    height: moderateScale(50),
    width: moderateScale(50),
    position: 'absolute',
    right: moderateScale(30),
    bottom: moderateScale(30),
    borderRadius: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    marginTop: moderateScale(30),
    marginHorizontal: '30%',
    justifyContent: 'center',
  },

  //

  container: {
    flex: 1,
    backgroundColor: '#14171F',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 100,
  },
  mutedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b6b6b',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 36,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  iconConatiner: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconConatinerEnd: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputView: {
    borderRadius: 8,
    borderWidth: moderateScale(0.4),
    borderColor: colors.borderColor,
    // height: hp(6),
    marginBottom: moderateScale(2),
    margin: moderateScale(2),
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 1,
        height: 4,
    },
    shadowOpacity: 0.20,
    shadowRadius: 10.65,

    elevation: 10,
    borderRadius: moderateScale(2)
},
});

export default styles;
