import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {toggleTheme} from '../redux/themeSlice';
import {getThemeColors, constants} from '../config/constants';

const ChatHeader = ({profileImage, nickname}) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  // Use useEffect to log only when profileImage changes
  useEffect(() => {
    console.log(profileImage);
  }, [profileImage]); // Only log when profileImage changes

  return (
    <View
      style={[styles.header, {backgroundColor: colors.secondaryBackground}]}>
      {/* Profile Image on the left */}
      <View style={styles.iconLeftContainer}>
        <Image source={{uri: profileImage}} style={styles.iconLeft} />
      </View>

      {/* Title in the center */}
      <Text
        allowFontScaling={false}
        style={[styles.headerText, {color: colors.primaryText}]}>
        AI Chat Bot
      </Text>

      {/* Theme toggle on the right */}
      <TouchableOpacity
        style={styles.iconRight}
        onPress={() => dispatch(toggleTheme())}>
        <Icon
          name={currentTheme === 'dark' ? 'dark-mode' : 'light-mode'}
          size={30}
          color={colors.iconInactive}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: constants.fontSizes.large,
    fontWeight: 'bold',
    fontFamily: constants.fontFamilies.bold,
    fontStyle: 'italic',
  },
  iconLeftContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  iconLeft: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  iconRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatHeader;
