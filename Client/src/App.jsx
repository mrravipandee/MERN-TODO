// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import ToDo from "./components/ToDo";
import Popup from "./components/Popup";
import { baseURL } from "./utils/constants";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => setToDos(res.data))
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, [isLoading]);

  const saveToDo = () => {
    axios
      .post(`${baseURL}/save`, { todo: input })
      .then((res) => {
        console.log(res.data);
        setIsLoading((prevState) => !prevState);
        setInput("");
      })
      .catch((error) => {
        console.error("Error saving todo:", error);
      });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="h-screen bg-blue-300 pt-[10rem]">
      <div className="flex justify-center items-center p-10 pb-12">
        <div className="card rounded-md bg-slate-200 p-4">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              saveToDo();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add some task..."
              className="bg-white border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500 flex-grow"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaPlus className="mr-1" />
              Add
            </button>
          </form>
          <div className="todoItems justify-center pt-4">
            {toDos.map((todo) => (
              <ToDo
                key={todo._id}
                text={todo.todo}
                id={todo._id}
                setIsLoading={setIsLoading}
                setIsPopupOpen={setIsPopupOpen}
                setPopupContent={setPopupContent}
              />
            ))}
          </div>
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        popupContent={popupContent}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default App;
