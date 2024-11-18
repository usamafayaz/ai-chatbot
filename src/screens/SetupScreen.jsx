import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getThemeColors} from '../config/constants';
import Toast from 'react-native-toast-message';

const SetupScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    try {
      const result = await ImagePicker.launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error, Failed to select image',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const handleSubmit = () => {
    if (nickname.trim() === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter a nickname',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    navigation.navigate('ChatScreen', {nickname, profileImage});
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="robot-angry"
          size={50}
          color={colors.primary}
        />
        <Text style={[styles.appName, {color: colors.primaryText}]}>
          AIChatBot
        </Text>
      </View>

      <Text style={[styles.description, {color: colors.secondaryText}]}>
        Your intelligent AI companion powered by advanced language models. Chat,
        learn, and explore with personalized AI interactions.
      </Text>

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
            <Text style={{color: colors.placeholderText, marginTop: 10}}>
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
        <Text style={[styles.buttonText, {color: colors.primaryText}]}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
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
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
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
    fontWeight: 'bold',
  },
});

export default SetupScreen;
