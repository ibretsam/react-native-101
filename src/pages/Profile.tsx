import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext, AppContextType} from '../utils/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../utils/Constants';
import NewsItem from '../components/NewsItem';
import {FloatingAction} from 'react-native-floating-action';

const Profile = (props: any) => {
  const {navigation} = props;
  const {user} = useContext(AppContext) as AppContextType;
  const defaultAvatarLink =
    'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg';

  const [myArticles, setMyArticles] = useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getUserArticles = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(
      `${BASE_URL}/articles/my-articles`,
      config,
    );

    setMyArticles(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getUserArticles();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#1877F2" />
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          <View style={styles.topBar}>
            <Text>Profile</Text>
            <Image source={require('../../assets/Setting.png')} />
          </View>
          <View>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={{
                  uri: user.avatar ? user.avatar : defaultAvatarLink,
                }}
              />
            </View>
            <Text
              style={[
                styles.textCenter,
                {fontWeight: '700', margin: 7, fontSize: 17},
              ]}>
              {user.name}
            </Text>
            <Text style={styles.textCenter}>{user.email}</Text>
          </View>
          <View>
            <Pressable
              style={styles.updateButton}
              onPress={() => navigation.navigate('UpdateProfile')}>
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </Pressable>
          </View>
          <View>
            <Text
              style={[
                styles.textCenter,
                {fontWeight: '700', marginVertical: 10, color: '#1877F2'},
              ]}>
              My Articles
            </Text>
            <FlatList
              style={styles.myArticles}
              data={myArticles}
              renderItem={({item}) => (
                <NewsItem data={item} navigation={props.navigation} />
              )}
            />
          </View>
        </View>
      )}

      <FloatingAction
        onPressMain={() => {
          props.navigation.navigate('NewPost');
        }}
        overlayColor="transparent"
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textCenter: {
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#1877F2',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  updateButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  myArticles: {
    height: '100%',
  },
});
