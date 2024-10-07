// components/ChatInput.js
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import constants from '../config/constants';

const ChatInput = ({onSend, disabled}) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type a message..."
        placeholderTextColor={constants.colors.placeholderText}
        editable={!disabled}
      />
      <TouchableOpacity
        onPress={handleSend}
        style={styles.sendButton}
        disabled={disabled}>
        <Icon
          name="send"
          size={24}
          color={
            disabled ? constants.colors.iconInactive : constants.colors.primary
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    backgroundColor: constants.colors.secondaryBackground,
  },
  input: {
    flex: 1,
    backgroundColor: constants.colors.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: constants.colors.primaryText,
    fontSize: constants.fontSizes.small,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default ChatInput;
