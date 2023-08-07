import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Keyboard,
  Button,
} from 'react-native';
import ContentView from '../../components/ContentView';
import {search_white_icon, message, expert_icon} from '../../constants/assets';
import {moderateScale} from '../../helpers/ResponsiveFonts';
import colors from '../../constants/colors';
import styles from './styles';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import auth from '@react-native-firebase/auth';
import Loader from '../../helpers/loader';
import firestore from '@react-native-firebase/firestore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RtcEngine, {AgoraView} from 'react-native-agora';
import AgoraUIKit from 'agora-rn-uikit';
import RNCallKeep from 'react-native-callkeep';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {MultiSelect} from 'react-native-element-dropdown';

const SERVER_KEY =
  'AAAAXKe1q3w:APA91bFm5ELK-00fcg1aUUKudnuX2erlVsk1VV4_QXLDM8uyEq_n9HgXI5BWJm1x3tB7BZr5gmFziXUN_cGHnnqlP1BO_F7vNXaTC2Qx2lUiWkVq4X0Xkr-PGYdiAdUa3w54kMNiSeOQ';
const RECEIVER_DEVICE_TOKEN = 'DEVICE_TOKEN_OF_RECEIVING_DEVICE';

export default function DeshbordScreen({navigation, route}) {
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [openMicrophone, setOpenMicrophone] = useState(true);
  const [enableSpeakerphone, setEnableSpeakerphone] = useState(false);
  const [connectingStatus, setConnectingStatus] = useState('Connecting');

  const [appId, setAppId] = useState('763c63be5d414d66a0fc78bdf3f6a3e2');

  const [joinSucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [userdata, setUserData] = useState({});
  console.log('userdata~~', userdata);
  const [userName, setUserName] = useState({});
  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: '763c63be5d414d66a0fc78bdf3f6a3e2',
    channel: userName.userId,
  };

  const rtcEngine = new RtcEngine();
  let engine = useRef(null);

  const logout = () => {
    auth().signOut();
    AsyncStorage.clear();
  };

  useEffect(() => {
    setLoader(true);
    (async () => {
      await requestCameraAndAudioPermission();
      await initEngine();
      await auth().onAuthStateChanged(async userExist => {
        if (userExist) {
          setUserData(userExist);

          const querySnap = await firestore()
            .collection('users')
            .where('uid', '!=', userExist.uid)
            .get();

          const allUsers = querySnap.docs.map(docSnap => docSnap.data());
          setLoader(false);

          setGroupData(allUsers);

          const querySnap1 = await firestore()
            .collection('users')
            .where('uid', '==', userExist.uid)
            .get();

          console.log(querySnap1);
          const allUsers1 = querySnap1.docs.map(docSnap => docSnap.data());

          setUserData(allUsers1[0]);
        } else {
          setUserData('');
        }
      });
    })();
  }, []);

  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', async () => {
      let call_data = await AsyncStorage.getItem('call_data');
      await AsyncStorage.setItem('call_picked', '1');
      call_data = JSON.parse(call_data);
      console.log('call_data~~~~', call_data);
      if (call_data.callType === 'VIDEO_CALL') {
        setVideoCall(true);
        setUserName(call_data);
      } else {
        setShowModal(true);
        await engine.current.joinChannel(null, call_data.userId, null, 0);
        setUserName(call_data);
      }
      RNCallKeep.backToForeground();
      RNCallKeep.endCall(call_data.userId);
    });

    RNCallKeep.addEventListener('endCall', async () => {
      // console.log('In customer stackk navigator');
      let callData = await AsyncStorage.getItem('call_data');
      let isCallPicked = (await AsyncStorage.getItem('call_picked')) || '0';
      callData = JSON.parse(callData);
      console.log('Customer Call Data ->', callData);
      if (isCallPicked !== '1') {
        axios
          .post(
            'https://fcm.googleapis.com/fcm/send',
            {
              to: callData.fcmToken,
              notification: {
                title: 'Notification Title',
                body: 'Notification Message',
                sound: 'default',
              },
              data: {
                customData: JSON.stringify({
                  userId: callData.callerId,
                  callType: callData.callType,
                  notificationType: 'END_CALL',
                  name: callData.name,
                }),
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${SERVER_KEY}`,
              },
            },
          )
          .then(async response => {
            console.log('NOTIFICATION SENT:', response.data);
            setVideoCall(false);
            setShowModal(false);
            await engine.current.leaveChannel();
          })
          .catch(error => {
            console.log('NOTIFICATION ERROR:', error);
            setVideoCall(false);
          });
      }
      await AsyncStorage.removeItem('call_data');
      await AsyncStorage.removeItem('call_picked');
      RNCallKeep.endAllCalls();
    });
  }, []);

  const requestCameraAndAudioPermission = async () => {
    try {
      const alreadyAudioGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      if (alreadyAudioGranted) {
        return;
      }

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const initEngine = async () => {
    console.log('In this method init');
    engine.current = await RtcEngine.create(appId);
    await engine.current.enableAudio();
    // console.log('In this method init 234', engine.current);

    engine.current.addListener('UserJoined', (uidLocal, elapsed) => {
      // console.log('UserJoined', uidLocal, elapsed);
      if (peerIds.indexOf(uidLocal) === -1) {
        setPeerIds([...peerIds, uidLocal]);
        setConnectingStatus('Connected');
      }
    });

    engine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter(id => id !== uid));
      setConnectingStatus('Disconnected');
      setShowModal(false);
      setOpenMicrophone(true);
      setEnableSpeakerphone(false);
      engine.current.leaveChannel();
      // RNCallKeep.endAllCalls();
    });

    engine.current.addListener(
      'JoinChannelSuccess',
      (channelLocal, uidLocal, elapsed) => {
        // console.log('JoinChannelSuccess', channelLocal, uidLocal, elapsed);
        setConnectingStatus('Connecting');
        setJoinSucceed(true);
      },
    );

    engine.current.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    engine.current.addListener('Error', err => {
      console.log('Error', err);
    });
  };

  const joinChannel = async item => {
    // console.log('item~~', item);
    try {
      // console.log('In this method join', userdata.uid);
      const docid =
        item.uid > userdata.uid
          ? userdata.uid + '-' + item.uid
          : item.uid + '-' + userdata.uid;
      // console.log('docid', docid);
      await engine.current.joinChannel(null, docid, null, 0);

      axios
        .post(
          'https://fcm.googleapis.com/fcm/send',
          {
            to: item.fcmToken,
            notification: {
              title: 'Notification Title',
              body: 'Notification Message',
              sound: 'default',
            },
            data: {
              customData: JSON.stringify({
                userId: docid,
                callType: 'AUDIO_CALL',
                notificationType: 'START_CALL',
                name: userdata.name,
                fcmToken: item.fcmToken,
              }),
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `key=${SERVER_KEY}`,
            },
          },
        )
        .then(response => {
          console.log('NOTIFICATION SENT:', response.data);
        })
        .catch(error => {
          console.log('NOTIFICATION ERROR:', error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = async () => {
    try {
      await engine.current.leaveChannel();
      setDisconnecting(true);
      setJoinSucceed(false);
      setPeerIds([]);
      setShowModal(false);
      const docid =
        userName.uid > userdata.uid
          ? userdata.uid + '-' + userName.uid
          : userName.uid + '-' + userdata.uid;
      axios
        .post(
          'https://fcm.googleapis.com/fcm/send',
          {
            to: userName.fcmToken,
            notification: {
              title: 'Notification Title',
              body: 'Notification Message',
              sound: 'default',
            },
            data: {
              customData: JSON.stringify({
                userId: docid,
                callType: 'AUDIO_CALL',
                notificationType: 'END_CALL',
                name: userName.name,
              }),
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `key=${SERVER_KEY}`,
            },
          },
        )
        .then(async response => {
          console.log('NOTIFICATION SENT:', response.data);

          await engine.current.leaveChannel();
        })
        .catch(error => {
          console.log('NOTIFICATION ERROR:', error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const toggleMicrophone = async () => {
    await engine.current.enableLocalAudio(!openMicrophone);
    setOpenMicrophone(!openMicrophone);
  };

  const toggleSpeakerphone = async () => {
    await engine.current.setEnableSpeakerphone(!enableSpeakerphone);
    setEnableSpeakerphone(!enableSpeakerphone);
  };

  // console.log('connectionData~~~', connectionData);
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
    UserOffline: () => setVideoCall(false),
  };

  const joinVedioCall = async item => {
    setVideoCall(true);
    setUserName(item);
    try {
      // console.log('In this method join', userdata.uid);
      const docid =
        item.uid > userdata.uid
          ? userdata.uid + '-' + item.uid
          : item.uid + '-' + userdata.uid;
      // console.log('docid', docid);
      // await engine.current.joinChannel(null, docid, null, 0);
      setUserName({...item, userId: docid});

      axios
        .post(
          'https://fcm.googleapis.com/fcm/send',
          {
            to: item.fcmToken,
            notification: {
              title: 'Notification Title',
              body: 'Notification Message',
              sound: 'default',
            },
            data: {
              customData: JSON.stringify({
                userId: docid,
                callType: 'VIDEO_CALL',
                notificationType: 'START_CALL',
                name: userdata.name,
                fcmToken: item.fcmToken,
              }),
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `key=${SERVER_KEY}`,
            },
          },
        )
        .then(response => {
          console.log('NOTIFICATION SENT:', response.data);
        })
        .catch(error => {
          console.log('NOTIFICATION ERROR:', error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const renderItem = ({item}) => {
    // console.log('item~~~', item);
    return (
      <View style={styles.flatlistcontainer}>
        <View style={styles.mainContainer}>
          <View style={styles.userDetailsContainer}>
            <View
              style={{
                marginHorizontal: moderateScale(15),
                flex: 1,
              }}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <Pressable
              style={{marginHorizontal: moderateScale(10)}}
              onPress={() => {
                joinChannel(item);
                setUserName(item);
                setShowModal(true);
              }}>
              <Feather name={'phone-call'} size={30} color={colors.Blue} />
            </Pressable>
            <Pressable
              style={{marginHorizontal: moderateScale(10)}}
              onPress={() => {
                joinVedioCall(item);
              }}>
              <Feather name={'video'} size={30} color={colors.Blue} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  // for displaying the selected category
  const [selectedBodyParts, setSelectedBodyParts] = useState(
    route?.params?.data?.body_part ?? [],
  );
  const [selectedCondition, setSelectedCondition] = useState(
    route?.params?.data?.condition ?? [],
  );
  // for callback when dropdown is closed
  const dataa = [
    {
      id: 1,
      label: 'hi',
      value: 1,
    },
    {
      id: 2,
      label: 'hello',
      value: 2,
    },
    {
      id: 3,
      label: 'how',
      value: 3,
    },
    {
      id: 4,
      label: 'are',
      value: 4,
    },
    {
      id: 5,
      label: 'you',
      value: 5,
    },
  ];
  const [selectedBodyPartsFocus, setSelectedBodyPartsFocus] = useState();
  const [selectedConditionFocus, setSelectedConditionFocus] = useState();
  const [conditionListing, setConditionListing] = useState(dataa);
  const scrollRef = useRef(null);

  return videoCall ? (
    <AgoraUIKit
      connectionData={connectionData}
      rtcCallbacks={rtcCallbacks}
      settings={{
        disableRtm: true,
        displayUsername: userName.name,
      }}></AgoraUIKit>
  ) : (
    <View style={styles.container}>
      <ContentView
        visible={'true'}
        headerText={'Home'}
        rightIcon={require('../../assets/exit.png')}
        iconVisible={true}
        onRightIconPress={() => logout()}>
        {/* <View style={styles.contentView}>
          <View
            style={{
              paddingBottom: moderateScale(10),
              marginHorizontal: moderateScale(20),
            }}>
            <TextInputWithLabel
              icon={search_white_icon}
              iconPress={true}
              inputPlaceholder={'Search'}
              inputValue={search}
              onTextInputChange={text => {
                setSearch(text);
              }}
              inputMaxLength={60}
              keyboardType="email-address"
            />
          </View>

          <FlatList
            data={groupData.filter(item =>
              item.name.toLowerCase().includes(search.trim().toLowerCase()),
            )}
            contentContainerStyle={{
              paddingBottom: moderateScale(20),
              marginHorizontal: moderateScale(20),
            }}
            ListEmptyComponent={<ListEmptyComponent />}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <Modal visible={showModal} transparent>
            <View style={styles.container}>
              <View style={styles.container}>
                <View>
                  <Text style={styles.userName}>{userdata.name}</Text>
                  <Text style={styles.mutedText}>{connectingStatus}</Text>
                </View>
                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={toggleSpeakerphone}
                    style={styles.iconConatiner}>
                    <FontAwesomeIcon
                      name={enableSpeakerphone ? 'volume-up' : 'volume-off'}
                      size={30}
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={toggleMicrophone}
                    style={styles.iconConatiner}>
                    <FontAwesomeIcon
                      name={openMicrophone ? 'microphone' : 'microphone-slash'}
                      size={30}
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                      leave();
                    }}
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
          </Modal>
        </View> */}
  <MyCustomButton title="Custom Button"  />
        {/* <MultiSelect
          style={[styles.inputView, {paddingHorizontal: 3, height: 50,marginHorizontal:40}]}
          activeColor={colors.Blue}
          // selectedTextStyle={{ color: colors.black, fontSize: 13, textTransform: 'capitalize' }}
          // fontFamily={fonts.PR}
          placeholder={'Select conditions from below'}
          data={conditionListing}
          containerStyle={styles.shadow}
          search={true}
          searchPlaceholder="Search..."
          searchField={'label'}
          maxHeight={ 150}
          labelField="label"
          valueField="value"
          value={selectedCondition}
          onFocus={() => {
            Keyboard.dismiss();
            setTimeout(() => {
              scrollRef && scrollRef?.current?.scrollToEnd({animated: true});
            }, 100);
            setSelectedConditionFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              scrollRef && scrollRef?.current?.scrollToEnd({animated: true});
            }, 100);
            setSelectedConditionFocus(false);
          }}
          onChange={item => {
            setSelectedCondition(item);
            // setConditionId(item);
            // setSelectedConditionFocus(false);
          }}
          flatListProps={{
            onEndReachedThreshold: 0.5,
            onEndReached: () => {
              // setPage(page + 1);
              // getCondition();
            },
          }}
          selectedTextStyle={{
            fontSize: 14,
            // fontFamily: fonts.PR,
            textTransform: 'capitalize',
            color: colors.black,
          }}
          placeholderStyle={{
            fontSize: 14,
            // fontFamily: fonts.PR,
            textTransform: 'capitalize',
            color: colors.grey,
          }}
          selectedStyle={{
            borderColor: colors.DarkYellow,
            borderWidth: 1,
            borderRadius: 10,
            marginLeft: 2,
          }}
          renderCustomizedButton={() => (
            <MyCustomButton title="Custom Button" onPress={handleButtonPress} />
          )}
          renderItem={(item, index) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    padding: 3,
                    // fontFamily: fonts.PR,
                    textTransform: 'capitalize',
                    width: '90%',
                  }}>
                  {item.label}
                </Text>
                
              </View>
            </View>
          )}
        /> */}

        <Loader value={loader} />
      </ContentView>
    </View>
  );
}

const MyCustomButton = ({title, onPress}) => (
  <Button title={title} onPress={onPress} />
);

const ListEmptyComponent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text>No data found</Text>
    </View>
  );
};
