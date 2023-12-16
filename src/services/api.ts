import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://sandbox.api.lettutor.com',
  timeout: 5000,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

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
