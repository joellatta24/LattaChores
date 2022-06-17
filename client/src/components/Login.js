import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { setIsLoggedIn } = props;
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("Error in Login", err.response.data.message);
        setErrors(err.response.data.message);
        console.log("attempt to set Errors", errors);
      });
  };
  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl mb-4 text-center">Log In</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="email-login"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="email"
            name="email"
            id="email-login"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm mb-2"
            htmlFor="password-login"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            type="password"
            name="password"
            id="password-login"
            value={user.password}
            onChange={handleChange}
          />
          {errors && <p>{errors}</p>}
        </div>
        <div className="flex justify-between items-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
