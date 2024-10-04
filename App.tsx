import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ChatScreen from './src/screens/ChatScreen';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={'#2A2A2A'} />
        <ChatScreen />
      </SafeAreaView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});

export default App;
