import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import "../App.css";

const Main = (props) => {
  const { setIsLoggedIn } = props;
  return (
    <div className="flex justify-center items-center pt-5 w-full h-full ">
      <div className="flex w-80">
        <Register setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className="flex w-80 ml-10">
        <Login setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};

export default Main;
