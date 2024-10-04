import React, {useRef, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

const ChatMessages = ({messages, onMessageLongPress}) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const renderFormattedText = text => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent = '';

    return lines.map((line, lineIndex) => {
      // Check if the line is a numbered heading
      const numberedHeadingMatch = line.match(/^(\d+\.) \*\*(.*?)\*\*/);

      if (numberedHeadingMatch) {
        const [_, number, headingText] = numberedHeadingMatch;
        return (
          <Text
            key={lineIndex}
            style={[styles.subheading, styles.marginBottom]}>
            {number} {headingText}
          </Text>
        );
      }

      // Handle code blocks
      if (line.trim() === '```') {
        if (inCodeBlock) {
          // End of code block
          const content = codeContent;
          codeContent = '';
          inCodeBlock = false;
          return (
            <View
              key={lineIndex}
              style={[styles.codeBlock, styles.marginBottom]}>
              <View style={styles.codeContent}>
                <Text style={styles.codeText}>{content}</Text>
              </View>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => {
                  Clipboard.setString(content);
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Copied to clipboard',
                    visibilityTime: 2000,
                    autoHide: true,
                  });
                }}>
                <Icon name={'content-copy'} size={20} color={'#666'} />
              </TouchableOpacity>
            </View>
          );
        } else {
          // Start of code block
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return null;
      }

      // Process other lines as before
      const parts = line.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/);

      return parts
        .filter(part => part.trim())
        .map((part, partIndex) => {
          part = part.trim();

          if (part.startsWith('***') && part.endsWith('***')) {
            return (
              <Text
                key={`${lineIndex}-${partIndex}`}
                style={[styles.heading, styles.marginBottom]}>
                {part.slice(3, -3).trim()}
              </Text>
            );
          } else if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <Text
                key={`${lineIndex}-${partIndex}`}
                style={[styles.subheading, styles.marginBottom]}>
                {part.slice(2, -2).trim()}
              </Text>
            );
          } else if (part.startsWith('*') && part.endsWith('*')) {
            return (
              <Text key={`${lineIndex}-${partIndex}`} style={styles.italic}>
                {part.slice(1, -1).trim()}
              </Text>
            );
          } else {
            return (
              <Text key={`${lineIndex}-${partIndex}`} style={styles.bodyText}>
                {part}
              </Text>
            );
          }
        });
    });
  };

  const renderItem = ({item: message}) => (
    <TouchableOpacity
      activeOpacity={0.8}
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
  );

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.messagesContainer}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() =>
        flatListRef.current?.scrollToEnd({animated: true})
      }
      onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
    />
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
    color: 'red',
  },
  codeBlock: {
    backgroundColor: '#1E1E1E',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeContent: {
    flex: 1,
    padding: 12,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#E6E6E6',
  },
  copyButton: {
    padding: 8,
    marginRight: 4,
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default ChatMessages;
