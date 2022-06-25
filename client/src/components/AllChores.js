import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const AllChores = (props) => {
  const { handleDelete, chores } = props;
  const [user, setUser] = useState([]);
  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      const user = jwtDecode(userToken);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <br />
      <h4 className="text-xl">All Chores:</h4>
      <br />
      <table className="min-w-full block p-2 rounded shadow-lg bg-white max-w-sm w-[80%]">
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
              Created By:
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
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap font-light ">
                {" "}
                {chore.createdBy.firstName} {chore.createdBy.lastName}
              </td>
              {user._id === chore.createdBy._id ? (
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex">
                  <Link
                    to={`/view/${chore._id}`}
                    className="text-white border bg-gray-700 border-slate-200 hover:bg-transparent hover:text-black rounded-md w-12 h-7 text-center mx-2"
                  >
                    View
                  </Link>
                  <span> | </span>

                  <Link
                    to={`/edit/${chore._id}`}
                    className=" text-white border bg-gray-700 border-slate-200 hover:bg-transparent hover:text-black rounded-md w-12 h-7 text-center mx-2"
                  >
                    Edit
                  </Link>
                  <span> | </span>
                  <DeleteButton id={chore._id} handleDelete={handleDelete} />
                </td>
              ) : (
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap flex">
                  <Link
                    to={`/view/${chore._id}`}
                    className="text-white border bg-gray-700 border-slate-200 hover:bg-transparent hover:text-black rounded-md w-12 h-7 text-center mx-2"
                  >
                    View
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllChores;
