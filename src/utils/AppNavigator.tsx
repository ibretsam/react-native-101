import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsList from '../pages/NewsList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppContext, AppContextType} from './AppContext';
import DetailedNews from '../pages/DetailedNews';
import Profile from '../pages/Profile';
import NewPost from '../pages/NewPost';

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

const News = () => {
  return (
    <Stack.Navigator initialRouteName="NewsList">
      <Stack.Screen name="NewsList" options={{headerShown: false}}>
        {props => <NewsList navigation={props.navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="DetailedNews"
        options={{headerShown: false}}
        component={DetailedNews}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="News" component={News} options={{title: 'Home'}} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="NewPost" component={NewPost} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {isLoggedIn} = useContext(AppContext) as AppContextType;
  return <>{isLoggedIn ? <Main /> : <Auth />}</>;
};

export default AppNavigator;
