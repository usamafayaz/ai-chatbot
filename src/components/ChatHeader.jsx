// components/ChatHeader.js
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatHeader = () => {
  const [theme, setTheme] = useState('dark-mode');
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconLeft}>
        <Icon name="menu" size={30} color={'#666'} />
      </TouchableOpacity>
      <Text style={styles.headerText}>AI Chat Bot</Text>
      <TouchableOpacity
        style={styles.iconRight}
        onPress={() => {
          if (theme == 'dark-mode') setTheme('light-mode');
          else setTheme('dark-mode');
        }}>
        <Icon name={theme} size={30} color={'#666'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15, // Add some horizontal padding
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    fontStyle: 'italic',
  },
  iconLeft: {
    position: 'absolute', // Absolute positioning for the left icon
    left: 15, // Move to the left corner
  },
  iconRight: {
    position: 'absolute', // Absolute positioning for the right icon
    right: 15, // Move to the right corner
  },
});

export default ChatHeader;
