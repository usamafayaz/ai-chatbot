import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Clipboard,
  Text,
} from 'react-native';
import {GoogleGenerativeAI} from '@google/generative-ai';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import Toast from 'react-native-toast-message';
import apiKey from '../config/apiKey';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {constants, getThemeColors} from '../config/constants';
import {useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const genAI = new GoogleGenerativeAI(apiKey.API_KEY);

const ChatScreen = ({route}) => {
  const {nickname, profileImage} = route.params;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputText, setInputText] = useState('');
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  const fileToGenerativePart = async uri => {
    try {
      let base64Data;

      if (Platform.OS === 'android' && !uri.startsWith('file://')) {
        uri = 'file://' + uri;
      }

      base64Data = await RNFS.readFile(uri, 'base64');

      return {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg',
        },
      };
    } catch (error) {
      console.error('Error converting image:', error);
      throw error;
    }
  };

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1024,
      maxWidth: 1024,
      quality: 0.7,
    };

    try {
      const result = await ImagePicker.launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleSend = async () => {
    if (!selectedImage && !inputText.trim()) return;

    if (inputText.trim() === 'cls') {
      setMessages([]);
      setSelectedImage(null);
      setInputText('');
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: inputText.trim(),
      user: true,
      image: selectedImage,
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      let model;
      let result;

      if (selectedImage) {
        model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
        const imagePart = await fileToGenerativePart(selectedImage);
        setSelectedImage(null);
        const prompt =
          inputText.trim() === ''
            ? 'Please describe what you see in this image.'
            : inputText;

        result = await model.generateContent([prompt, imagePart]);
      } else {
        model = genAI.getGenerativeModel({model: 'gemini-pro'});
        result = await model.generateContent(inputText);
      }

      const response = await result.response;
      const aiResponse = {
        id: Date.now() + 1,
        text: response.text(),
        user: false,
      };

      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error with Gemini:', error);
      Alert.alert('Error', 'Failed to get response from AI');

      const errorResponse = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        user: false,
      };
      setMessages(prevMessages => [...prevMessages, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageLongPress = text => {
    Clipboard.setString(text);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Copied to clipboard',
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <ChatHeader profileImage={profileImage} nickname={nickname} />
      {messages.length === 0 && (
        <View
          style={[
            styles.welcomeContainer,
            {backgroundColor: colors.secondaryBackground},
          ]}>
          <Icon name="robot" size={60} color={colors.primary} />
          <Text style={[styles.welcomeTitle, {color: colors.primaryText}]}>
            Welcome to Gemini Chat
          </Text>
          <Text style={[styles.welcomeText, {color: colors.secondaryText}]}>
            How can I assist you today? Feel free to ask me anything!
          </Text>
        </View>
      )}
      {messages.length !== 0 && (
        <View style={styles.centeredIcon}>
          <Icon name="robot" size={60} color={colors.primary} />
        </View>
      )}

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        onMessageLongPress={handleMessageLongPress}
      />
      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <Image
            source={{uri: selectedImage}}
            style={styles.selectedImagePreview}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            style={styles.removeImageButton}>
            <Icon name="close-circle" size={20} color="red" />
          </TouchableOpacity>
        </View>
      )}
      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        onImagePick={handleImagePick}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredIcon: {position: 'absolute', top: '50%', left: '42%', opacity: 0.2},
  selectedImageContainer: {
    padding: 8,
    position: 'relative',
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginBottom: 8,
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: constants.fontSizes.xlarge,
    fontFamily: constants.fontFamilies.bold,
    marginVertical: 10,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: constants.fontSizes.medium,
    fontFamily: constants.fontFamilies.regular,
    textAlign: 'center',
    marginBottom: 10,
  },
  selectedImagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
});

export default ChatScreen;
