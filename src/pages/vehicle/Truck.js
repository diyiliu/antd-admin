import React from "react";
import { Tag } from "antd";

import { vehList, vehSave, vehRemove, vehGet } from "../../utils/api/veh";
import TableContainer from "../../components/table/TableContainer";

const Truck = () => {
  const columns = [
    {
      title: "编号",
      dataIndex: "vehNo",
      render: (text) => <a href="/#">{text}</a>,
    },
    {
      title: "型号",
      dataIndex: "mode",
    },
    {
      title: "制造商",
      dataIndex: "factory",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => statusFormat(status),
    },
  ];
  const statusFormat = (s) => {
    let o = { color: "green", text: "正常" };
    if (s === 0) {
      o = { color: "volcano", text: "停用" };
    }
    const { color, text } = o;
    return <Tag color={color}>{text}</Tag>;
  };

  const fields = [
    {
      label: "编号",
      name: "vehNo",
      type: "text",
    },
    {
      label: "型号",
      name: "mode",
      type: "select",
      options: [
        {
          name: "XDE120",
          value: "XDE120",
        },
        {
          name: "XE1300C",
          value: "XE1300C",
        },
      ],
    },
    {
      label: "制造商",
      name: "factory",
      type: "text",
    },
    {
      label: "状态",
      name: "status",
      type: "switch",
    },
  ];

  const hooks = {
    beforeQuery: (params) => {
      if (params && params.search) {
        const { search } = params;
        return { search };
      }
      return {};
    },
    beforeSave: (params) => {
      let { status } = params;
      if (status) {
        status = 1;
      } else {
        status = 0;
      }

      return { ...params, status };
    },
  };

  const item = {
    columns,
    fields,
    hooks,
    title: "车辆",
    options: ["edit", "delete"],
  };

  const crud = {
    fetch: vehList,
    remove: vehRemove,
    save: vehSave,
    get: vehGet,
  };

  return <TableContainer item={item} crud={crud} />;
};

export default Truck;
