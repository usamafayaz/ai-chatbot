// components/ChatMessages.js
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ChatMessages = ({messages, scrollViewRef, onMessageLongPress}) => {
  const renderFormattedText = text => {
    // Remove leading and trailing whitespace from each part
    const parts = text
      .trim()
      .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*|```.*?```)/s);

    return parts.map((part, index) => {
      part = part.trim(); // Remove extra spaces and new lines

      if (part.startsWith('***') && part.endsWith('***')) {
        // Heading
        return (
          <Text key={index} style={styles.heading}>
            {part.slice(3, -3).trim()}
          </Text>
        );
      } else if (part.startsWith('**') && part.endsWith('**')) {
        // Subheading or Bold
        return (
          <Text key={index} style={styles.subheading}>
            {part.slice(2, -2).trim()}
          </Text>
        );
      } else if (part.startsWith('*') && part.endsWith('*')) {
        // Italic
        return (
          <Text key={index} style={styles.italic}>
            {part.slice(1, -1).trim()}
          </Text>
        );
      } else if (part.startsWith('```') && part.endsWith('```')) {
        // Code block
        return (
          <View key={index} style={styles.codeBlock}>
            <Text style={styles.codeText}>{part.slice(3, -3).trim()}</Text>
          </View>
        );
      } else {
        // Regular text
        return (
          <Text key={index} style={styles.bodyText}>
            {part}
          </Text>
        );
      }
    });
  };

  return (
    <ScrollView
      style={styles.messagesContainer}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({animated: true})
      }>
      {messages.map(message => (
        <TouchableOpacity
          key={message.id}
          onLongPress={() => onMessageLongPress(message.text)}
          delayLongPress={500}>
          <View
            style={[
              styles.messageBubble,
              message.user ? styles.userMessage : styles.aiMessage,
            ]}>
            {renderFormattedText(message.text)}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4A90E2',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2A2A2A',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontStyle: 'italic',
  },
  bodyText: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  italic: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#CCCCCC',
  },
  codeBlock: {
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#E6E6E6',
  },
});

export default ChatMessages;
