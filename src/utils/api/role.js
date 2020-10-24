import request from "../request";

const PATH_PREFIX = "/sys/role";

export const roleAsset = (id, data) => {
  return request({
    url: `${PATH_PREFIX}/asset/${id}`,
    method: "post",
    data,
  });
};

export const allRoles = () => {
  return request({
    url: `${PATH_PREFIX}/list`,
    method: "get",
  });
};

export const roleList = (data) => {
  return request({
    url: `${PATH_PREFIX}/list`,
    method: "post",
    data,
  });
};

export const roleSave = (data) => {
  return request({
    url: `${PATH_PREFIX}`,
    method: "post",
    data,
  });
};

export const roleDelete = (data) => {
  return request({
    url: `${PATH_PREFIX}/delete`,
    method: "post",
    data,
  });
};

export const roleDel = (data) => {
  return request({
    url: `${PATH_PREFIX}/${data}`,
    method: "delete",
  });
};

export const roleGet = (data) => {
  return request({
    url: `${PATH_PREFIX}/${data}`,
    method: "get",
  });
};
