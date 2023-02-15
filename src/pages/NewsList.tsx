import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewsItem from '../components/NewsItem';
import {BASE_URL} from '../utils/Constants';

const NewsList = (props: any) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getNewsList = async () => {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(`${BASE_URL}/articles`, config);
      setNewsList(response.data.data);
      setIsLoading(false);
    };

    getNewsList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#1877F2" />
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          <View style={styles.topBar}>
            <Image source={require('../../assets/Logo.png')} />
            <Image source={require('../../assets/Notification.png')} />
          </View>
          <View style={styles.filter}>
            <Text style={styles.latest}>Latest</Text>
            <Text>See all</Text>
          </View>
          <FlatList
            data={newsList}
            renderItem={({item}) => <NewsItem data={item} reversed />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  latest: {
    fontWeight: '700',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
