import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import moment from 'moment';

const NewsItem = (props: any) => {
  const {navigation} = props;
  const data = props.data;
  const formattedTime = moment(data.createdAt).fromNow();
  const handlePress = () => {
    console.log(data._id);
    navigation.navigate('DetailedNews', {id: data._id});
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: data.image}} />
        <View style={styles.text}>
          <Text style={styles.title}>
            {data.title.slice(0, 60)}
            {data.title.length > 60 ? '...' : ''}
          </Text>
          <Text style={styles.content}>{data.content.slice(0, 67)}...</Text>
          <View style={styles.time}>
            <Image
              style={styles.clock}
              source={require('../../assets/Time.png')}
            />
            <Text>{formattedTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    justifyContent: 'space-between',
  },
  title: {
    width: Dimensions.get('window').width - 16 - 120,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  content: {
    width: Dimensions.get('window').width - 16 - 120,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#4E4B66',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clock: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
});
