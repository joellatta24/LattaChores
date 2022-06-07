import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
  const navigate = useNavigate();
  const {
    onSubmitHandler,
    initialTitle,
    initialDescription,
    initialLocation,
    errors,
  } = props;
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [location, setLocation] = useState(initialLocation);

  const handleCancel = (e) => {
    navigate("/dashboard");
  };

  return (
    <div className="justify-center flex">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[50%]"
        onSubmit={(e) => {
          onSubmitHandler(e, {
            title,
            description,
            location,
          });
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={title}
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={description}
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={location}
            id="location"
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && <p>{errors.location.message}</p>}
        </div>
        <div>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
