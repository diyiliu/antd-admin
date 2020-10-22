import React, { useEffect, useContext } from "react";
import { TableContext } from "./tableContext";
import { Modal, Form, Input, InputNumber, Select, Switch, TreeSelect } from "antd";

const TableModal = ({ title, fields = [] }) => {
  const context = useContext(TableContext);
  const { showModal, setShowModal, values, modalType, save } = context;
  const [form] = Form.useForm();

  useEffect(() => {
    if ("update" === modalType) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const onFinish = (values) => {
    save(values);
  };

  const handleOk = (e) => {
    form.submit();
    setShowModal(false);
  };

  const handleCancel = (e) => {
    setShowModal(false);
    // form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const formIn = (type, field) => {
    if ("text" === type) {
      const { editable = true } = field;
      if ("update" === modalType && !editable) {
        return <Input disabled />;
      }

      return <Input />;
    }

    if ("number" === type) {
      return <InputNumber />;
    }

    if ("textarea" === type) {
      return <Input.TextArea />;
    }

    if ("switch" === type) {
      return <Switch />;
    }

    if ("select" === type) {
      const { options = [], property = {} } = field;

      return (
        <Select {...property}>
          {options.map((o) => {
            return (
              <Select.Option key={o.name} value={o.value}>
                {o.name}
              </Select.Option>
            );
          })}
        </Select>
      );
    }

    if ("treeSelect" === type) {
      const { property = {} } = field;
      return (
        <TreeSelect {...property}/>
      );
    }
  };

  return (
    <Modal
      getContainer={false}
      title={"create" === modalType ? "新增" + title : "修改" + title}
      visible={showModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="保存"
      cancelText="取消"
    >
      <Form form={form} {...layout} onFinish={onFinish}>
        {fields.map((field, index) => {
          const { name, label, type } = field;
          let props = {
            key: name,
            name,
            label,
          };
          if (type === "switch") {
            props = { ...props, valuePropName: "checked" };
          }
          return <Form.Item {...props}>{formIn(type, field)}</Form.Item>;
        })}
      </Form>
    </Modal>
  );
};

export default TableModal;
