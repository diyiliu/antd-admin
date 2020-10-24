import React, { useState, useEffect } from "react";
import { Tag, Button } from "antd";
import Iconant from "../../components/icon/Iconant";
import TreeModal from "../../components/modal/TreeModal";
import Notice from "../../utils/notice";

import {
  roleList,
  roleSave,
  roleDelete,
  roleGet,
  roleAsset,
} from "../../utils/api/role";
import { treeAssets } from "../../utils/api/menu";
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
      },
    },
    {
      title: "授权",
      render: (text, record) => {
        return (
          <Button
            type="link"
            icon={<Iconant type="ToolOutlined" style={{ color: "#ffec3d" }} />}
            onClick={() => {
              const { id } = record;
              roleGet(id).then((res) => {
                const { success, content } = res;
                if (success) {
                  const { assetIds } = content;
                  setModalData({ id, keys: assetIds, visible: true });
                }
              });
            }}
          />
        );
      },
    },
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

  const [treeData, setTreeData] = useState([]);
  const [modalData, setModalData] = useState({
    id: null,
    keys: [],
    visible: false,
  });

  const setKeys = (keys) => {
    setModalData({...modalData, keys})
  }

  const initialModal = {
    title: "角色授权",
    treeData,
    handleOk: (keys) => {
      const { id } = modalData;
      roleAsset(id, keys).then((res) => {
        const { success, messsage } = res;
        if (success) {
          setModalData({ id: null, keys: [], visible: false });
          Notice.open();
        } else {
          Notice.open({ type: "error", title: "授权失败", messsage });
        }
      });
    },
    handleCancel: () => {
      setModalData({ id: null, keys: [], visible: false });
    },
    visible: modalData.visible,
    keys: modalData.keys,
    setKeys
  };

  useEffect(() => {
    const treeFormat = (list) => {
      return list.map((i) => {
        const { id, name, children } = i;
        const tree = { key: id, title: name };
        if (children) {
          tree.children = treeFormat(children);
        }
        return tree;
      });
    };

    treeAssets().then((res) => {
      const { success, content } = res;
      if (success) {
        setTreeData(treeFormat(content));
      }
    });
  }, []);

  return (
    <>
      <TreeModal {...initialModal} />
      <TableContainer item={item} crud={crud} />
    </>
  );
};

export default Role;
