import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Popconfirm } from "antd";
import Iconant from "../../components/icon/Iconant";
import Page from "../../components/page/Page";
import PageHead from "../../components/page/PageHead";
import PageModal from "../../components/page/PageModal";
import notice from "../../utils/notice";

import { vehList, vehSave, vehDel, vehGet } from "../../utils/api/veh";

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
    {
      title: "操作",
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            icon={<Iconant type="EditOutlined" />}
            onClick={() => {
              toUpdate(record.id);
            }}
          />
          <Popconfirm
            title="你确定要删除吗?"
            onConfirm={() => {
              doDel(record.id);
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<Iconant type="DeleteOutlined" />}
            />
          </Popconfirm>
        </Space>
      ),
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

  const doDel = (id) => {
    vehDel(id).then((res) => {
      const { success, message } = res;
      if (success) {
        notice.open({});
        doSearch({});
      } else {
        notice.open({ type: "error", title: "操作失败", message });
      }
    });
  };

  const save = (params) => {
    let { status = 0 } = params;
    if (status) {
      status = 1;
    } else {
      // status = 0;
    }

    let data = { ...params, status };

    const { values } = modalItem;
    const { id } = values;
    if (id) {
      data = { ...data, id };
    }

    vehSave(data).then((res) => {
      const { success, message } = res;
      if (success) {
        notice.open({});
        setParam({ ...param, criteria: {} });
        fetch();
      } else {
        notice.open({ type: "error", title: "操作失败", message });
      }
    });
  };

  const initialModal = {
    title: "车辆",
    type: "create",
    fields: [
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
    ],
    values: {},
    showModal: false,
    save,
  };

  const [modalItem, setModalItem] = useState(initialModal);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, size: 10, total: 0 });
  // const [sort, setSort] = useState([]);
  const [param, setParam] = useState({ ...pagination, sort: [], criteria: {} });

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  const changePage = (page, filters, sorter) => {
    setParam({ ...param, page });
  };

  const doSearch = (values) => {
    const { search } = values;
    setParam({ ...param, criteria: { search } });
  };

  const fetch = () => {
    setLoading(true);
    const data = { ...param };
    vehList(data).then((res) => {
      setLoading(false);

      const { content } = res;
      setDataList(content.data);

      const { page, size, total } = content;
      setPagination({
        page,
        size,
        total,
      });
    });
  };

  const toAdd = () => {
    setModalItem({
      ...initialModal,
      showModal: "true",
    });
  };

  const toUpdate = (id) => {
    vehGet(id).then((res) => {
      const { success, content } = res;
      if (success) {
        setModalItem({
          ...initialModal,
          type: "update",
          showModal: "true",
          values: content,
        });
      }
    });
  };

  return (
    <Page>
      <PageHead submit={doSearch} addItem={toAdd} />
      <PageModal
        visible={modalItem.showModal}
        setVisible={() => {
          setModalItem({ ...initialModal });
        }}
        {...modalItem}
      />
      <Table
        columns={columns}
        loading={loading}
        dataSource={dataList}
        pagination={{
          onChange: changePage,
          current: pagination["page"],
          pageSize: pagination["size"],
          total: pagination["total"],
        }}
        rowKey="id"
        size={"middle"}
      />
    </Page>
  );
};

export default Truck;
