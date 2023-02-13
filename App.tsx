import React, { useState } from 'react';
import {
  Button,
  SafeAreaView, StyleSheet, TextInput, View
} from 'react-native';
import Hello from './src/components/Hello';
import Welcome from './src/components/Welcome';
import TinhToan from './src/pages/TinhToan';
import Flex from './src/pages/Flex';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';

const App = () => {

  const [name, setName] = useState("")

  const clearName = () => {
    setName("")
  }

  return (
    <SafeAreaView style={styles.login}>
      <SignUp />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  login: {
    flex: 1,
  }
});

export default App;
