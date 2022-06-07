import React from 'react';
import axios from 'axios';

const DeleteButton = (props) => {
  const {id, handleDelete} = props;
  const onClickHandler = (e) => {
      axios.delete(`http://localhost:8000/api/chores/${id}`)
      .then((res) => {
          console.log(res);
          handleDelete(id);
      })
      .catch((err) => {
          console.log(err)
      });
  }
  return (
    <div>
        <button onClick={onClickHandler} className="mx-2 w-12 h-7">Cancel</button>
    </div>
  )
}

export default DeleteButton