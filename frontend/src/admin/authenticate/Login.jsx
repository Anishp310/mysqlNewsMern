import React, { useState } from "react";
import AuthForm from "../common/AuthForm.jsx"; // Adjust the path accordingly
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import SummaryApi from "../../API/Api.js";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    try {
      const payload = { email: data.email, password: data.password };
      const response = await fetch(SummaryApi.LoginApi.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const jsonData = await response.json();
      if (!response.ok) {
        toast.error("Email or Password is not correct");
        return;
      }
      toast.success("login Successful");
    
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("userData", JSON.stringify(jsonData.user));
  
     
      navigate("/admin");
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <>
   <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
        <Toaster position="top-right" />
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <AuthForm
      title="Please Login"
      onSubmit={handleLoginSubmit}
      formFields={[
        { name: "email", type: "email", placeholder: "Email Address", validation: { required: "Email is required" } },
        { name: "password", type: "password", placeholder: "Password", validation: { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } } },
      ]}
    />
            {/* Register Link */}
            <p className="align-baseline font-medium mt-4 mb-4 text-sm">
          Haven't an account? Please
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            {" "}
            Register{" "}
          </Link>
        </p>
        <p className="align-baseline font-medium mt-4 mb-4 text-sm">
         
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
          Forgot passowrd ?
          </Link>
        </p>
        <p className="mt-5 text-center text-gray-500 text-xs">
          @2025 Jooneli. All rights reserved.
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
