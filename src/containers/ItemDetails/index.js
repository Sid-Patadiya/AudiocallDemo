import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ContentView from '../../components/ContentView';
import {Back} from '../../constants/assets';
import {moderateScale} from '../../helpers/ResponsiveFonts';
import colors from '../../constants/colors';
import styles from './styles';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemDetialsScreen = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState('');
  const [userdata, setUserData] = useState({});

  const [openMicrophone, setOpenMicrophone] = useState(true);
  const [enableSpeakerphone, setEnableSpeakerphone] = useState(false);
  const [connectingStatus, setConnectingStatus] = useState('Connecting');
  console.log('data!!!', userdata);

  useEffect(() => {
    if (route.params) {
      setData(route.params.data);
    }
    (async () => {
      const user = auth().onAuthStateChanged(userExist => {
        console.log(userExist);
        if (userExist) {
          setUserData(userExist);
        } else {
          setUserData('');
        }
      });
    })();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.userName}>{data.name}</Text>
          <Text style={styles.mutedText}>{connectingStatus}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            activeOpacity={0.4}
            // onPress={toggleSpeakerphone}
            style={styles.iconConatiner}>
            <FontAwesomeIcon
              name={enableSpeakerphone ? 'volume-up' : 'volume-off'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            // onPress={toggleMicrophone}
            style={styles.iconConatiner}>
            <FontAwesomeIcon
              name={openMicrophone ? 'microphone' : 'microphone-slash'}
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => navigation.pop()}
            style={styles.iconConatinerEnd}>
            <MaterialCommunityIcons
              name="phone-hangup"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemDetialsScreen;
