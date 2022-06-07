import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const CreateView = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const onSubmitHandler = (e, data) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/chores", data, {withCredentials: true})
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
      <br />
      <h3 className="text-3xl font-semibold my-4 mx-8 text-center">Add A Chore</h3>
      <Form 
        onSubmitHandler={onSubmitHandler}
        initialTitle=""
        initialDescription=""
        initialLocation=""
        errors={errors}
        />
    </div>
  );
};

export default CreateView;
