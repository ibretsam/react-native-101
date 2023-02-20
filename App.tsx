import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Hello from './src/components/Hello';
import Welcome from './src/components/Welcome';
import TinhToan from './src/pages/TinhToan';
import Flex from './src/pages/Flex';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Profile from './src/pages/UpdateProfile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsList from './src/pages/NewsList';
import {AppContextProvider} from './src/utils/AppContext';
import AppNavigator from './src/utils/AppNavigator';

const App = () => {
  const [name, setName] = useState('');

  const clearName = () => {
    setName('');
  };

  return (
    <AppContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },
});

export default App;
