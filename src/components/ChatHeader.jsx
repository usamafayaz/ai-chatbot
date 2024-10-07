import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import constants from '../config/constants';

const ChatHeader = () => {
  const [currentTheme, setCurrentTheme] = useState('dark-mode');

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconLeft}>
        <Icon name="menu" size={30} color={constants.colors.iconInactive} />
      </TouchableOpacity>
      <Text allowFontScaling={false} style={styles.headerText}>
        AI Chat Bot
      </Text>
      <TouchableOpacity
        style={styles.iconRight}
        onPress={() => {
          setCurrentTheme(
            currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode',
          );
        }}>
        <Icon
          name={currentTheme}
          size={30}
          color={constants.colors.iconInactive}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: constants.colors.headerBackground,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  headerText: {
    color: constants.colors.primaryText,
    fontSize: constants.fontSizes.medium,
    fontWeight: 'bold',
    fontFamily: constants.fontFamilies.monospace,
    fontStyle: 'italic',
  },
  iconLeft: {
    position: 'absolute',
    left: 15,
  },
  iconRight: {
    position: 'absolute',
    right: 15,
  },
});

export default ChatHeader;
