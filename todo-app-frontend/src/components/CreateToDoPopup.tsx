import React, { useState } from "react";

interface CreateToDoPopupProps {
  toggleModal: () => void;
}

function CreateToDoPopup({ toggleModal }: CreateToDoPopupProps) {

  const [description, setName] = useState<string>('');
  const [priority, setPriority] = useState<string>('High'); 
  const [isDone, setIsDone] = useState<string>('Undone'); 
  const [dueDate, setDueDate] = useState<string>(''); 

  const BASE_URL = "http://localhost:9090/todos";


  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault(); 

    const todo = {
      description,  
      priority,    
      isDone: isDone === 'Done',  
      dueDate: dueDate || null,  
    };
    

    console.log(todo);

    fetch(BASE_URL,{

      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(todo)
    }).then(() =>{

      console.log('new todo added');
    }
  
  )
    toggleModal();
    
  };

  const handleCancel = () => {
    toggleModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Todo</h2>
        <form className="space-y-4" onSubmit={handleCreate}>
          <div>
            <label className="block mb-1 text-gray-700">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setName(e.target.value)}  
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Priority</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">State</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setIsDone(e.target.value)}
            >
              <option value="Done">Done</option>
              <option value="Undone">Undone</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Due Date (Optional)</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateToDoPopup;
