import React from "react";
import axios from "axios";

const CompleteButton = (props) => {
  const { id, handleDelete } = props;
  const onClickHandler = (e) => {
    axios
      .delete(`http://localhost:8000/api/chores/${id}`)
      .then((res) => {
        console.log(res);
        handleDelete(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button
        onClick={onClickHandler}
        className="mx-2 w-20 h-7 hover:bg-transparent border-slate-200 hover:text-black"
      >
        Complete
      </button>
    </div>
  );
};

export default CompleteButton;
