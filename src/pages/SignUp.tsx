import axios from 'axios';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {BASE_URL} from '../utils/Constants';

const SignUp = (props: any) => {
  const fbLogo = require('../../assets/fbIcon.png');
  const googleLogo = require('../../assets/googleIcon.png');

  const {navigation} = props;

  const toLoginScreen = () => {
    navigation.navigate('LogIn');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      email: email,
      password: password,
    });

    if (response.data.statusCode === 200) {
      console.log('Register Success');
      console.log(response.data.data);
    } else if (response.data.statusCode === 500) {
      console.log('Register Failed');
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
          <Text style={[styles.blueText, styles.heroTitle]}>Hello!</Text>
        </View>
        <Text style={styles.heroDescription}>Signup to get Started</Text>
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
        </View>
      </View>

      <Pressable style={styles.heroBtn} onPress={register}>
        <Text style={styles.heroBtnText}>Sign Up</Text>
      </Pressable>

      <Text style={styles.continueText}>or continue with</Text>

      <View style={styles.socialBtns}>
        <Pressable style={[styles.socialBtn, {marginRight: 16}]}>
          <Image source={fbLogo} style={{marginRight: 10}} />
          <Text>Facebook</Text>
        </Pressable>
        <Pressable style={styles.socialBtn}>
          <Image source={googleLogo} style={{marginRight: 10}} />
          <Text>Google</Text>
        </Pressable>
      </View>

      <View style={styles.signUp}>
        <Text>Already have an account ? </Text>
        <Pressable onPress={toLoginScreen}>
          <Text style={styles.blueText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

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
    width: 174,
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
