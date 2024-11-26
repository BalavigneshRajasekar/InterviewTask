/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Avatar, Card, Empty, Flex, Badge } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

function EmployeeTable(props) {
  const { deleteEmployee } = props;
  const edit = (emp) => {
    console.log(emp);
  };

  useEffect(() => {
    // fetch employees data from API

    console.log(props.employees);
  }, []);

  return (
    <>
      <Flex gap="middle" align="center" justify="center" wrap>
        {props.employees.length > 0 ? (
          props.employees.map((emp, index) => (
            <Badge.Ribbon text={emp.designation} key={index}>
              <Card
                loading={props.cardLoading}
                hoverable
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => edit(emp)}
                    style={{ color: "green" }}
                  />,
                  <DeleteOutlined
                    key="setting"
                    style={{ color: "red" }}
                    onClick={() => deleteEmployee(emp._id)}
                  />,
                  <EllipsisOutlined key="ellipsis" style={{ color: "blue" }} />,
                ]}
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
                      <p>{emp.gender}</p>
                      <p>{emp.mobileNumber}</p>
                      <p>{emp.email}</p>
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
    </>
  );
}

export default EmployeeTable;
