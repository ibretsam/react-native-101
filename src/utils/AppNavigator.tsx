import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsList from '../pages/NewsList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppContext, AppContextType} from './AppContext';
import DetailedNews from '../pages/DetailedNews';
import NewPost from '../pages/NewPost';
import Profile from '../pages/Profile';
import UpdateProfile from '../pages/UpdateProfile';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <Stack.Navigator>
      <Stack.Screen name="NewsList" options={{headerShown: false}}>
        {props => <NewsList navigation={props.navigation} />}
      </Stack.Screen>
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
      />
      <Stack.Screen
        name="DetailedNews"
        options={{headerShown: false}}
        component={DetailedNews}
      />
      <Stack.Screen
        name="UpdateProfile"
        options={{headerShown: false}}
        component={UpdateProfile}
      />
      <Stack.Screen
        name="NewPost"
        options={{headerShown: false}}
        component={NewPost}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

interface IconProps {
  name: string;
  size: number;
  color: string;
}

const Icon = ({name, size, color}: IconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'News') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'md-person-circle-sharp';
          } else if (route.name === 'NewPost') {
            iconName = 'ios-add-circle-sharp';
          }
          return iconName ? (
            <Icon name={iconName} size={size} color={color} />
          ) : null;
        },
        allowProps: true,
      })}>
      <Tab.Screen
        name="News"
        component={News}
        options={{title: 'Home', headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile', headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {isLoggedIn} = useContext(AppContext) as AppContextType;
  const {user} = useContext(AppContext) as AppContextType;
  return (
    <>
      {isLoggedIn ? user.name === '' ? <UpdateProfile /> : <Main /> : <Auth />}
    </>
  );
};

export default AppNavigator;
