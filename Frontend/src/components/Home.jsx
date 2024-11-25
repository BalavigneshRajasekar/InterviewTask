/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Form, Modal, Upload, Input, Radio, Select, message } from "antd";
import {
  CloudUploadOutlined,
  ContactsOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [media, setMedia] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", role: "" });

  // Fetch user details when component mounts
  useEffect(() => {
    // Verify token is there r not
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    setUser({
      ...user,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    });
  }, []);

  // Confirm handle the signout once user click on ok in the model
  const confirm = (e) => {
    localStorage.removeItem("token");
    setIsModalOpen(false);
    navigate("/");
  };

  const cancel = (e) => {
    setIsModalOpen(false);
  };

  const addUser = () => {
    setAddUserModal(false);
  };
  const cancelAddUser = () => {
    setAddUserModal(false);
  };

  // Add media to specific state
  const handleUpload = ({ fileList }) => {
    setMedia(fileList);
  };

  // Add employee to DB
  const onFinish = (values) => {
    // Get employees and add it to Form data Object
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    // Add media file to form data
    media.forEach((file) => {
      formData.append("media", file.originFileObj);
    });
    // Make API call to add employee to DB
    addEmployee(formData, values);
  };
  const addEmployee = async (formData, values) => {
    // API call to add employee to DB
    try {
      const response = await axios.post(
        "https://employee-doco.onrender.com/api/employees/Add",
        formData
      );
      message.success(response.data.message);
      setTimeout(() => {
        // Reset form
        setMedia([]);
        values = {};
      }, 2000);
    } catch (error) {
      message.error("Failed to add employee");
      console.log(error);
    }
  };
  const onFinishFailed = () => {};
  return (
    <div>
      <div>
        <Navbar
          fluid
          rounded
          className="bg-gradient-to-r from-pink-500 to-blue-500"
        >
          <div>
            <h5 className="font-black">Dashboard</h5>
          </div>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img="" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.name}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Button danger onClick={() => setIsModalOpen(true)}>
                Signout
              </Button>
            </Dropdown>
          </div>
        </Navbar>

        {/*Model for signout popup */}
        <Modal
          title="Sign Out"
          onOk={confirm}
          onCancel={cancel}
          open={isModalOpen}
        >
          <p>are you sure want to signout ?</p>
        </Modal>
      </div>
      <div className="container">
        <Button
          gradientDuoTone="greenToBlue"
          className="mt-10"
          onClick={() => setAddUserModal(true)}
        >
          <PlusCircleOutlined className="text-xl me-2" />
          Add User
        </Button>
        {/* Modal for adding new user */}
        <Modal
          title="Add User"
          open={addUserModal}
          onOk={addUser}
          onCancel={cancelAddUser}
        >
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              label="Upload picture"
              rules={[
                {
                  required: true,
                  message: "Plz select the employee picture",
                },
                {
                  max: 2 * 1024 * 1024, // 2MB
                  message: "File size should be less than or equal to 2MB",
                },
              ]}
            >
              <Upload
                fileList={media}
                beforeUpload={() => false}
                onChange={handleUpload}
                accept=".jpg,.png,.jpeg"
              >
                <Button>
                  <CloudUploadOutlined className="text-2xl" />
                </Button>
              </Upload>
              <p>
                Only jpg, png, and jpeg images are allowed. Maximum file size is
                2MB.
              </p>
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  type: "string",
                  message: "Enter the employee Name",
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Employee Name"
                prefix={<ContactsOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Enter the employee email",
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Employee Email"
                type="email"
                prefix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="mobileNumber"
              rules={[
                {
                  type: "string",
                  message: "Enter the employee Number",
                  required: true,
                },
                {
                  type: "string",
                  message: "Enter valid mobile number",

                  min: 10,
                  max: 10,
                },
              ]}
            >
              <Input
                placeholder="Employee Number"
                prefix={<ContactsOutlined />}
                type="number"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              initialValue=""
              placeholder="Select Gender"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "plz Select the gender",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="Male"> Male </Radio>
                <Radio value="Female"> Female </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="designation"
              label="Designation"
              rules={[
                {
                  type: "string",
                  required: true,
                  message: "Plz Select the designation",
                },
              ]}
            >
              <Select>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="developer">Developer</Select.Option>
                <Select.Option value="intern">Intern</Select.Option>
                <Select.Option value="trainee">Trainee</Select.Option>
                <Select.Option value="Tester">Tester</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                isProcessing={false}
                type="primary"
                htmlType="submit"
                className="ps-4 pe-4"
                gradientDuoTone="purpleToBlue"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
