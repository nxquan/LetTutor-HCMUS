import {
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Orientation from 'react-native-orientation-locker';
import {formatTime} from '@/utils';
import styles from './styles';
import {colors} from '@/constants';

const height = Dimensions.get('window').height;

type Props = {
  uri: string;
  isFullscreen: boolean;
  onChangeOrientation: any;
};
const CustomVideo = (props: Props) => {
  const {uri, isFullscreen, onChangeOrientation} = props;
  const [isPaused, setIsPausedVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState<any>({});
  const videoRef = useRef<any>();
  const [isClickedVideo, setIsClickedVideo] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsClickedVideo(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isClickedVideo]);
  return (
    <Pressable
      onPress={() => setIsClickedVideo(true)}
      style={{
        marginVertical: 12,
        width: '100%',
        height: isFullscreen ? height : 240,
      }}>
      <Video
        ref={videoRef}
        paused={isPaused}
        onProgress={x => {
          setVideoProgress(x);
        }}
        onEnd={() => {
          setIsPausedVideo(true);
          videoRef.current.seek(0);
        }}
        source={{
          uri: uri || 'https://youtu.be/SOPc_rpECfc',
        }}
        style={[styles.video, {height: isFullscreen ? height : 240}]}
        resizeMode="cover"
      />
      {isClickedVideo && (
        <TouchableOpacity
          style={{
            width: '100%',
            height: isFullscreen ? height : 240,
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <View style={styles.videoControls}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setIsPausedVideo(false);
                videoRef.current &&
                  videoRef.current.seek(
                    parseInt(videoProgress?.currentTime) - 10,
                  );
              }}>
              <MaterialCommunityIcons
                name="rewind"
                size={42}
                color={colors.white}
              />
            </TouchableOpacity>
            {isPaused ? (
              <TouchableOpacity
                activeOpacity={0.5}
                style={{marginLeft: 40}}
                onPress={() => setIsPausedVideo(!isPaused)}>
                <MaterialCommunityIcons
                  name="play-circle"
                  size={42}
                  color={colors.white}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={{marginLeft: 40}}
                onPress={() => setIsPausedVideo(!isPaused)}>
                <MaterialCommunityIcons
                  name="pause-circle"
                  size={42}
                  color={colors.white}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.5}
              style={{marginLeft: 40}}
              onPress={() => {
                setIsPausedVideo(false);
                videoRef.current &&
                  videoRef.current.seek(
                    parseInt(videoProgress?.currentTime) + 10,
                  );
              }}>
              <MaterialCommunityIcons
                name="fast-forward"
                size={42}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.videoSlider}>
            <Text style={styles.videoTime}>
              {formatTime(videoProgress?.currentTime || 0)}
            </Text>
            <Slider
              value={videoProgress?.currentTime}
              onValueChange={pos => {
                setIsPausedVideo(false);
                videoRef.current && videoRef.current.seek(Math.floor(pos));
              }}
              style={{height: 40, flex: 1}}
              minimumValue={0}
              maximumValue={videoProgress?.seekableDuration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.videoTime}>
              {formatTime(videoProgress?.seekableDuration || 0)}
            </Text>

            <TouchableOpacity
              activeOpacity={0.5}
              style={{marginLeft: 16}}
              onPress={() => {
                if (isFullscreen) {
                  Orientation.lockToPortrait();
                } else {
                  Orientation.lockToLandscape();
                }
                onChangeOrientation(!isFullscreen);
              }}>
              <MaterialCommunityIcons
                name="fullscreen"
                size={36}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default React.memo(CustomVideo);
