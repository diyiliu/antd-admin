import request from "../request";

const PATH_PREFIX = "/sys/user";

export const userList = (data) => {
  return request({
    url: `${PATH_PREFIX}/list`,
    method: "post",
    data,
  });
};

export const userSave = (data) => {
  return request({
    url: `${PATH_PREFIX}`,
    method: "post",
    data,
  });
};

export const userDelete = (data) => {
  return request({
    url: `${PATH_PREFIX}/delete`,
    method: "post",
    data,
  });
};

export const userDel = (data) => {
  return request({
    url: `${PATH_PREFIX}/${data}`,
    method: "delete",
  });
};

export const userGet = (data) => {
  return request({
    url: `/sys/user/${data}`,
    method: "get",
  });
};
