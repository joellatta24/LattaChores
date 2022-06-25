import React, { useEffect, useState } from "react";
import axios from "axios";
import AllChores from "../components/AllChores";
import MyJobs from "../components/MyJobs";

const IndexView = () => {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/chores")
      .then((res) => {
        setChores(res.data);
      })
      .catch((err) => {
        console.log("Error Retrieving chores!", err);
      });
  }, []);

  const handleDelete = (deletedId) => {
    setChores(chores.filter((chore) => chore._id !== deletedId));
  };

  return (
    <div className="flex justify-evenly align-top pt-5 w-full h-full">
      <div className="overflow-hidden w-[40%]">
        <AllChores handleDelete={handleDelete} chores={chores} />
      </div>
      <div className="overflow-hidden w-[30%]">
        <MyJobs handleDelete={handleDelete} chores={chores} />
      </div>
    </div>
  );
};

export default IndexView;
