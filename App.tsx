import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Hello from './src/components/Hello';
import Welcome from './src/components/Welcome';
import TinhToan from './src/pages/TinhToan';
import Flex from './src/pages/Flex';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Profile from './src/pages/Profile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsList from './src/pages/NewsList';

const Stack = createNativeStackNavigator();

const App = () => {
  const [name, setName] = useState('');

  const clearName = () => {
    setName('');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" options={{headerShown: false}}>
          {props => (
            <SafeAreaView style={styles.login}>
              <SignUp navigation={props.navigation} />
            </SafeAreaView>
          )}
        </Stack.Screen>

        <Stack.Screen name="LogIn" options={{headerShown: false}}>
          {props => (
            <SafeAreaView style={styles.login}>
              <Login navigation={props.navigation} />
            </SafeAreaView>
          )}
        </Stack.Screen>

        <Stack.Screen name="NewsList" options={{headerShown: false}}>
          {props => (
            <SafeAreaView style={styles.login}>
              <NewsList navigation={props.navigation} />
            </SafeAreaView>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  },
});

export default App;
