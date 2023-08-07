import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import ContentView from '../../../components/ContentView';
import TextInputWithLabel from '../../../components/TextInputWithLabel';
import ButtonComponent from '../../../components/Button';
import {message, eye_off, eye_on} from '../../../constants/assets';
import Regex from '../../../helpers/Regex';
import {moderateScale} from '../../../helpers/ResponsiveFonts';
import colors from '../../../constants/colors';
import styles from './styles';
import Loader from '../../../helpers/loader';
import ErrorComponent from '../../../components/Error';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';

export default function SignUpScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [loader, saetLoader] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    requestUserPermission();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    }
  }

  const getToken = async () => {
    // let checkToken = await AsyncStorage.getItem('fcmToken');
    // console.log('checkToken=======', checkToken);
    // if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('fcm Token generated::::', fcmToken);
      if (fcmToken) {
        console.log('fcm Token Generated:::', fcmToken);
        setFcmToken(fcmToken);
        // await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('error in fcmToken', error);
      Alert.alert(error?.message);
    }
    // }
  };

  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPass: false,
    phoneNumber: false,
  });

  const SignUpfucation = async () => {
    saetLoader(true);

    if (
      Regex.validateEmail(email) &&
      Regex.validatePassword(password) &&
      password == confirmPass &&
      Regex.validateString(name) &&
      Regex.validateMobile(phoneNumber)
    ) {
      const editErrorState = {...error};
      editErrorState.email = false;
      editErrorState.password = false;
      editErrorState.name = false;
      editErrorState.confirmPass = false;
      editErrorState.phoneNumber = false;

      setError(editErrorState);

      try {
        const result = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        firestore().collection('users').doc(result.user.uid).set({
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          uid: result.user.uid,
          fcmToken: fcmToken,
        });
        Alert.alert('Account Create SuccessFully');
        // navigation.pop();
        saetLoader(false);
      } catch (error) {
        Alert.alert('Somthing Went Wrong');
        console.log(error);
        saetLoader(false);
      }
      // Alert.alert('Login SuccessFully');
      // navigation.navigate('DeshbordScreen');
    } else {
      const editErrorState = {...error};
      if (!Regex.validateEmail(email)) {
        editErrorState.email = true;
      } else {
        editErrorState.email = false;
      }

      if (!Regex.validatePassword(password)) {
        editErrorState.password = true;
      } else {
        editErrorState.password = false;
      }

      if (!Regex.validateString(name)) {
        editErrorState.name = true;
      } else {
        editErrorState.name = false;
      }

      if (password !== confirmPass) {
        editErrorState.confirmPass = true;
      } else {
        editErrorState.confirmPass = false;
      }

      if (!Regex.validateMobile(phoneNumber)) {
        editErrorState.phoneNumber = true;
      } else {
        editErrorState.phoneNumber = false;
      }

      setError(editErrorState);
      saetLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <ContentView headerText={'Dashboard'}>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              marginTop: moderateScale(100),
              marginHorizontal: moderateScale(20),
            }}>
            <Text style={styles.headerText}>Create a New Account</Text>
          </View>
          <View style={styles.contentView}>
            <TextInputWithLabel
              icon={message}
              iconPress={true}
              inputPlaceholder={'Please enter your name'}
              inputValue={name}
              label={'Name'}
              onTextInputChange={text => setName(text)}
              inputMaxLength={50}
              keyboardType="default"
            />
            {error.password && (
              <ErrorComponent
                right={'left'}
                errorMessage={'Enter valid Name'}
              />
            )}
            <TextInputWithLabel
              icon={message}
              iconPress={true}
              inputPlaceholder={'Please enter Email'}
              inputValue={email}
              label={'Email Address'}
              onTextInputChange={text => setEmail(text.trim())}
              inputMaxLength={50}
              keyboardType={'email-address'}
            />
            {error.email && (
              <ErrorComponent
                right={'left'}
                errorMessage={'Enter valid email'}
              />
            )}
            <TextInputWithLabel
              icon={message}
              iconPress={true}
              inputPlaceholder={'Please enter Phone number'}
              inputValue={phoneNumber}
              label={'Phone Number'}
              onTextInputChange={text => setPhoneNumber(text)}
              inputMaxLength={10}
              keyboardType={'email-address'}
            />
            {error.phoneNumber && (
              <ErrorComponent
                right={'left'}
                errorMessage={'Enter valid Phone number'}
              />
            )}
            <TextInputWithLabel
              icon={showPassword ? eye_on : eye_off}
              inputPlaceholder={'Please enter password'}
              inputValue={password}
              label={'Password'}
              onButtonPress={() => setShowPassword(!showPassword)}
              onTextInputChange={text => setPassword(text)}
              showPassword={showPassword}
              inputMaxLength={10}
              type="password"
            />
            {error.password && (
              <ErrorComponent
                right={'left'}
                errorMessage={
                  'Please enter valid pasword. Password should be Xyz@1234'
                }
              />
            )}
            <TextInputWithLabel
              icon={showConPassword ? eye_on : eye_off}
              inputPlaceholder={'Please enter Confirm password'}
              inputValue={confirmPass}
              label={'Confirm Password'}
              onButtonPress={() => setShowConPassword(!showConPassword)}
              onTextInputChange={text => setConfirmPass(text)}
              showPassword={showConPassword}
              inputMaxLength={10}
              type="password"
            />
            {error.confirmPass && (
              <ErrorComponent
                right={'left'}
                errorMessage={'Password Does not match'}
              />
            )}
            <View style={styles.buttonView}>
              <ButtonComponent
                onButtonPress={() => SignUpfucation()}
                buttonText={'SignUp'}
                buttonDisable={
                  password !== '' &&
                  email !== '' &&
                  confirmPass !== '' &&
                  name !== ''
                    ? false
                    : true
                }
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={[styles.signUp, {color: colors.inputLabelColor}]}>
                {'Do You have an account?'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.pop();
                }}>
                <Text style={[styles.signUp, {color: colors.purpal}]}>
                  {' Sign In'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ContentView>
      <Loader value={loader} />
    </View>
  );
}
