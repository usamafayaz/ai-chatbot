import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {toggleTheme} from '../redux/themeSlice';
import {getThemeColors, constants} from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const ChatHeader = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      const storedProfileImage = await AsyncStorage.getItem('profile_pic');
      setProfileImage(storedProfileImage);
    };

    fetchData();
  }, []);

  return (
    <View
      style={[styles.header, {backgroundColor: colors.secondaryBackground}]}>
      {/* Profile Image on the left */}
      <TouchableOpacity
        style={styles.iconLeftContainer}
        onPress={() => {
          navigation.navigate('Setup');
        }}>
        {profileImage ? (
          <Image source={{uri: `${profileImage}`}} style={styles.iconLeft} />
        ) : (
          <Icon name="account-circle" size={40} color={colors.iconInactive} />
        )}
      </TouchableOpacity>

      {/* Title in the center */}
      <Text
        allowFontScaling={false}
        style={[styles.headerText, {color: colors.primaryText}]}>
        Talkie
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
    fontFamily: constants.fontFamilies.bold,
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
