import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const JSON_HEADER = {'Content-Type': 'application/json'};
export const FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data'};
import {REACT_APP_DEV_API_URL} from '@env';

export const instance = axios.create({
  baseURL: REACT_APP_DEV_API_URL,
  timeout: 5000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    ...JSON_HEADER,
  },
});

instance.interceptors.request.use(
  async config => {
    const token: any = await EncryptedStorage.getItem('user_session');
    if (token) {
      if (config.data instanceof FormData) {
        // eslint-disable-next-line no-param-reassign
        const headers: any = {
          ...FORM_DATA_HEADER,
        };
        config.headers = {
          ...headers,
        };
      }
      config.headers.Authorization = `Bearer ${JSON.parse(token).accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  error => Promise.reject(error),
);

export const get = async (url: string, config = {}) => {
  try {
    const res = await instance.get(url, config);
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    const {data} = error.response;
    return {
      success: false,
      message: data.message,
    };
  }
};

export const post = async (url: string, body: any, config = {}) => {
  try {
    const res: any = await instance.post(url, body, config);
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    const {data} = error.response;
    return {
      success: false,
      message: data.message,
    };
  }
};

export const put = async (url: string, body: any, config = {}) => {
  try {
    const res: any = await instance.put(url, body, config);
    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    const {data} = error.response;
    return {
      success: false,
      message: data.message,
    };
  }
};
