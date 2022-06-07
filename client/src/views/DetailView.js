import React, {useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import axios from "axios";



const DetailView = () => {
  const {id} = useParams();
  const [chore, setChore ] = useState({});
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/chores/${id}`)
    .then((res) => {
      setChore(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [id])

  return (
  <div className="flex justify-center">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm w-[100%]">
        <h4 className="text-gray-900 text-xl leading-tight font-medium mb-2">{chore.title}</h4>
        <p className="text-gray-700 text-base my-4">{chore.description}</p>
        <p className="text-gray-700 text-base my-4">{chore.location}</p>
        <p className="text-gray-700 text-base my-4">{chore.createdAt}</p>
        <p></p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add to my Jobs</button>
      </div>
  </div> 
  );
};

export default DetailView;
