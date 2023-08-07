import React from 'react';
import {View, StatusBar, Image, TouchableOpacity, Text} from 'react-native';
import HeaderText from '../HeaderText';
import {backgroundImage} from '../../constants/assets';
import {verticalScale} from '../../helpers/ResponsiveFonts';
import styles from './styles';
import colors from '../../constants/colors';

const ContentViewComponent = props => {
  const {
    visible,
    headerText,
    iconVisible,
    onLeftIconPress,
    onRightIconPress,
    top,
    leftIcon,
    rightIcon,
    rating,
  } = props;
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
        showHideTransition="fade"
        hidden={false}
        translucent
      />
      {visible ? (
        <View style={styles.container}>
          <View
            style={{marginTop: top ? verticalScale(top) : verticalScale(50)}}>
            {iconVisible ? (
              <View style={styles.headerWithBack}>
                <View style={styles.iconWithHeader}>
                  <TouchableOpacity
                    onPress={onLeftIconPress}
                    style={styles.backButton}>
                    <Image
                      source={leftIcon}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={styles.header}>{headerText}</Text>
                </View>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onRightIconPress}>
                  {rightIcon && (
                    <View>
                      <Image
                        source={rightIcon}
                        style={[
                          styles.icon,
                          {tintColor: rating ? undefined : colors.White},
                        ]}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <HeaderText headerText={headerText} />
            )}
          </View>
          <View
            style={[
              styles.childContainer,
              {marginTop: top ? verticalScale(top) : verticalScale(10)},
            ]}>
            <Image
              source={backgroundImage}
              resizeMode="contain"
              style={styles.imageBackground}
            />
            {props.children}
          </View>
        </View>
      ) : (
        <View style={styles.childContainer}>
          <Image
            source={backgroundImage}
            resizeMode="contain"
            style={styles.imageBackground}
          />
          {props.children}
        </View>
      )}
    </>
  );
};

export default ContentViewComponent;
