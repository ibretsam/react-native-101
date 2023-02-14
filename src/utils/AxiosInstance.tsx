import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AxiosIntance = (contentType: string = 'application/json'): any => {
  const axiosInstance = axios.create({
    baseURL: 'https://fpoly-hcm.herokuapp.com/api/',
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
