import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../containers/Auth/SignIn';
// import BottomTabNavigator from './tabNavigator';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemDetialsScreen from '../containers/ItemDetails';
import DeshbordScreen from '../containers/Deshbord';
import SignUpScreen from '../containers/Auth/SignUp';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const AuthNavigator = props => {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  React.useEffect(() => {
    const user = auth().onAuthStateChanged(userExist => {
      console.log(userExist);
      if (userExist) {
        setInitialRouteName(userExist);
      } else {
        setInitialRouteName('');
      }
    });

    return () => {
      user();
    };
  }, []);

  const HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'DeshbordScreen'}
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        /> */}
        {/* <Stack.Screen name="ItemDetialsScreen" component={ItemDetialsScreen} />
         */}
        <Stack.Screen name="DeshbordScreen" component={DeshbordScreen} />
        <Stack.Screen name="ItemDetialsScreen" component={ItemDetialsScreen} />
      </Stack.Navigator>
    );
  };

  const LoginStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'SignInScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="DeshbordScreen" component={DeshbordScreen} />
      </Stack.Navigator>
    );
  };

  return (
    // initialRouteName && (
    <Stack.Navigator
      initialRouteName={'LoginStack'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {initialRouteName ? (
        <Stack.Screen name={'HomeStack'} component={HomeStack} />
      ) : (
        <Stack.Screen name={'LoginStack'} component={LoginStack} />
      )}
    </Stack.Navigator>
  );
  // );
};

export default AuthNavigator;
