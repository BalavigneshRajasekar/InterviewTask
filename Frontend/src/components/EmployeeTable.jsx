/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Avatar, Card, Empty, Flex, Badge, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { Form, Upload, Input, Radio, Select, message, Modal } from "antd";
import { Button } from "flowbite-react";

import {
  CloudUploadOutlined,
  ContactsOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { EmployeeContext } from "../context/EmployeeContext";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function EmployeeTable(props) {
  // const [form] = Form.useForm();

  const [addUserModal, setAddUserModal] = useState(false);
  const [media, setMedia] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);
  const {
    editValues,
    setEditValues,
    btnLoading,
    setBtnLoading,
    employees,
    setEmployees,
  } = useContext(EmployeeContext);

  // fetch employees data from API
  useEffect(() => {
    fetchEmployees();
  }, [editValues]);

  //Add user model ok button
  const addUser = () => {
    setAddUserModal(false);
  };

  // Add user Model Cancel button
  const cancelAddUser = () => {
    setEditValues(null);
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
  const onAddFinish = (values) => {
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

    addEmployee(formData);
  };

  // API call to add employee to DB
  const addEmployee = async (formData) => {
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

      message.success(response.data.message);
      fetchEmployees();
      setMedia([]);
      setAddUserModal(false);
    } catch (error) {
      setBtnLoading(false);
      message.success(error.response.data.message);
      console.log(error.message);
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
    } catch (e) {
      console.error("Failed to fetch employees", e);
      setCardLoading(false);

      message.error(e.response.data.message);
    }
  };

  // Delete employee Function
  const deleteEmployee = async (id) => {
    setDeleteBtnLoading(true);
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
      setDeleteBtnLoading(false);
      fetchEmployees();
    } catch (e) {
      message.error(e.response.data.message);
      setDeleteBtnLoading(false);
      console.error("Failed to delete employee", e);
    }
  };

  // Edit employee model popup
  const editEmployee = (emp) => {
    setEditValues(emp);
    setAddUserModal(true);
    console.log(emp);

    console.log(editValues);
  };
  // Edit employee and add to Db
  const onEditFinish = (values) => {
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

    edit(formData);
  };
  // Make API call to add employee to DB
  const edit = async (formdata) => {
    try {
      const response = await axios.put(
        `https://employee-doco.onrender.com/api/employees/edit/${editValues._id}`,
        formdata,

        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setBtnLoading(false);

      message.success(response.data.message);
      fetchEmployees();
      setAddUserModal(false);
    } catch (error) {
      setBtnLoading(false);
      message.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={
          localStorage.getItem("role") == "admin" ? "d-block" : "d-none"
        }
      >
        <Button
          gradientDuoTone="greenToBlue"
          className="mt-10"
          onClick={() => addUserForm()}
        >
          <PlusCircleOutlined className="text-xl me-2" />
          Add User
        </Button>
      </div>
      <div className="mt-5">
        <Flex gap="middle" align="center" justify="center" wrap>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <Badge.Ribbon text={emp.designation} key={index} color="green">
                <Card
                  loading={cardLoading}
                  hoverable
                  actions={
                    localStorage.getItem("role") == "admin"
                      ? [
                          <EditOutlined
                            key="edit"
                            onClick={() => editEmployee(emp)}
                            style={{ color: "green" }}
                          />,
                          <DeleteOutlined
                            key="setting"
                            style={{ color: "red" }}
                            onClick={() => deleteEmployee(emp._id)}
                            spin={deleteBtnLoading}
                          />,
                        ]
                      : ""
                  }
                  style={{
                    minWidth: 300,
                    border: "1px solid pink",
                  }}
                >
                  <Card.Meta
                    avatar={<Avatar src={emp.image[0]} size={"large"} />}
                    title={emp.name}
                    description={
                      <>
                        <Tag
                          color={
                            emp.gender == "Male"
                              ? "volcano-inverse"
                              : "purple-inverse"
                          }
                        >
                          {emp.gender}
                        </Tag>
                        <p className="mt-2">
                          <MobileOutlined className="me-2" />
                          +91 {emp.mobileNumber}
                        </p>
                        <p>
                          <MailOutlined className="me-2" />
                          {emp.email}
                        </p>
                        <p></p>
                      </>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            ))
          ) : (
            <Empty description="no employees"></Empty>
          )}
        </Flex>
      </div>
      {/* Modal for adding new user  */}
      <Modal
        title={editValues ? "Edit Employee" : "Add Employee"}
        open={addUserModal}
        onOk={addUser}
        onCancel={cancelAddUser}
        destroyOnClose
      >
        <Form
          onFinish={editValues ? onEditFinish : onAddFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
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
            <Input placeholder="Employee Name" prefix={<ContactsOutlined />} />
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
            initialValue={editValues ? editValues.gender : ""}
            label="Gender"
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
            initialValue={editValues ? editValues.designation : ""}
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
              isProcessing={btnLoading}
              type="submit"
              className="ps-4 pe-4"
              gradientDuoTone="purpleToBlue"
            >
              {editValues ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EmployeeTable;
