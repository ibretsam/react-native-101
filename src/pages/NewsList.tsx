import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewsItem from '../components/NewsItem';
import {BASE_URL} from '../utils/Constants';

const NewsList = (props: any) => {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [searchData, setSearchData] = useState([]);

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

  useEffect(() => {
    getNewsList();
  }, [newsList]);

  const handleSearchBlur = () => {
    setSearchMode(false);
    setSearchData([]);
    Keyboard.dismiss();
  };

  const getSearchedData = async (text: string) => {
    if (text === '') {
      setSearchData([]);
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(
      `${BASE_URL}/articles/search?title=${text}`,
      config,
    );
    console.log(response.data);
    setSearchData(response.data.data);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSearchBlur}>
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
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search..."
                style={styles.searchInput}
                onFocus={() => setSearchMode(true)}
                onBlur={() => setSearchMode(false)}
                onChangeText={text => getSearchedData(text)}
              />
            </View>
            {searchMode ? (
              <View>
                <Text style={styles.searchResultText}>Search results:</Text>
                <FlatList
                  data={searchData}
                  renderItem={({item}) => (
                    <NewsItem data={item} navigation={props.navigation} />
                  )}
                />
              </View>
            ) : (
              <View>
                <View style={styles.filter}>
                  <Text style={styles.latest}>Latest</Text>
                  <Text>See all</Text>
                </View>
                <FlatList
                  data={newsList}
                  renderItem={({item}) => (
                    <NewsItem data={item} navigation={props.navigation} />
                  )}
                />
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  searchContainer: {
    margin: 10,
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  searchResultText: {
    margin: 10,
  },
});
