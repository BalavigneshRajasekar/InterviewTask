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
import EmployeeTable from "./EmployeeTable";

function Home() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [media, setMedia] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editValues, setEditValues] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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
    fetchEmployees();
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

  //Add user model popup
  const addUserForm = () => {
    setEditValues(null);
    setAddUserModal(true);
  };

  // Add media to specific state
  const handleUpload = ({ fileList }) => {
    setMedia(fileList);
  };

  // Add employee to DB
  const onFinish = (values) => {
    setBtnLoading(true);
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
    addEmployee(formData);
  };
  const addEmployee = async (formData) => {
    // API call to add employee to DB
    try {
      const response = await axios.post(
        "https://employee-doco.onrender.com/api/employees/Add",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBtnLoading(false);
      form.resetFields();
      form.resetFields;

      message.success(response.data.message);
      fetchEmployees();
      setAddUserModal(false);
    } catch (error) {
      setBtnLoading(false);
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  const onFinishFailed = () => {};
  //Get all employees from Db
  const fetchEmployees = async () => {
    setCardLoading(true);
    try {
      const response = await axios.get(
        "https://employee-doco.onrender.com/api/employees/get"
      );
      setEmployees(response.data);
      setCardLoading(false);
      console.log(response.data);
    } catch (e) {
      console.error("Failed to fetch employees", e);
      setCardLoading(false);

      message.error(e.response.data.message);
    }
  };

  // Delete employee Function
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `https://employee-doco.onrender.com/api/employees/Delete/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      message.success(response.data.message);
      fetchEmployees();
    } catch (e) {
      message.error(e.response.data.message);
      console.error("Failed to delete employee", e);
    }
  };

  // Edit employee model popup
  const editEmployee = (emp) => {
    setEditValues(emp);
    setAddUserModal(true);
    console.log(editValues);
  };
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
          onClick={() => addUserForm()}
        >
          <PlusCircleOutlined className="text-xl me-2" />
          Add User
        </Button>

        {/* Employee card component */}

        <EmployeeTable
          employees={employees}
          cardLoading={cardLoading}
          deleteEmployee={deleteEmployee}
          editEmployee={editEmployee}
        />

        {/* Modal for adding new user  */}
        <Modal
          title={editValues ? "Edit Employee" : "Add Employee"}
          open={addUserModal}
          onOk={addUser}
          onCancel={cancelAddUser}
        >
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
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
              initialValue={editValues ? editValues.name : ""}
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
              initialValue={editValues ? editValues.email : ""}
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
              initialValue={editValues ? editValues.mobileNumber : ""}
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
              initialValue={editValues ? editValues.gender : ""}
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
              initialValue={editValues ? editValues.designation : ""}
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
                isProcessing={btnLoading}
                type="primary"
                htmlType="submit"
                className="ps-4 pe-4"
                gradientDuoTone="purpleToBlue"
              >
                {editValues ? "Update" : "Add"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
