import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiBaseUrl } from "../baseUrl";
import { LocalStorageUtil } from "../../core/utils/storage.util";
import { JwtUtil } from "../../core/utils/jwt.util";
import { loginRequiredAlert } from "../../core/utils/alert.util";


const publicApi = axios.create({
  baseURL: apiBaseUrl + '/api',
  timeout: 10000,
});
const loginRequiredApi = axios.create({
  baseURL: apiBaseUrl + '/api',
  timeout: 10000,
});
const adminApi = axios.create({
  baseURL: apiBaseUrl + '/api',
  timeout: 10000,
});

publicApi.interceptors.request.use(
  (config) => {
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["ngrok-skip-browser-warning"] = '69420';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

loginRequiredApi.interceptors.request.use(
  async (config) => {
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

    if (token) {
      if (JwtUtil.isTokenValid(token) === false) {

        //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
        await loginRequiredAlert();

        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {

      //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
      await loginRequiredAlert();

      return Promise.reject(new Error('No token found'));
    }
    config.headers["ngrok-skip-browser-warning"] = '69420';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

adminApi.interceptors.request.use(
  async (config) => {
    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();

    if (token) {
      if (JwtUtil.isTokenValid(token) === false) {

        //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
        await loginRequiredAlert();

        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    } else {

      //** CHO HIỆN THÔNG BÁO YÊU CẦU ĐĂNG NHẬP
      await loginRequiredAlert();

      return Promise.reject(new Error('No token found'));
    }
    config.headers["ngrok-skip-browser-warning"] = '69420';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {
  publicApi,
  loginRequiredApi,
  adminApi,
}



