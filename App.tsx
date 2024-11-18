import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import Toast from 'react-native-toast-message';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import {getThemeColors} from './src/config/constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SetupScreen from './src/screens/SetupScreen';
import SplashScreen from './src/screens/SplashScreen';
const Stack = createStackNavigator();

const ThemedApp = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Setup" component={SetupScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
