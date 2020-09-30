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
