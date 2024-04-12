import axios from "axios";
import React from "react";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { baseURL } from "../utils/constants";

const ToDo = ({ text, id, setIsLoading, setIsPopupOpen, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setIsLoading((prevState) => !prevState);
    });
  };

  const updateTodo = () => {
    setPopupContent({ text, id });
    setIsPopupOpen(true);
  };

  return (
    <div className="todo-item flex justify-between items-center p-2 border-b border-gray-300 text-xl w-full">
      <p className="text-gray-700">{text}</p>
      <div className="icons flex">
        <RiEdit2Fill
          className="text-gray-500 cursor-pointer mr-2"
          onClick={updateTodo}
        />
        <MdDelete
          className="text-red-500 cursor-pointer ml-2"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default ToDo;
