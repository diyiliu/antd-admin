import React from "react";
import { Modal, Tree } from "antd";

const TreeModal = ({
  treeData,
  keys = [],
  setKeys,
  title = "",
  visible,
  handleOk,
  handleCancel,
}) => {

  const onCheck = (checkedKeys) => {
    setKeys(checkedKeys);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => {
        handleOk(keys);
      }}
      onCancel={handleCancel}
    >
      {treeData.length > 0 && (
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={keys}
          onCheck={onCheck}
          treeData={treeData}
        />
      )}
    </Modal>
  );
};

export default TreeModal;
