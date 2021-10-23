import axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';
import { getToken } from './token';

const URL = 'https://8.react.pages.academy/wtw';
const TIMEOUT = 5000;

enum HttpCode {
  Unauthorized = 401,
}

type onUnautharizedCallback = () => void;

export const createAPI = (onUnautharized: onUnautharizedCallback): AxiosInstance => {
  const api = axios.create({ timeout: TIMEOUT, baseURL: URL });
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { response } = error;
      if (response?.status === HttpCode.Unauthorized) {
        return onUnautharized();
      }
      return Promise.reject(error);
    });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    });

  return api;
};
