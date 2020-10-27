import Cookies from "js-cookie";
import Config from "./config";
import request from "./request";

const TOKEN_KEY = Config.tokenKey;

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TOKEN_KEY, token, {
      expires: Config.tokenCookieExpires,
    });
  } else return Cookies.set(TOKEN_KEY, token);
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}

const PATH_PREFIX = "/auth";

export const login = (data) => {
  return request({
    url: `${PATH_PREFIX}/login`,
    method: "post",
    data,
  });
};

export const getUser = () => {
  return request({
    url: `${PATH_PREFIX}/user`,
    method: "get",
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    removeToken();
    resolve();
  });
};
