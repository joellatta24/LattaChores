import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompleteButton from "./CompleteButton";

const MyJobs = (props) => {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/chores/", { withCredentials: true })
      .then((res) => {
        setChores(res.data.claimedChores);
      })
      .catch((err) => {
        console.log("User Chores Err", err);
      });
  }, []);

  const handleDelete = (deletedId) => {
    setChores(chores.filter((chore) => chore._id !== deletedId));
  };

  return (
    <div>
      <br />
      <h4 className="text-xl">My Chores:</h4>
      <br />
      <table className="min-w-full block p-2 rounded shadow-lg bg-white max-w-sm align-middle">
        <thead className="bg-white border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Job:
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Location:
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Actions:
            </th>
          </tr>
        </thead>
        <tbody>
          {chores.map((chore, index) => (
            <tr
              key={index}
              className={
                "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              }
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {chore.title}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-light ">
                {chore.location}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex items-center">
                <Link
                  to={`/view/${chore._id}`}
                  className="mr-2 text-white border bg-gray-700 border-slate-200 hover:bg-transparent hover:text-black rounded-md w-12 h-7 text-center"
                >
                  View
                </Link>
                <span> | </span>
                <CompleteButton id={chore._id} handleDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyJobs;
