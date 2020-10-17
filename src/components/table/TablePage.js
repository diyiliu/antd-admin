import React, { useEffect } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import Iconant from "../icon/Iconant";

import { withTableConsumer } from "./tableContext";
import TableHead from "./TableHead";
import TableModal from "./TableModal";

const TablePage = ({ item, crud, context }) => {
  const {
    list,
    loading,
    pagination,
    pageChange,
    setCrud,
    setHooks,
    toEdit,
    remove,
  } = context;
  const { page, size, total } = pagination;
  const { columns, fields, title, hooks, options } = item;

  useEffect(() => {
    setCrud(crud);
    setHooks(hooks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modalItem = {
    title,
    fields,
  };

  const initColumns = (columns, options) => {
    const column = {
      title: "操作",
      render: (text, record) => {
        const btns = options.map((o, i) => {
          if ("edit" === o) {
            return (
              <Button
                key={i}
                type="link"
                icon={<Iconant type="EditOutlined" />}
                onClick={() => toEdit(record.id)}
              />
            );
          }

          if ("delete" === o) {
            return (
              <Popconfirm
                key={i}
                title="你确定要删除吗?"
                onConfirm={() => remove([record.id])}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  type="link"
                  danger
                  icon={<Iconant type="DeleteOutlined" />}
                />
              </Popconfirm>
            );
          }

          return <>无</>;
        });

        return <Space>{btns}</Space>;
      },
    };

    return [...columns, column];
  };

  return (
    <div className="ant-page">
      <TableModal {...modalItem} />
      <TableHead />
      <Table
        columns={initColumns(columns, options)}
        loading={loading}
        dataSource={list}
        rowKey="id"
        size={"middle"}
        pagination={{
          onChange: pageChange,
          current: page,
          pageSize: size,
          total: total,
        }}
      />
    </div>
  );
};

export default withTableConsumer(TablePage);
