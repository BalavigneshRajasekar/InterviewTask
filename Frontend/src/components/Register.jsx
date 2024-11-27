/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Checkbox, Form, Input, message } from "antd";
import { MailTwoTone, UnlockTwoTone, ContactsTwoTone } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { EmployeeContext } from "../context/EmployeeContext";
function Register() {
  const navigate = useNavigate();
  const { btnLoading, setBtnLoading } = useContext(EmployeeContext);
  const onFinish = async (values) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        values
      );
      message.success(response.data.message);
      setBtnLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e) {
      setBtnLoading(false);
      message.error(e.response.data.message);
    }
  };
  const onFinishFailed = () => {};
  return (
    <div>
      <div className="logDiv">
        <h2 className="font-black mb-4 border-b-2 pb-6 border-pink-400">
          Create Account
        </h2>
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
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="mt-2 ps-4 pe-4"
              isProcessing={btnLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <h6 className="font-black">
          Go to <Link to={"/login"}>Login</Link>
        </h6>
      </div>
    </div>
  );
}

export default Register;
