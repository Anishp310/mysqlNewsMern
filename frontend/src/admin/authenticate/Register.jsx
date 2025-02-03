import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import AuthForm from "../common/AuthForm";
import SummaryApi from "../../API/Api";

const Register = () => {

const navigate = useNavigate();

const onSubmithandle = async (data) => {
  // Map the form data to match backend field names
  const payload = {
    username: data.name, // Map "name" to "username"
    email: data.email,
    password: data.password,
  };
console.log(payload)
  try {
    const response = await fetch(SummaryApi.RegisterApi.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
      toast.error(result.message); // Display error message from backend
      return;
    }

    toast.success("Registration successful!");
    navigate("/login");
  } catch (error) {
    toast.error(error.message);
  }
};


//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In triggered");
//     // Simulating Google sign-in action
//     setMessage("Google sign-in triggered.");
//   };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <Toaster position="top-right" />

      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <AuthForm
      title="Please Register"
      onSubmit={onSubmithandle}
      formFields={[
        { name: "name", type: "text", placeholder: "Username", validation: { required: "Username is required" } },
        { name: "email", type: "email", placeholder: "Email Address", validation: { required: "Email is required" } },
        { name: "password", type: "password", placeholder: "Password", validation: { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } } },
      ]}
    />

        {/* Login Link */}
        <p className="align-baseline font-medium mt-4 mb-4 text-sm">
          Already have an account? Please
          <Link to="/admin" className="text-blue-500 hover:text-blue-700">
            {" "}
            Login{" "}
          </Link>
        </p>

        {/* Google Sign-In Button */}
        {/* <div>
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full justify-center bg-blue-500 hover:bg-blue-700 text-white items-center font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div> */}

        {/* Footer */}
        <p className="mt-5 text-center text-gray-500 text-xs">
          @2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
