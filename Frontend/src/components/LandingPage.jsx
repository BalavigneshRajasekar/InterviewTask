/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Button } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-14 ">
        <h6 className="text-right ">
          Don't Have an account ?{" "}
          <span
            className="border-2 p-2 rounded border-pink-400 cursor-pointer hover:bg-pink-400"
            onClick={() => navigate("/register")}
          >
            Create One
          </span>
        </h6>
      </div>
      <div className="container mt-32 ">
        <h1 className="font-black text-5xl">Welcome To</h1>
        <h1 className="font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-700">
          User Management Dashboard
        </h1>
        <p className="font-medium mt-24 max-w-2xl text-left tracking-wide">
          Imagine you are task is to managing users, roles, and permissions. The
          goal is to provide an user-friendly interface where administrators can
          assign roles, define permissions, and manage users efficiently.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="mt-10"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </>
  );
}

export default LandingPage;
