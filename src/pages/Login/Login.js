import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import Iconant from "components/icon/Iconant";
import Cookies from "js-cookie";

import { MainConsumer } from "useContext";
import { login, setToken } from "utils/auth";

const Login = ({ history }) => {
  const [error, setError] = useState(null);

  const RE_USER = "reUser";
  const setCookieUser = (values) => {
    Cookies.set(RE_USER, values, { expires: 1 });
  };
  const removeCookieUser = () => {
    Cookies.remove(RE_USER);
  };

  const [loginForm] = Form.useForm();
  useEffect(() => {
    const user = Cookies.get(RE_USER);
    if (user) {
      const { username, password } = JSON.parse(user);
      loginForm.setFieldsValue({ username, password });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainConsumer>
      {(value) => {
        const { setUser } = value;
        const onFinish = (values) => {
          const { remember } = values;
          login(values).then((res) => {
            const { success, content, message } = res;
            if (success) {
              if (remember) {
                setCookieUser(values);
              } else {
                removeCookieUser();
              }

              const { token, user } = content;
              setToken(token);
              setUser(user);
              history.push("/");
            } else {
              setError(message);
            }
          });
        };

        return (
          <div className="login-page ">
            <div className="hero" />
            <div className="wrapper">
              <div className="auth-box">
                <Form
                  form={loginForm}
                  className="login-form"
                  initialValues={{
                    remember: false,
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
                {error && (
                  <Alert
                    message={error}
                    type="error"
                    showIcon
                    closable
                    onClose={() => {
                      setError(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }}
    </MainConsumer>
  );
};

export default Login;
