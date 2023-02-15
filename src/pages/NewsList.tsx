import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {BASE_URL} from '../utils/Constants';

const NewsList = (props: any) => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const setNewsList = async () => {
      const response = await axios.get(`${BASE_URL}/articles`);
      console.log(response);
    };

    setNewsList();
  }, []);

  return (
    <View>
      <View>
        <Image source={require('../../assets/Logo.png')} />
        <Image source={require('../../assets/Notification.png')} />
      </View>
      <View>
        <Text>Latest</Text>
        <Text>See all</Text>
      </View>
    </View>
  );
};

export default NewsList;
