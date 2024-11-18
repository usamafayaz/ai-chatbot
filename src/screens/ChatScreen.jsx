import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Clipboard,
  Text,
  StatusBar,
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
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const genAI = new GoogleGenerativeAI(apiKey.API_KEY);

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputText, setInputText] = useState('');
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);
  const [nickname, setNickname] = useState('');
  const [chatSession, setChatSession] = useState(null);

  // Initialize chat session when component mounts
  useEffect(() => {
    const initializeChatSession = async () => {
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const chat = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 2000,
        },
      });
      setChatSession(chat);
    };

    const fetchData = async () => {
      const storedNickname = await AsyncStorage.getItem('nickname');
      setNickname(storedNickname || 'User');
    };

    initializeChatSession();
    fetchData();
  }, []);

  // Rest of the time-based greeting function remains the same
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // File to generative part function remains the same
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
      console.log(error);
      throw error;
    }
  };

  // Image pick handler remains the same
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 1024,
        height: 1024,
        cropping: false,
        includeBase64: false,
      });

      if (result && result.path) {
        setSelectedImage(result.path);
      }
    } catch (error) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Failed to select image',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  // Modified send handler to use chatSession
  const handleSend = async () => {
    if (!chatSession) return;
    if (!selectedImage && !inputText.trim()) return;

    if (inputText.trim() === 'cls') {
      setMessages([]);
      setSelectedImage(null);
      setInputText('');
      // Reinitialize chat session
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const newChatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 2000,
        },
      });
      setChatSession(newChatSession);
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
      let result;

      if (selectedImage) {
        // Switch to multimodal model for image
        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
        const imagePart = await fileToGenerativePart(selectedImage);
        setSelectedImage(null);
        const prompt =
          inputText.trim() === ''
            ? 'Please describe what you see in this image.'
            : inputText;

        result = await model.generateContent([prompt, imagePart]);
      } else {
        // Use chat session for text conversations
        result = await chatSession.sendMessage(inputText);
      }

      const response = await result.response;
      const aiResponse = {
        id: Date.now() + 1,
        text: response.text(),
        user: false,
      };

      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error in chat:', error);
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

  // Message long press handler remains the same
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

  // Render method remains the same as in the original code
  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <StatusBar
        backgroundColor={colors.secondaryBackground}
        barStyle={'light-content'}
      />
      <ChatHeader />
      {messages.length === 0 && (
        <View
          style={[
            styles.welcomeContainer,
            {backgroundColor: colors.secondaryBackground},
          ]}>
          <View style={styles.rowStyle}>
            <Image
              source={require('../assets/images/particle.png')}
              tintColor={colors.primary}
              style={styles.iconStyle}
            />
            <View>
              <Text style={[styles.welcomeTitle, {color: colors.primaryText}]}>
                {getTimeBasedGreeting()}, {nickname}
              </Text>
              <Text style={[styles.welcomeText, {color: colors.secondaryText}]}>
                How may I assist you today?
              </Text>
            </View>
          </View>
        </View>
      )}
      {messages.length !== 0 && (
        <View style={styles.centeredIcon}>
          <Icon name="robot" size={60} color={colors.iconInactive} />
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
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 40,
    height: 40,
    marginRight: 12,
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
