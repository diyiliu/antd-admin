import request from "../request";

export const vehList = (data) => {
  return request({
    url: "/veh/list",
    method: "post",
    data,
  });
};

export const vehSave = (data) => {
  return request({
    url: "/veh",
    method: "post",
    data,
  });
};

export const vehDel = (data) => {
  return request({
    url: `/veh/${data}`,
    method: "delete"
  });
};

export const vehGet = (data) => {
  return request({
    url: `/veh/${data}`,
    method: "get"
  });
};