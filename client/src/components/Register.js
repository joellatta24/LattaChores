import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const { setIsLoggedIn } = props;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error in registration", err.response);
        setErrors(err.response.data.errors);
        console.log("register error:", errors);
      });
  };
  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h3 className="text-2xl text-center mb-4">Create Account</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="firstName"
          >
            First Name:{" "}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            id="firstName"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="lastName"
          >
            Last Name:{" "}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            type="text"
            name="lastName"
            id="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password:{" "}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <br />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
