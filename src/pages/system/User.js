import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import Notice from "../../utils/notice";

import { userList, userSave, userDelete, userGet } from "../../utils/api/user";
import { allRoles } from "../../utils/api/role";
import TableContainer from "../../components/table/TableContainer";

const User = () => {
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "手机",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
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
      },
    },
  ];

  const initFields = async () => {
    const res = await allRoles();
    const { success, content, message } = res;

    let roles = []
    if (success) {
      roles = content.map(r => {
        const {id, name} = r;
        return {name, value: id}
      });
    } else {
      Notice.open({ type: "error", title: "数据初始化失败", message });
    }

    const fields = [
      {
        label: "用户名",
        name: "username",
        type: "text",
      },
      {
        label: "姓名",
        name: "name",
        type: "text",
      },
      {
        label: "手机",
        name: "phone",
        type: "text",
      },
      {
        label: "邮箱",
        name: "email",
        type: "text",
      },
      {
        label: "角色",
        name: "roles",
        type: "select",
        options: roles
      },
      {
        label: "状态",
        name: "status",
        type: "switch",
      },
    ];

    setFields(fields);
  };

  const [fields, setFields] = useState([]);
  useEffect(() => {
    initFields();
  }, []);

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
    title: "用户",
    options: ["edit", "delete"],
  };

  const crud = {
    fetch: userList,
    remove: userDelete,
    save: userSave,
    get: userGet,
  };

  return <TableContainer item={item} crud={crud} />;
};

export default User;
