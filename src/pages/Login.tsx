import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Login = () => {
  const fbLogo = require('../../assets/fbIcon.png');
  const googleLogo = require('../../assets/googleIcon.png');

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {/* <View style={styles.heroTitles}>
        <Text>Hello</Text>
        <Text>Again</Text>
        <Text>Welcome back you’ve been missed</Text>
      </View> */}

      {/* <View>
        <Text>Username</Text>
        <TextInput />
      </View>

      <View>
        <View>
          <Text>Password</Text>
          <TextInput />
        </View>
        <View>
          <View>
            <BouncyCheckbox />
            <Text>Remember me</Text>
          </View>
          <Pressable>
            <Text>Forget password</Text>
          </Pressable>
        </View>
      </View>

      <Pressable>
        <Text>Login</Text>
      </Pressable>

      <Text>or continue with</Text>

      <View>
        <Pressable>
          <Image source={fbLogo} />
          <Text>Facebook</Text>
        </Pressable>
        <Pressable>
          <Image source={googleLogo} />
          <Text>Google</Text>
        </Pressable>
      </View>

      <Text>don’t have an account ?  </Text>
      <Pressable>
        <Text>Sign Up</Text>
      </Pressable> */}
    </View>
    
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink'
  },
  heroTitles: {
    
  }
});
