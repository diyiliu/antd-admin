import React from "react";
import { Tag } from "antd";

import { roleList, roleSave, roleDelete, roleGet } from "../../utils/api/role";
import TableContainer from "../../components/table/TableContainer";

const Role = () => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "代码",
      dataIndex: "code",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => {
        let o = { color: "green", text: "正常" };
        if (status === 0) {
          o = { color: "volcano", text: "停用" };
        }
        const { color, text } = o;
        return <Tag color={color}>{text}</Tag>;
      }
    }
  ];

  const fields = [
    {
      label: "名称",
      name: "name",
      type: "text",
    },
    {
      label: "代码",
      name: "code",
      type: "text",
    },
    {
      label: "排序",
      name: "sort",
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
    title: "角色",
    options: ["edit", "delete"],
  };

  const crud = {
    fetch: roleList,
    remove: roleDelete,
    save: roleSave,
    get: roleGet,
  };

  return <TableContainer item={item} crud={crud} />;
};

export default Role;
