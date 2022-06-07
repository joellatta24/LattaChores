import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [user, setUser] = useState(null);
  const { isLoggedIn } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/logout", {}, { withCredentials: true })
      .then((res) => {
        Cookies.remove("userToken");
        setUser(null);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleCreate = () => {
    navigate("/new");
  };

  return (
    <div className="bg-indigo-600 h-20 justify-evenly flex drop-shadow-lg">
      <div className="items-center mt-2">
        <h1 className="text-white text-3xl text-center mt-1">Latta Chores</h1>
      </div>
      <div>
        {user ? (
          <div className="flex w-full justify-center items-center mt-2">
            <p className="text-white mr-4 text-xl">Welcome back, {user.firstName}!</p>
            <NavLink to="/dashboard" className={'bg-gray-700 text-white px-8 py-3 mr-4 rounded-md hover:bg-transparent hover:text-indigo-600'}>
              Home
            </NavLink>
            <button className="bg-gray-700 text-white px-8 py-3 mr-4" onClick={handleCreate}>Add Job</button>
            <button className="bg-gray-700 text-white px-8 py-3 mr-4" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="mt-5">
            <NavLink to="/" className={'bg-gray-700 text-white px-8 py-3 mr-4 rounded-md hover:bg-transparent hover:text-indigo-600'}>
              Home
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
