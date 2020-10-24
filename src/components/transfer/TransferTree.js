import React from "react";
import { Transfer, Tree } from "antd";

const TransferTree = ({ dataSource, targetKeys, ...restProps }) => {
  const generateTree = (treeNodes = [], checkedKeys = []) => {
    return treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key),
      children: generateTree(children, checkedKeys),
    }));
  };

  const isChecked = (selectedKeys, eventKey) => {
    return selectedKeys.indexOf(eventKey) !== -1;
  };

  const transferDataSource = [];
  function flatten(list = [], parent = 0) {
    list.forEach((item) => {
      transferDataSource.push({ ...item, parent });
      flatten(item.children, item.key);
    });
  }
  flatten(dataSource);

  const findChildren = (key) => {
    const children = transferDataSource.filter((d) => d.parent === key);
    return children.map((child) => child.key);
  };

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title}
      showSelectAll={false}
    >
      {({ direction, onItemSelect, onItemSelectAll, selectedKeys }) => {
        if (direction === "left") {
          const checkedKeys = [...selectedKeys, ...targetKeys];
          return (
            <Tree
              blockNode
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              treeData={generateTree(dataSource, targetKeys)}
              onCheck={(_, { node: { key } }) => {
                const flag = !isChecked(checkedKeys, key);
                const children = findChildren(key);
                onItemSelectAll([key, ...children], flag);
              }}
              onSelect={(_, { node: { key } }) => {
                const flag = !isChecked(checkedKeys, key);
                const children = findChildren(key);
                onItemSelectAll([key, ...children], flag);
              }}
            />
          );
        }
      }}
    </Transfer>
  );
};

export default TransferTree;
