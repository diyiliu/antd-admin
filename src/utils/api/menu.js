import request from "../request";


const PATH_PREFIX = "/sys/asset";

export const treeAssets = () => {
  return request({
    url: `${PATH_PREFIX}/tree`,
    method: "get",
  });
};

export const assetList = (data) => {
  return request({
    url: `${PATH_PREFIX}/list`,
    method: "post",
    data,
  });
};

export const assetSave = (data) => {
  return request({
    url: `${PATH_PREFIX}`,
    method: "post",
    data,
  });
};

export const assetDelete = (data) => {
  return request({
    url: `${PATH_PREFIX}/delete`,
    method: "post",
    data,
  });
};

export const assetDel = (data) => {
  return request({
    url: `${PATH_PREFIX}/${data}`,
    method: "delete",
  });
};

export const assetGet = (data) => {
  return request({
    url: `${PATH_PREFIX}/${data}`,
    method: "get",
  });
};
