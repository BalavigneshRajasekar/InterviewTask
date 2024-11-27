/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Form, Upload, Input, Radio, Select, message } from "antd";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import {
  CloudUploadOutlined,
  ContactsOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

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
function Forms(props) {
  const {
    editValues,
    addUserModal,
    addUser,
    cancelAddUser,
    onFinish,
    onFinishFailed,
    form,
    btnLoading,
    media,
    handleUpload,
  } = props;

  useEffect(() => {
    // If editValues exist, fill form with their values
    console.log("values changed");
    console.log(editValues);
  }, [editValues]);
  return (
    <div>
      {/* Modal for adding new user  */}
      <Modal
        title={editValues ? "Edit Employee" : "Add Employee"}
        open={addUserModal}
        onClose={cancelAddUser}
      >
        <Box sx={style}>
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
              <Button
                type="button"
                className="ps-4 pe-4"
                gradientDuoTone="purpleToBlue"
                onClick={() => cancelAddUser()}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </Modal>
    </div>
  );
}

export default Forms;
