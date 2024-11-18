/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { MailTwoTone, UnlockTwoTone, ContactsTwoTone } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        values
      );
      message.success("Registration Successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      message.error(e.response.data.message);
    }
  };
  const onFinishFailed = () => {};
  return (
    <div>
      <div className="logDiv">
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="userName"
            rules={[
              {
                type: "string",
                message: "Please enter Name!",
                required: true,
              },
            ]}
          >
            <Input
              type="string"
              placeholder="Enter your Name"
              prefix={<ContactsTwoTone />}
            />
          </Form.Item>
          <Form.Item
            name="userEmail"
            rules={[
              {
                type: "email",
                message: "Please input a valid email!",
                required: true,
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your Email"
              prefix={<MailTwoTone />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                type: "Password",
                message: "Please input a valid Password!",
              },
              {
                required: true,
                message: "please enter a password!",
              },
              {
                min: 6,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Enter your password"
              prefix={<UnlockTwoTone />}
            />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              SignUp
            </Button>
          </Form.Item>
        </Form>
        <h6>
          Go to <Link to={"/"}>Login</Link>
        </h6>
      </div>
    </div>
  );
}

export default Register;
