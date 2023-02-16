import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../utils/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const DetailedNews = (props: any) => {
  const [data, setData] = useState({title: ''});
  const {id} = props.route.params;
  useEffect(() => {
    const getDetailedNews = async () => {
      setData({title: ''});
      console.log(id);
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(
        `${BASE_URL}/articles/${id}/detail`,
        config,
      );
      console.log(response.data.data[0]);
      setData(response.data.data[0]);
    };

    getDetailedNews();
  }, [id]);

  return (
    <SafeAreaView>
      <Text>{data.title}</Text>
    </SafeAreaView>
  );
};

export default DetailedNews;
