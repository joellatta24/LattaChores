import React, { useEffect, useState } from "react";
import axios from "axios";
import AllChores from "../components/AllChores";

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
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden w-[50%]">
            <AllChores handleDelete={handleDelete} chores={chores}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexView;
