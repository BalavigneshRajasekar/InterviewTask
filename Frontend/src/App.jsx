/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import EmployeeProvider from "./context/EmployeeContext";

function App() {
  return (
    <>
      <EmployeeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </EmployeeProvider>
    </>
  );
}

export default App;
