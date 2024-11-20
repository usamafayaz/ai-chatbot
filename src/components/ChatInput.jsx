// ChatInput.js
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {constants, getThemeColors} from '../config/constants';
import {useSelector} from 'react-redux';

const ChatInput = ({value, onChangeText, onSend, onImagePick, disabled}) => {
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  return (
    <View
      style={[
        styles.inputContainer,
        {backgroundColor: colors.inputBackground},
      ]}>
      <TouchableOpacity
        onPress={onImagePick}
        style={styles.iconButton}
        disabled={disabled}>
        <Icon
          name="image-outline"
          size={24}
          color={disabled ? colors.iconInactive : colors.primary}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, {color: colors.primaryText}]}
        value={value}
        onChangeText={onChangeText}
        placeholder="Type a message..."
        placeholderTextColor={colors.placeholderText}
        multiline
        maxHeight={100}
      />
      <TouchableOpacity
        onPress={onSend}
        style={styles.iconButton}
        disabled={disabled}>
        <Icon
          name="send"
          size={24}
          color={disabled ? colors.iconInactive : colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 8,
    margin: 8,
    elevation: 2,
    shadowColor: Platform.OS === 'android' ? '#000' : '#888',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: constants.fontSizes.medium,
    maxHeight: 100,
    fontFamily: constants.fontFamilies.regular,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default ChatInput;
