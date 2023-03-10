import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import axios from 'axios';
import {BASE_URL} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPost = (props: any) => {
  const [title, setTitle] = React.useState(props.route.params?.title ?? '');
  const [description, setDescription] = React.useState(
    props.route.params?.content ?? '',
  );
  const [image, setImage] = React.useState(props.route.params?.image ?? '');
  const [mode, setMode] = React.useState('newPost');

  useEffect(() => {
    if (!props.route.params) {
      setTitle('');
      setDescription('');
      setImage('');
    }
  }, [props.route.params]);

  const capture = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    const formdata = new FormData();
    if (result.assets && result.assets[0]) {
      formdata.append('image', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    }

    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post(
      `${BASE_URL}/media/upload`,
      formdata,
      config,
    );

    setImage(response.data.data.path);
  };

  useEffect(() => {
    if (title === '' && description === '' && image === '') {
      setMode('newPost');
    } else {
      setMode('editPost');
    }
  }, []);

  const publish = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    let response =
      mode === 'editPost'
        ? await axios.put(
            `${BASE_URL}/articles/${props.route.params._id}/update`,
            {
              title: title,
              content: description,
              image: image,
            },
            config,
          )
        : await axios.post(
            `${BASE_URL}/articles`,
            {
              title: title,
              content: description,
              image: image,
            },
            config,
          );

    console.log(response?.data);
    if (response?.data.error === false) {
      setTitle('');
      setDescription('');
      setImage('');
      mode === 'newPost'
        ? Alert.alert('Success', 'Article has been published')
        : Alert.alert('Success', 'Article has been updated');
      props.navigation.goBack();
    } else {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <Image source={require('../../assets/BackArrow.png')} />
        </Pressable>
        <Text>New Post</Text>
        <Pressable>
          <Image source={require('../../assets/MoreSetting.png')} />
        </Pressable>
      </View>
      <Pressable style={styles.addContainer} onPress={capture}>
        {image ? (
          <Image source={{uri: image}} style={{width: 200, height: 200}} />
        ) : (
          <View style={styles.addCoverContainer}>
            <Image source={require('../../assets/plusIcon.png')} />
            <Text>Add Cover Photo</Text>
          </View>
        )}
      </Pressable>
      <View style={{padding: 20, flex: 1}}>
        <TextInput
          placeholder="Add Title..."
          onChangeText={setTitle}
          value={title}
        />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 10,
          }}
        />
        <TextInput
          placeholder="Add Description..."
          multiline={true}
          onChangeText={setDescription}
          value={description}
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={
            title ||
            (title !== undefined && title.length > 0 && description.length > 0)
              ? styles.heroBtn
              : styles.heroBtnDisabled
          }
          onPress={publish}>
          <Text
            style={
              title ||
              (title !== undefined &&
                title.length > 0 &&
                description.length > 0)
                ? {color: 'white'}
                : {color: '#667080'}
            }>
            {mode === 'newPost' ? 'Publish' : 'Update'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  addContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addCoverContainer: {
    flexDirection: 'column',
    width: Dimensions.get('screen').width - 40,
    height: 200,
    backgroundColor: '#EEF1F4',
    borderColor: '#4E4B66',
    borderStyle: 'dashed',
    borderWidth: 1,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBtn: {
    backgroundColor: '#1877F2',
    width: Dimensions.get('screen').width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  heroBtnDisabled: {
    backgroundColor: '#EEF1F4',
    width: Dimensions.get('screen').width - 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});
