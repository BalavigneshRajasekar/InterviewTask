/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { Modal, Tag } from "antd";
import EmployeeTable from "./EmployeeTable";

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      role: localStorage.getItem("role"),
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

  return (
    <div>
      <div>
        <Navbar
          fluid
          rounded
          className="bg-gradient-to-r from-pink-500 to-blue-500"
        >
          <div>
            <h5 className="font-black">GreyTHR</h5>
          </div>
          <div className="flex md:order-2">
            <Tag
              color={user.role == "admin" ? "red-inverse" : "green-inverse"}
              style={{ height: "20px" }}
            >
              {user.role}
            </Tag>
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
              <Button color="failure" onClick={() => setIsModalOpen(true)}>
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

      {/* Employee card and forms */}
      <div className="container">
        <EmployeeTable />
      </div>
    </div>
  );
}

export default Home;
