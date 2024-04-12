// Popup.js
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constants";

const Popup = ({ isOpen, onClose, popupContent, setIsLoading }) => {
  const [input, setInput] = useState(popupContent.text);

  const updateTodo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, { todo: input })
      .then((res) => {
        console.log(res.data);
        setIsLoading((prevState) => !prevState);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-lg font-bold mb-4">Update ToDo</h2>
        <div className="update flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update Todo"
            className="bg-white border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 flex-grow"
          />
          <button
            onClick={updateTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
