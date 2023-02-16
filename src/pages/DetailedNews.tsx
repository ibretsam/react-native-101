import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL} from '../utils/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

const DetailedNews = (props: any) => {
  const [data, setData] = useState({
    _id: '',
    title: '',
    content: '',
    image: '',
    createdAt: '',
    createdBy: '',
  });
  const {id} = props.route.params;
  useEffect(() => {
    const getDetailedNews = async () => {
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable>
          <Image source={require('../../assets/BackArrow.png')} />
        </Pressable>
        <View style={styles.topBarRightItems}>
          <Pressable>
            <Image source={require('../../assets/Share.png')} />
          </Pressable>
          <Pressable>
            <Image source={require('../../assets/MoreSetting.png')} />
          </Pressable>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {data.image && (
          <Image style={styles.image} source={{uri: data.image}} />
        )}
      </View>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.timeContainer}>
          <Image
            style={styles.clock}
            source={require('../../assets/Time.png')}
          />
          <Text style={styles.time}>{moment(data.createdAt).fromNow()}</Text>
        </View>
        <Text style={styles.content}>{data.content}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailedNews;

const aspectRatio = 16 / 9; // 16:9 aspect ratio
const screenWidth = Dimensions.get('screen').width; // get the screen width
const imageWidth = screenWidth; // set the image width to the screen width
const imageHeight = imageWidth / aspectRatio; // calculate the image height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
  },
  topBarRightItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
    alignItems: 'center',
  },
  image: {
    width: imageWidth - 30,
    height: imageHeight,
    borderRadius: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: Dimensions.get('window').width - 16,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  clock: {
    width: 10,
    height: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    alignItems: 'center',
  },
  content: {
    width: Dimensions.get('window').width - 16,
    fontSize: 14,
    fontWeight: '400',
  },
});
