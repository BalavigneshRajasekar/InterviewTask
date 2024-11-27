/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [editValues, setEditValues] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  return (
    <EmployeeContext.Provider
      value={{
        editValues,
        btnLoading,
        employees,
        setEmployees,
        setBtnLoading,
        setEditValues,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
