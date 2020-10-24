import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import Iconant from "../../components/icon/Iconant";
import Notice from "../../utils/notice";

import {
  assetList,
  assetSave,
  assetDelete,
  assetGet,
  treeAssets,
} from "../../utils/api/menu";
import TableContainer from "../../components/table/TableContainer";

const Menu = () => {
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
      title: "权限",
      dataIndex: "permission",
    },
    {
      title: "类型",
      dataIndex: "type",
      render: (type) => {
        let o = { color: "green", text: "菜单" };
        if (type === "button") {
          o = { color: "volcano", text: "按钮" };
        }
        const { color, text } = o;
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "图标",
      dataIndex: "icon",
      render: (icon) => {
        if (icon) {
          return <Iconant type={icon} />;
        }
        return <></>;
      },
    },
    {
      title: "排序",
      dataIndex: "sort",
    },
    {
      title: "是否隐藏",
      dataIndex: "hidden",
      render: (hidden) => {
        let o = { color: "#2db7f5", text: "否" };
        if (hidden === 1) {
          o = { color: "#f50", text: "是" };
        }
        const { color, text } = o;
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const buildTree = (menus) => {
    const list = menus.map((r) => {
      const { id, name, children } = r;
      let menu = { title: name, value: id };
      if (children) {
        menu.children = buildTree(children);
      }
      return menu;
    });

    return list;
  };

  const initFields = async () => {
    const res = await treeAssets();
    const { success, content, message } = res;

    let menus = [];
    if (success) {
      menus = buildTree(content);
    } else {
      Notice.open({ type: "error", title: "数据初始化失败", message });
    }

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
        label: "权限",
        name: "permission",
        type: "text",
      },
      {
        label: "父节点",
        name: "pid",
        type: "treeSelect",
        property: {
          treeData: menus,
          placeholder: "请选择",
          allowClear: true,
          treeDefaultExpandAll: true,
        },
      },
      {
        label: "类型",
        name: "type",
        type: "select",
        options: [
          {
            name: "菜单",
            value: "menu",
          },
          {
            name: "按钮",
            value: "button",
          },
        ],
      },
      {
        label: "图标",
        name: "icon",
        type: "text",
      },
      {
        label: "排序",
        name: "sort",
        type: "number",
      },
      {
        label: "是否隐藏",
        name: "hidden",
        type: "switch",
      },
    ];

    setFields(fields);
  };

  const [fields, setFields] = useState([]);

  useEffect(() => {
    initFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hooks = {
    init: () => {
      initFields();
    },
    beforeQuery: (params) => {
      if (params && params.search) {
        const { search } = params;
        return { search };
      }
      return {};
    },
    beforeSave: (params) => {
      let { hidden } = params;
      if (hidden) {
        hidden = 1;
      } else {
        hidden = 0;
      }

      return { ...params, hidden };
    },
  };

  const item = {
    columns,
    fields,
    hooks,
    title: "资源",
    options: ["edit", "delete"],
    paging: {
      size: 100,
    },
  };

  const crud = {
    fetch: assetList,
    remove: assetDelete,
    save: assetSave,
    get: assetGet,
  };

  return <TableContainer item={item} crud={crud} />;
};

export default Menu;
