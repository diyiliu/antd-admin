import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Switch } from "antd";

const PageModal = ({ visible, setVisible, ...item }) => {
  const { title, type, fields = [], values = {}, save } = item;
  const [form] = Form.useForm();

  useEffect(() => {
    if ("update" === type) {
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onFinish = (values) => {
    save(values);
  };

  const handleOk = (e) => {
    form.submit();
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
    // form.resetFields();
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const formIn = (type, field) => {
    if ("text" === type) {
      return <Input />;
    }

    if ("textarea" === type) {
      return <Input.TextArea />;
    }

    if ("switch" === type) {
      return <Switch />;
    }

    if ("select" === type) {
      const { options = [] } = field;
      return (
        <Select>
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
  };

  return (
    <Modal
      title={"create" === type ? "新增" + title : "修改" + title}
      visible={visible}
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

export default PageModal;
