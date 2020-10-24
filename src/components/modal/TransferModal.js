import React, { useState } from "react";
import { Modal } from "antd";
import TransferTree from "../transfer/TransferTree";

const TransferModal = ({
  treeData,
  title,
  visible,
  handleOk,
  handleCancel,
  handleChange,
}) => {
  const [targetKeys, setTargetKeys] = useState([]);

  const onChange = (keys) => {
    handleChange(keys);
    setTargetKeys(keys);
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <TransferTree
        dataSource={treeData}
        targetKeys={targetKeys}
        onChange={onChange}
      />
    </Modal>
  );
};

export default TransferModal;
