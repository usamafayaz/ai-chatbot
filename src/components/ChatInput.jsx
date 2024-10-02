// components/ChatInput.js
import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
        placeholderTextColor="#999"
        editable={!disabled}
      />
      <TouchableOpacity
        onPress={handleSend}
        style={styles.sendButton}
        disabled={disabled}>
        <Icon name="send" size={24} color={disabled ? '#666' : '#4A90E2'} />
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
    backgroundColor: '#2A2A2A',
  },
  input: {
    flex: 1,
    backgroundColor: '#3A3A3A',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default ChatInput;
