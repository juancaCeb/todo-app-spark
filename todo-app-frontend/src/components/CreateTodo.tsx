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
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        + New To Do
      </button>

      {modal && <CreateToDoPopup toggleModal={toggleModal} />}
    </>
  );
}
