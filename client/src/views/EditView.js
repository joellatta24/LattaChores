import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "../components/Form";
import axios from "axios";

const EditView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [chore, setChore] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chores/${id}`)
      .then((res) => {
        setChore(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const onSubmitHandler = (e, data) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/chores/${id}`, data)
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <div>
      <h4 className="text-3xl font-semibold my-4 mx-8 text-center">Editing: {chore.title}</h4>
      <div>
        {loaded && (
          <Form
          onSubmitHandler={onSubmitHandler}
          initialTitle={chore.title}
          initialDescription={chore.description}
          initialLocation={chore.location}
          errors={errors}
          />
        )}
      </div>
    </div>
  );
};

export default EditView;
