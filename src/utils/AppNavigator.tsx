import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsList from '../pages/NewsList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppContext, AppContextType} from './AppContext';

// Login, Register, manage by Stack
const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignUp" options={{headerShown: false}}>
        {props => (
          <SafeAreaView style={{flex: 1}}>
            <SignUp navigation={props.navigation} />
          </SafeAreaView>
        )}
      </Stack.Screen>

      <Stack.Screen name="LogIn" options={{headerShown: false}}>
        {props => (
          <SafeAreaView style={{flex: 1}}>
            <Login navigation={props.navigation} />
          </SafeAreaView>
        )}
      </Stack.Screen>

      <Stack.Screen name="NewsList" options={{headerShown: false}}>
        {props => (
          <SafeAreaView style={{flex: 1}}>
            <NewsList navigation={props.navigation} />
          </SafeAreaView>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// List news, profile, news manage by Tab
const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="NewsList"
        component={NewsList}
        options={{title: 'Home'}}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {isLoggedIn} = useContext(AppContext) as AppContextType;
  return <>{isLoggedIn ? <Main /> : <Auth />}</>;
};

export default AppNavigator;
