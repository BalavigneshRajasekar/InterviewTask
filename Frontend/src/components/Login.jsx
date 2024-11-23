/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Checkbox, Form, Input, message } from "antd";
import { MailTwoTone, UnlockTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "flowbite-react";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Login",
        values
      );
      message.success(response.data.message);
      localStorage.setItem("token", response.data.data);
      navigate("/home");
    } catch (e) {
      message.error(e.response.data.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="h-full">
        <div className="logDiv">
          <h2 className="font-black mb-4 border-b-2 pb-6 border-pink-400">
            SignIN
          </h2>
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                  message: "Please input your Password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long!",
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
              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                className="mt-2"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <h6 className="font-black">
              Don't have an account <Link to={"/register"}>Signup</Link>{" "}
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
