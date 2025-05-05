import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [passwordShown, setPasswordShown] = useState({ pass1: false, pass2: false });

  const togglePasswordVisibility = (field) => {
    setPasswordShown((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const validateForm = async (e) => {
    e.preventDefault();
    const email = document.getElementById("Signup-email").value;
    const pass1 = document.getElementById("Signup-pass1").value;
    const pass2 = document.getElementById("Signup-pass2").value;
    
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\W)[A-Za-z\W\d]{8,}$/;
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid Gmail address (e.g., yourname@gmail.com).");
      return;
    }
    if (!passwordPattern.test(pass1)) {
      alert(
        "Password must be at least 8 characters long and contain at least one letter and one special character."
      );
      return;
    }

    if (pass1 !== pass2) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_BACKEND}/signup`, { email, pass1: pass1 , pass2:pass2 });
      if (response.status === 200) {
        alert("User registered successfully");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Sign Up</h1>
        <form onSubmit={validateForm}>
          <div className="mb-4">
            <label
              htmlFor="Signup-email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="Signup-email"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="Signup-pass1"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type={passwordShown.pass1 ? "text" : "password"}
              id="Signup-pass1"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-gray-600"
              style={{top:'2.1rem'}}
              onClick={() => togglePasswordVisibility("pass1")}
            >
              {passwordShown.pass1 ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="Signup-pass2"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type={passwordShown.pass2 ? "text" : "password"}
              id="Signup-pass2"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 text-gray-600"
              style={{top:'2.1rem'}}
              onClick={() => togglePasswordVisibility("pass2")}
            >
              {passwordShown.pass2 ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
