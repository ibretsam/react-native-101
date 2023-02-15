import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AppContext, AppContextType} from '../utils/AppContext';
import {BASE_URL} from '../utils/Constants';

const Login = (props: any) => {
  const fbLogo = require('../../assets/fbIcon.png');
  const googleLogo = require('../../assets/googleIcon.png');

  const {navigation} = props;
  const {setIsLoggedIn} = useContext(AppContext) as AppContextType;

  const toSignUp = () => {
    navigation.navigate('SignUp');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: email,
      password: password,
    });

    if (response.data.statusCode === 200) {
      console.log('Login Success');
      console.log(response.data.data);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('token', response.data.data.token);
      // navigation.navigate('NewsList');
    } else if (response.data.statusCode === 500) {
      console.log('Login Failed');
      console.log(response.data.message);
    } else {
      try {
        throw new Error(
          `Request failed with status code ${response.data.statusCode}`,
        );
      } catch (error) {
        console.log('Error: ' + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroContent}>
        <View>
          <Text style={[styles.blackText, styles.heroTitle]}>Hello</Text>
          <Text style={[styles.blueText, styles.heroTitle]}>Again!</Text>
        </View>
        <Text style={styles.heroDescription}>Welcome back you’ve</Text>
        <Text style={styles.heroDescription}>been missed</Text>
      </View>

      <View>
        <Text style={styles.inputLabel}>
          Username<Text style={styles.redText}>*</Text>
        </Text>
        <TextInput style={styles.input} onChangeText={setEmail} />
      </View>

      <View>
        <View>
          <Text style={styles.inputLabel}>
            Password<Text style={styles.redText}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.otherInput}>
          <View style={styles.rememberMe}>
            <BouncyCheckbox
              size={20}
              fillColor={'#1877F2'}
              innerIconStyle={{borderRadius: 3}}
              iconStyle={{borderRadius: 3}}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <Pressable>
            <Text style={styles.forgotPasswordText}>Forget password</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.heroBtn} onPress={login}>
        <Text style={styles.heroBtnText}>Login</Text>
      </Pressable>

      <Text style={styles.continueText}>or continue with</Text>

      <View style={styles.socialBtns}>
        <Pressable style={[styles.socialBtn]}>
          <Image source={fbLogo} style={{marginRight: 10}} />
          <Text>Facebook</Text>
        </Pressable>
        <Pressable style={styles.socialBtn}>
          <Image source={googleLogo} style={{marginRight: 10}} />
          <Text>Google</Text>
        </Pressable>
      </View>

      <View style={styles.signUp}>
        <Text>don’t have an account ? </Text>
        <Pressable onPress={toSignUp}>
          <Text style={styles.blueText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'column',
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    marginBottom: 50,
  },
  heroTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 48,
    lineHeight: 72,
  },
  heroDescription: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 30,
    color: '#4E4B66',
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
  otherInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  rememberMe: {
    display: 'flex',
    flexDirection: 'row',
  },
  rememberMeText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#4E4B66',
  },
  forgotPasswordText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#5890FF',
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
  continueText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#4E4B66',
    paddingVertical: 15,
    textAlign: 'center',
  },
  socialBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  socialBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 24,
    paddingLeft: 16,
    backgroundColor: '#EEF1F4',
    borderRadius: 6,
    width: 166,
    height: 48,
  },

  signUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  blackText: {
    color: '#050505',
  },
  blueText: {
    color: '#1877F2',
  },
  redText: {
    color: '#C30052',
  },
});
