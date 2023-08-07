import React from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import {moderateScale, verticalScale} from '../../helpers/ResponsiveFonts';
import styles from './styles';

const TextInputWithLabelComponent = props => {
  const {
    label,
    inputPlaceholder,
    icon,
    iconPress,
    showPassword,
    type,
    inputValue,
    onButtonPress,
    onTextInputChange,
    leftIcon,
    inputMaxLength,
    keyboardType,
    editable,
    inputRef,
    onInputFocus,
    onInputBlur,
    required,
    top,
    rightIcon,
    onClose,
    iconOnpress,
  } = props;
  return (
    <View style={{marginTop: top ? verticalScale(top) : verticalScale(20)}}>
      {label && (
        <Text style={styles.inputLabel}>
          {label}{' '}
          {required && (
            <Text
              style={{
                color: colors.Red,
                fontSize: moderateScale(20),
              }}>
              *
            </Text>
          )}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {leftIcon ? (
          <>
            <TouchableOpacity
              onPress={iconOnpress}
              disabled={iconPress ? iconPress : false}
              style={styles.iconView}>
              <Image
                source={leftIcon}
                style={styles.leftIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={{width: rightIcon ? '70%' : '85%'}}>
              <TextInput
                ref={inputRef}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                placeholder={inputPlaceholder}
                placeholderTextColor={colors.Gray}
                style={
                  inputValue !== ''
                    ? [styles.inputIcon, styles.input]
                    : [
                        styles.inputIcon,
                        styles.inputLabel,
                        {fontSize: moderateScale(15)},
                      ]
                }
                value={inputValue}
                onChangeText={onTextInputChange}
                keyboardType={type}
                maxLength={inputMaxLength}
                editable={editable}
              />
            </View>
            {rightIcon && (
              <TouchableOpacity
                onPress={onClose}
                style={[styles.iconView, {paddingRight: 0}]}>
                <Image
                  source={rightIcon}
                  style={styles.leftIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <View style={icon ? styles.inputView : {width: '95%'}}>
              <TextInput
                secureTextEntry={type ? (showPassword ? false : true) : false}
                placeholder={inputPlaceholder}
                editable={!editable ? editable : true}
                placeholderTextColor={colors.Gray}
                style={
                  inputValue !== ''
                    ? [styles.inputValuePosition, styles.input]
                    : [
                        styles.inputValuePosition,
                        styles.inputLabel,
                        {fontSize: moderateScale(15)},
                      ]
                }
                value={inputValue}
                onChangeText={onTextInputChange}
                maxLength={inputMaxLength}
                keyboardType={keyboardType}
              />
            </View>
            {icon && (
              <TouchableOpacity
                onPress={onButtonPress}
                disabled={iconPress ? iconPress : false}
                style={styles.iconView}>
                <Image source={icon} style={styles.icon} resizeMode="contain" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default TextInputWithLabelComponent;
