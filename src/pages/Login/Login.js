import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Iconant from "components/icon/Iconant";
import Notice from "utils/notice";

import { MainConsumer } from "useContext";
import { login } from "utils/auth";

const Login = ({ history }) => {
  return (
    <MainConsumer>
      {(value) => {
        const { loginSuccess } = value;
        const onFinish = (values) => {
          login(values).then((res) => {
            const { success, content, message } = res;
            if (success) {
              loginSuccess(content);
              history.push("/");
            } else {
              Notice.open({ type: "error", title: "登录失败", message });
            }
          });
        };

        return (
          <div className="login-page ">
            <div className="hero" />
            <div className="wrapper">
              <div className="auth-box">
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <Iconant
                          type="UserOutlined"
                          className="site-form-item-icon"
                        />
                      }
                      placeholder="Username"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <Iconant
                          type="LockOutlined"
                          className="site-form-item-icon"
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Button type="link" className="login-form-forgot">
                      Forgot password
                    </Button>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="form-submit"
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </MainConsumer>
  );
};

export default Login;
