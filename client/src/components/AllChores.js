import React from "react";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

const AllChores = (props) => {
  const { handleDelete, chores } = props;
  return (
    <div>
      <table className="min-w-full">
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
                  className="mr-2 text-white border bg-gray-700 border-indigo-600 hover:bg-transparent hover:text-black rounded-md w-12 h-7 text-center"
                >
                  View
                </Link>
                <span> | </span>
                <Link
                  to={`/edit/${chore._id}`}
                  className="mx-2 text-white border bg-gray-700 border-indigo-600 hover:bg-transparent hover:text-black rounded-md w-12 h-7 text-center"
                >
                  Edit
                </Link>
                <span> | </span>
                <DeleteButton id={chore._id} handleDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllChores;
