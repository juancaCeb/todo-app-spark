import React, { useState } from "react";
import CreateToDoPopup from "./CreateToDoPopup";

interface CreateToDoPopupProps {
  performFetch: () => void;
}

export default function CreateTodo({ performFetch }: CreateToDoPopupProps) {
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
    <div className="container mx-auto p-6 max-w-4xl">
      <button
        onClick={toggleModal}
        className="px-6 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        + New To Do
      </button>

      {modal && <CreateToDoPopup performFetch={performFetch} toggleModal={toggleModal} />}
    </div>
  );
}
