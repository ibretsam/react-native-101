import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, TextInput} from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topItem}>
        <Pressable>
          <Image source={require('../../assets/BackArrow.png')} />
        </Pressable>
        <View style={styles.centerContainer}>
            <Text>Fill your Profile</Text>
        </View>
      </View>
      <View style={styles.photoContainer}>
        <View style={styles.centerContainer}>
            <View style={styles.circle} />
        </View>
        <View style={styles.photoIcon}>
            <Image source={require('../../assets/Photo.png')} />
        </View>
      </View>
      
      <View>
        <Text style={styles.inputLabel}>
          Username
        </Text>
        <TextInput style={styles.input} />
        <Text style={styles.inputLabel}>
          Full Name
        </Text>
        <TextInput style={styles.input} />
        <Text style={styles.inputLabel}>
          Email<Text style={styles.redText}>*</Text>
        </Text>
        <TextInput style={styles.input} />
        <Text style={styles.inputLabel}>
          Phone Number<Text style={styles.redText}>*</Text>
        </Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.bottomBtn}>
        <Pressable style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 20,
    marginEnd: 20
  },
  topItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10
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
    textAlign: 'center'
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF1F4',
  },
  photoIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '40%',
    right: '20%',
    top: '15%'
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
    shadowOffset: { height: -2, width: 0 },
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
