import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import Toast from 'react-native-toast-message';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import {getThemeColors} from './src/config/constants';

// Create a new component that will be wrapped by the Provider
const ThemedApp = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = getThemeColors(currentTheme);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.secondaryBackground}]}>
      <StatusBar
        barStyle={currentTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.secondaryBackground}
      />
      <ChatScreen />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemedApp />
      <Toast />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
