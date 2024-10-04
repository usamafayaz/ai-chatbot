// components/ChatScreen.js
import React, {useState} from 'react';
import {View, StyleSheet, Clipboard} from 'react-native';
import {GoogleGenerativeAI} from '@google/generative-ai';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';
import Toast from 'react-native-toast-message';
import apiKey from '../config/apiKey';

// Initialize the API
const genAI = new GoogleGenerativeAI(apiKey.API_KEY);

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async text => {
    if (text.trim() === '') return;

    const newMessage = {id: Date.now(), text, user: true};
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({model: 'gemini-pro'});
      const result = await model.generateContent(text);
      const response = await result.response;
      const aiResponse = {
        id: Date.now() + 1,
        text: response.text(),
        user: false,
      };
      console.log(`Prompt: ${text}`);
      console.log(`AI Response: ${aiResponse.text}`);

      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error chatting with Gemini:', error);
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
    <View style={styles.container}>
      <ChatHeader />
      <ChatMessages
        messages={messages}
        onMessageLongPress={handleMessageLongPress}
      />
      {isLoading && <LoadingIndicator />}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});

export default ChatScreen;
