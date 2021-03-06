import axios from "axios";
import { message } from "antd";
import config from "./config";

import { getToken, logout } from "./auth";

// 创建axios实例
const url = config.baseUrl;
const service = axios.create({
  baseURL: url, // base_url
  timeout: 30000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const { status } = response;
    if (status < 200 || status > 300) {
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (error) => {
    try {
      const { status } = error.response;
      if (status === 401) {
        message.error("系统未登录，请重新登录");
        logout().then(() => {
          window.location.reload();
        });
        return Promise.reject(error);
      }

      if (status === 403 || status === 404) {
        const msg = error.response.data.message;
        message.error(`请求失败: ${msg}`);
      }
      return Promise.reject(error);
    } catch (e) {
      if (error.toString().indexOf("Error: timeout") !== -1) {
        message.error("网络超时: 请联系管理员");
      }

      if (error.toString().indexOf("Error: Network Error") !== -1) {
        message.error("网络异常: 请联系管理员");
      }

      return Promise.reject("server-error");
    }
  }
);
export default service;
