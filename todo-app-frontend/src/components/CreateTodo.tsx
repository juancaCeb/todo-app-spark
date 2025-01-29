import React, { useState } from "react";
import CreateToDoPopup from "./CreateToDoPopup";

export default function CreateTodo() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={toggleModal}
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        + New To Do
      </button>

      {modal && <CreateToDoPopup toggleModal={toggleModal} />}
    </div>
  );
}
