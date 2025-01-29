import { useState } from "react";

interface SearchTaskProps {
  filterFunc: (name: string, priority: string, status: string) => void;
}

function SearchTask({ filterFunc }: SearchTaskProps) {
  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<string>('All');
  const [status, setStatus] = useState<string>('All');

  const handleSearch = () => {
    filterFunc(name, priority, status);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">

          <div>
            <label className="block mb-1 text-gray-700">Name</label>
            <input
              type="text"
              id="nombre"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-11/12 p-2 border rounded-md mx-auto block"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-11/12 p-2 border rounded-md mx-auto block"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-11/12 p-2 border rounded-md mx-auto block"
            >
              <option value="All">All</option>
              <option value="Done">Done</option>
              <option value="Undone">Undone</option>
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="w-11/12 px-4 py-2 text-white bg-blue-500 rounded-md mx-auto block hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchTask;
