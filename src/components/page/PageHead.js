import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Iconant from "../icon/Iconant";

const PageHead = ({ submit, addItem }) => {
  const [form] = Form.useForm();

  const [expand, setExpand] = useState(false);

  const onReset = () => {
    form.resetFields();
    submit({ search: "" });
  };

  return (
    <div className="page-head">
      <Form form={form} onFinish={submit}>
        <Row justify="space-between">
          <Col span={16}>
            <Form.Item name="search">
              <Input placeholder="请输入" style={{ display: "inline-block" }} />
            </Form.Item>
          </Col>

          <Col className="btn-group">
            <Button
              type="primary"
              htmlType="submit"
              icon={<Iconant type="SearchOutlined" />}
            >
              查询
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
            <Button
              type="text"
              danger
              icon={<Iconant type="SettingOutlined" />}
              onClick={() => {
                setExpand(!expand);
              }}
            />
          </Col>
        </Row>
      </Form>
      {expand && (
        <Row justify="space-between">
          <Col>
            <Button
              className="btn-danger"
              htmlType="button"
              icon={<Iconant type="PlusCircleOutlined" />}
              onClick={addItem}
            >
              新增
            </Button>
          </Col>
          <Col className="btn-group">
            <Button htmlType="button" onClick={onReset}>
              导入
            </Button>
            <Button htmlType="button" onClick={onReset}>
              导出
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PageHead;
