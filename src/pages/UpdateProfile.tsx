import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import {CameraOptions, launchCamera} from 'react-native-image-picker';
import {AppContext, AppContextType} from '../utils/AppContext';
import {BASE_URL} from '../utils/Constants';

function UpdateProfile(props: any) {
  const {user, setUser} = useContext(AppContext) as AppContextType;
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [avatar, setAvatar] = useState(user.avatar);

  const avatarHandler = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };

    const result = await launchCamera(options);

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

    setAvatar(response.data.data.path);
  };

  const updateProfile = async () => {
    if (!name || !phone || !address) {
      Alert.alert('Please fill all the required fields');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      name,
      phone,
      address,
      avatar,
    };

    const response = await axios.post(
      `${BASE_URL}/users/update-profile`,
      body,
      config,
    );
    console.log(response.data.data);
    if (response.data.data) {
      Alert.alert('Profile Updated');
      setUser(response.data.data);
      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topItem}>
        <Pressable
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={require('../../assets/BackArrow.png')} />
        </Pressable>
        <View style={styles.centerContainer}>
          <Text>Fill your Profile</Text>
        </View>
      </View>
      <View style={styles.photoContainer}>
        <View style={styles.centerContainer}>
          <Pressable onPress={avatarHandler}>
            {avatar ? (
              <Image source={{uri: avatar}} style={styles.avatar} />
            ) : (
              <View style={styles.circle} />
            )}
          </Pressable>
        </View>
        <View style={styles.photoIcon}>
          <Image source={require('../../assets/Photo.png')} />
        </View>
      </View>

      <View>
        <Text style={styles.inputLabel}>
          Full Name<Text style={styles.redText}>*</Text>
        </Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
        <Text style={styles.inputLabel}>
          Phone Number<Text style={styles.redText}>*</Text>
        </Text>
        <TextInput style={styles.input} onChangeText={setPhone} value={phone} />
        <Text style={styles.inputLabel}>
          Address<Text style={styles.redText}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setAddress}
          value={address}
        />
      </View>

      <View style={styles.bottomBtn}>
        <Pressable style={styles.heroBtn} onPress={updateProfile}>
          <Text style={styles.heroBtnText}>Update</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 20,
    marginEnd: 20,
  },
  topItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  topText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF1F4',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '40%',
    right: '20%',
    top: '15%',
  },
  photoContainer: {
    marginBottom: 120,
  },

  inputLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#4E4B66',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#4E4B66',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
  },
  bottomBtn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {height: -2, width: 0},
    elevation: 4,
  },
  heroBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: '#1877F2',
    borderRadius: 6,
  },
  heroBtnText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  redText: {
    color: '#C30052',
  },
});
