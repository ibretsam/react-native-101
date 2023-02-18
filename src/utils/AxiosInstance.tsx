import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './Constants';

const AxiosIntance = (contentType: string = 'application/json'): any => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = await AsyncStorage.getItem('token');
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      return config;
    },
    (err: any) => Promise.reject(err),
  );
  axiosInstance.interceptors.response.use(
    (res: any) => res.data,
    (err: any) => Promise.reject(err),
  ); // callback
  return axiosInstance;
};

export default AxiosIntance;
