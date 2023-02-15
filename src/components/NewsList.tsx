import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/Constants';

const NewsList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getNews = async () => {
      const response = await axios.get(`${BASE_URL}/articles`);
    };

    getNews();
  });

  return (
    <View>
      <Text>NewsList</Text>
    </View>
  );
};

export default NewsList;
