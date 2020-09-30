import axios from "axios";
import { message } from "antd";
import config from "./config";

// 创建axios实例
const url = config.baseUrl;
const service = axios.create({
  baseURL: url, // base_url
  timeout: 30000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => {
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
      if (status === 400 || status === 401) {
        const { message } = error.response.data;
        message.error(`请求失败: ${message}`);
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
