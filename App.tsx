import React, { useState } from 'react';
import {
  Button,
  SafeAreaView, StyleSheet, TextInput
} from 'react-native';
import Hello from './src/components/Hello';
import Welcome from './src/components/Welcome';

const App = () => {

  const [name, setName] = useState("")

  const clearName = () => {
    setName("")
  }

  return (
    <SafeAreaView>
      <Hello/>
      <TextInput onChangeText={setName} value={name} style={styles.input} placeholder="Enter your name"/>
      <Button title='Clear name' onPress={clearName}/>
      <Welcome name={name}/>
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
});

export default App;
