import {View, Text, TouchableHighlight} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {colors} from '@/constants';
import Participant from './Participant';

// const VideoCall = () => {
//   const [subMenuBtnColor, setSubMenuBtnColor] = useState({
//     subMenuMicrophone: false,
//     subMenuCamera: false,
//     subMenuRaiseHand: false,
//   });

//   const [openedControls, setOpenedControls] = useState({
//     isOpenMicrophone: false,
//     isOpenCamera: false,
//     isRaiseHand: false,
//     isFulScreen: false,
//     isExist: false,
//   });

//   // return (
//   //   <View style={styles.container}>
//   //     <View style={styles.participants}>
//   //       <Participant
//   //         isOpenCamera={openedControls.isOpenCamera}
//   //         isOpenMicrophone={openedControls.isOpenMicrophone}
//   //         isRaiseHand={openedControls.isRaiseHand}
//   //       />
//   //     </View>

//   //     <View style={styles.controls}>
//   //       <TouchableHighlight
//   //         underlayColor="rgba(255,255,255,.2)"
//   //         onPress={() => {
//   //           setOpenedControls((prev: any) => {
//   //             const oldState = prev.isOpenMicrophone;
//   //             return {
//   //               ...prev,
//   //               isOpenMicrophone: !oldState,
//   //             };
//   //           });
//   //         }}
//   //         activeOpacity={0.8}
//   //         style={styles.controlItem}>
//   //         <View style={styles.controlItemInner}>
//   //           {openedControls.isOpenMicrophone ? (
//   //             <FontAwesome name="microphone" size={24} color={colors.white} />
//   //           ) : (
//   //             <FontAwesome
//   //               name="microphone-slash"
//   //               size={24}
//   //               color={colors.white}
//   //             />
//   //           )}
//   //           <TouchableHighlight
//   //             style={styles.controlSubmenuBtn}
//   //             onPressIn={() =>
//   //               setSubMenuBtnColor(prev => {
//   //                 return {
//   //                   ...prev,
//   //                   subMenuMicrophone: true,
//   //                 };
//   //               })
//   //             }
//   //             onPressOut={() =>
//   //               setSubMenuBtnColor(prev => {
//   //                 return {
//   //                   ...prev,
//   //                   subMenuMicrophone: false,
//   //                 };
//   //               })
//   //             }
//   //             underlayColor={colors.white}>
//   //             <View>
//   //               <Entypo
//   //                 name="chevron-small-up"
//   //                 size={20}
//   //                 color={
//   //                   subMenuBtnColor.subMenuMicrophone
//   //                     ? colors.black
//   //                     : colors.white
//   //                 }
//   //               />
//   //             </View>
//   //           </TouchableHighlight>
//   //         </View>
//   //       </TouchableHighlight>

//   //       <TouchableHighlight
//   //         underlayColor="rgba(255,255,255,.2)"
//   //         onPress={() => {
//   //           setOpenedControls((prev: any) => {
//   //             const oldState = prev.isOpenCamera;
//   //             return {
//   //               ...prev,
//   //               isOpenCamera: !oldState,
//   //             };
//   //           });
//   //         }}
//   //         activeOpacity={0.8}
//   //         style={[styles.controlItem, {marginLeft: 6}]}>
//   //         <View style={styles.controlItemInner}>
//   //           {openedControls.isOpenCamera ? (
//   //             <FontAwesome6 name="video" size={20} color={colors.white} />
//   //           ) : (
//   //             <FontAwesome6 name="video-slash" size={20} color={colors.white} />
//   //           )}
//   //           <TouchableHighlight
//   //             style={styles.controlSubmenuBtn}
//   //             onPressIn={() =>
//   //               setSubMenuBtnColor(prev => {
//   //                 return {
//   //                   ...prev,
//   //                   subMenuCamera: false,
//   //                 };
//   //               })
//   //             }
//   //             onPressOut={() =>
//   //               setSubMenuBtnColor(prev => {
//   //                 return {
//   //                   ...prev,
//   //                   subMenuCamera: false,
//   //                 };
//   //               })
//   //             }
//   //             underlayColor={colors.white}>
//   //             <View>
//   //               <Entypo
//   //                 name="chevron-small-up"
//   //                 size={20}
//   //                 color={
//   //                   subMenuBtnColor.subMenuCamera ? colors.black : colors.white
//   //                 }
//   //               />
//   //             </View>
//   //           </TouchableHighlight>
//   //         </View>
//   //       </TouchableHighlight>
//   //       <TouchableHighlight
//   //         underlayColor="rgba(255,255,255,.2)"
//   //         onPress={() => {
//   //           setOpenedControls((prev: any) => {
//   //             const oldState = prev.isRaiseHand;
//   //             return {
//   //               ...prev,
//   //               isRaiseHand: !oldState,
//   //             };
//   //           });
//   //         }}
//   //         activeOpacity={0.8}
//   //         style={[styles.controlItem, {marginLeft: 6}]}>
//   //         <View style={styles.controlItemInner}>
//   //           <MaterialIcons name="back-hand" size={24} color={colors.white} />
//   //           <TouchableHighlight
//   //             style={styles.controlSubmenuBtn}
//   //             onPressIn={() =>
//   //               setSubMenuBtnColor(prev => {
//   //                 return {
//   //                   ...prev,
//   //                   subMenuRaiseHandler: true,
//   //                 };
//   //               })
//   //             }
//   //             onPressOut={() =>
//   //               setSubMenuBtnColor(prev => {
//   //                 return {
//   //                   ...prev,
//   //                   subMenuRaiseHandler: false,
//   //                 };
//   //               })
//   //             }
//   //             underlayColor={colors.white}>
//   //             <View>
//   //               <Entypo
//   //                 name="chevron-small-up"
//   //                 size={20}
//   //                 color={
//   //                   subMenuBtnColor.subMenuRaiseHand
//   //                     ? colors.black
//   //                     : colors.white
//   //                 }
//   //               />
//   //             </View>
//   //           </TouchableHighlight>
//   //         </View>
//   //       </TouchableHighlight>
//   //       <TouchableHighlight
//   //         underlayColor="rgba(255,255,255,.2)"
//   //         onPress={() => {
//   //           setOpenedControls((prev: any) => {
//   //             const oldState = prev.isOpenMicrophone;
//   //             return {
//   //               ...prev,
//   //               isOpenMicrophone: !oldState,
//   //             };
//   //           });
//   //         }}
//   //         activeOpacity={0.8}
//   //         style={[styles.controlItem, {marginLeft: 6}]}>
//   //         <View style={styles.controlItemInner}>
//   //           <MaterialIcons name="fullscreen" size={24} color={colors.white} />
//   //         </View>
//   //       </TouchableHighlight>
//   //       <TouchableHighlight
//   //         underlayColor="rgba(255,255,255,.2)"
//   //         onPress={() => {
//   //           setOpenedControls((prev: any) => {
//   //             const oldState = prev.isOpenMicrophone;
//   //             return {
//   //               ...prev,
//   //               isOpenMicrophone: !oldState,
//   //             };
//   //           });
//   //         }}
//   //         activeOpacity={0.8}
//   //         style={[styles.controlItem, {marginLeft: 6}]}>
//   //         <View style={styles.controlItemInner}>
//   //           <Entypo
//   //             name="dots-three-horizontal"
//   //             size={24}
//   //             color={colors.white}
//   //           />
//   //         </View>
//   //       </TouchableHighlight>
//   //       <TouchableHighlight
//   //         underlayColor="rgba(255,255,255,.2)"
//   //         onPress={() => {
//   //           setOpenedControls((prev: any) => {
//   //             const oldState = prev.isExist;
//   //             return {
//   //               ...prev,
//   //               isExist: !oldState,
//   //             };
//   //           });
//   //         }}
//   //         activeOpacity={0.8}
//   //         style={[
//   //           styles.controlItem,
//   //           {backgroundColor: colors.error, marginLeft: 6},
//   //         ]}>
//   //         <View style={styles.controlItemInner}>
//   //           <FontAwesome name="phone" size={24} color={colors.white} />
//   //         </View>
//   //       </TouchableHighlight>
//   //     </View>
//   //   </View>
//   // );
// };

import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

import {useNavigation, useRoute} from '@react-navigation/native';
import StackProps from '@/types/type';
import {useGlobalContext} from '@/hooks';

const VideoCall = () => {
  const route: any = useRoute();
  const [state, dispatch] = useGlobalContext();
  const navigation = useNavigation<StackProps>();
  const jitsiMeeting = useRef(null);
  const onReadyToClose = useCallback(() => {
    // @ts-ignore
    navigation.navigate('Tutor');
    // @ts-ignore
    jitsiMeeting.current.close();
  }, []);

  const eventListeners = {
    onReadyToClose,
  };

  return (
    <JitsiMeeting
      eventListeners={eventListeners as any}
      userInfo={{
        displayName: state.currentUser.name,
        email: state.currentUser.email,
        avatarURL: state.currentUser.avatar,
      }}
      config={{
        enableNoisyMicDetection: true,
        logging: {
          defaultLogLevel: 'none',
          disableLogCollector: false,
        },
      }}
      ref={jitsiMeeting}
      style={{flex: 1}}
      room={`${route.params?.data?.userId}-${route.params?.data?.scheduleDetailInfo?.scheduleInfo?.tutorId}`}
      token={
        route.params?.data?.userId === state.currentUser.id
          ? route.params?.data?.studentMeetingLink.split('token=')[1]
          : route.params?.data?.tutorMeetingLink.split('token=')[1]
      }
      serverURL={'https://meet.lettutor.com/'}
      flags={{
        'notifications.enabled': false,
      }}
    />
  );
};

export default VideoCall;
