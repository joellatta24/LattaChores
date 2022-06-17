import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/solid";

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
    <div className="bg-indigo-600 w-[100%] h-20 justify-between flex drop-shadow-lg items-center">
      <div className="items-center ml-6 flex">
        <TrashIcon className="text-white h-10 w-10" />
        <h1 className="text-white text-3xl text-center ml-4 mt-1">
          Latta Chores
        </h1>
      </div>
      <div>
        {user ? (
          <div className="flex w-full mr-2 items-center">
            <p className="text-white mr-4 text-lg">
              Welcome back, {user.firstName}!
            </p>
            <button
              className="bg-gray-700 text-white px-2 py-1 mr-4 text-md"
              onClick={handleCreate}
            >
              Add Chore
            </button>
            <button
              className="bg-gray-700 text-white px-2 py-1 mr-4 text-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
