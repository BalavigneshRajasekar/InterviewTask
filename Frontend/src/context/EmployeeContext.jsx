/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [editValues, setEditValues] = useState(null);

  return (
    <EmployeeContext.Provider value={{ editValues, setEditValues }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
