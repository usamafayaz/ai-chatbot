import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getThemeColors} from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const currentTheme = useSelector(state => state.theme.theme);
  const colors = getThemeColors(currentTheme);
  const navigation = useNavigation();
  useEffect(() => {
    const checkInitialScreen = async () => {
      try {
        const nickname = await AsyncStorage.getItem('nickname');
        await new Promise(resolve => setTimeout(resolve, 1500));

        nickname
          ? navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'ChatScreen'}],
              }),
            )
          : navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Setup'}],
              }),
            );
      } catch (error) {
        console.error('Error determining initial route:', error);
        setInitialRoute('Setup');
      }
    };

    checkInitialScreen();
  }, []);

  return (
    <View
      style={[styles.container, {backgroundColor: colors.primaryBackground}]}>
      <Image
        source={require('../assets/images/nanotechnology.png')}
        style={styles.logo}
        resizeMode="contain"
        tintColor={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: '20%',
    width: '20%',
  },
});
export default SplashScreen;
