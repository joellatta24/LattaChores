import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const DetailView = (props) => {
  const { id } = useParams();
  const [chore, setChore] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chores/${id}`)
      .then((res) => {
        setChore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onClickHandler = (e, data) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:8000/api/users/claim/chores`,
        { choreId: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("OUR RESPONSE ", res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm w-[100%]">
        <h4 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {chore.title}
        </h4>
        <p className="text-gray-700 text-base my-4">
          Description: {chore.description}
        </p>
        <p className="text-gray-700 text-base my-4">
          Location: {chore.location}
        </p>
        <p className="text-gray-700 text-base my-4">
          Posted on:
          <span> </span>
          <Moment format="MM/DD/YYYY" date={chore.createdAt} />
        </p>
        {!chore.claimed ? (
          <button
            onClick={onClickHandler}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Add to My Chores
          </button>
        ) : (
          <Link
            to={"/dashboard"}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default DetailView;
