import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getThemeColors} from '../config/constants';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {constants} from '../config/constants'; // Import constants

const SetupScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  useEffect(() => {
    const getNickname = async () => {
      const profile_pic = await AsyncStorage.getItem('profile_pic');
      const nickname = await AsyncStorage.getItem('nickname');
      setNickname(nickname || '');
      setProfileImage(profile_pic || '');
    };
    getNickname();
  }, []);

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeBase64: true,
        cropping: true,
        cropperCircleOverlay: true,
      });

      if (result && result.data) {
        setProfileImage(result.path);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Failed to select image',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleSubmit = async () => {
    if (nickname.trim() === '') {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Please enter a nickname',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    if (profileImage) {
      await AsyncStorage.setItem('profile_pic', profileImage);
    }
    await AsyncStorage.setItem('nickname', nickname);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'ChatScreen'}],
      }),
    );
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle={'light-content'}
      />
      <View style={styles.headerContainer}>
        <Text style={[styles.appName, {color: colors.primaryText}]}>
          Talkie
        </Text>
      </View>

      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        {profileImage ? (
          <Image
            source={{uri: profileImage}}
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <View>
            <View
              style={[
                styles.imagePlaceholder,
                {backgroundColor: colors.inputBackground},
              ]}>
              <Ionicons
                name="person"
                size={60}
                color={colors.placeholderText}
              />
            </View>
            <Text
              style={[
                {
                  color: colors.placeholderText,
                },
                styles.addPhotoText,
              ]}>
              Add Profile Photo
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={[
          styles.input,
          {backgroundColor: colors.inputBackground, color: colors.primaryText},
        ]}
        placeholder="Enter your nickname"
        placeholderTextColor={colors.placeholderText}
        value={nickname}
        onChangeText={setNickname}
      />

      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={handleSubmit}>
        <Text
          style={[
            styles.buttonText,
            {fontFamily: constants.fontFamilies.bold},
          ]}>
          Start Chatting
        </Text>
      </TouchableOpacity>

      <View style={[styles.decorativeCircle, styles.bottomLeftCircle]} />
      <View style={[styles.decorativeCircle, styles.bottomLeftCircleInner]} />
      <View style={[styles.decorativeCircle, styles.topRightCircle]} />
      <View style={[styles.decorativeCircle, styles.topRightCircleInner]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '60%',
  },
  appName: {
    fontFamily: constants.fontFamilies.bold,
    fontSize: 28,
    marginLeft: 10,
    marginTop: 30,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  addPhotoText: {marginTop: 10, fontFamily: constants.fontFamilies.medium},
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: constants.fontFamilies.regular,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderWidth: 4,
    borderColor: 'rgba(22, 163, 255, 0.1)',
    borderRadius: 64,
  },
  bottomLeftCircle: {
    bottom: -64,
    left: -64,
  },
  bottomLeftCircleInner: {
    bottom: -56,
    left: -56,
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  topRightCircle: {
    top: -64,
    right: -64,
  },
  topRightCircleInner: {
    top: -56,
    right: -56,
    width: 112,
    height: 112,
    borderRadius: 56,
  },
});

export default SetupScreen;
