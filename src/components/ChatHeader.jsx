// components/ChatHeader.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ChatHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>AI Chat Bot</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatHeader;
