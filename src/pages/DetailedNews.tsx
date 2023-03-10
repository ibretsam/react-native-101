import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {BASE_URL} from '../utils/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';
import {useRoute, useNavigation} from '@react-navigation/native';
import {AppContext, AppContextType} from '../utils/AppContext';

interface RouteParams {
  id?: string;
  // other properties, if any
}

const DetailedNews = (props: any) => {
  const [data, setData] = useState({
    _id: '',
    title: '',
    content: '',
    image: '',
    createdAt: '',
    createdBy: '',
  });

  const route = useRoute();
  const navagation = useNavigation();
  const {id} = route.params as RouteParams;
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(AppContext) as AppContextType;

  const handleGoBack = () => {
    navagation.goBack();
  };

  const getDetailedNews = async () => {
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
    setData(response.data.data[0]);
    setIsLoading(false);
  };

  const deletePost = async () => {
    console.log(data._id);
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.delete(
      `${BASE_URL}/articles/${data._id}/delete`,
      config,
    );

    console.log(response.data);

    if (response.data.error === false) {
      Alert.alert('Delete Post', 'Post deleted successfully');
      navagation.goBack();
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    getDetailedNews();
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      ) : (
        <ScrollView>
          <View style={styles.topBar}>
            <Pressable onPress={handleGoBack}>
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
            {data.createdAt && (
              <View style={styles.timeContainer}>
                <Image
                  style={styles.clock}
                  source={require('../../assets/Time.png')}
                />
                <Text style={styles.time}>
                  {moment(data.createdAt).fromNow()}
                </Text>
              </View>
            )}
            <Text style={styles.content}>{data.content}</Text>
          </View>
          {user._id === data.createdBy && (
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.editBtn}
                onPress={() => props.navigation.navigate('NewPost', data)}>
                <Text style={{color: 'white'}}>Edit</Text>
              </Pressable>
              <Pressable style={styles.delBtn} onPress={deletePost}>
                <Text style={{color: 'white'}}>Delete</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      )}
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
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editBtn: {
    backgroundColor: '#1877F2',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width / 2 - 30,
    alignItems: 'center',
  },
  delBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width / 2 - 30,
    alignItems: 'center',
  },
});
