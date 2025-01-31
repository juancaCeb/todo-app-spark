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
    <div className="container mx-auto p-8 max-w-4xl shadow-lg rounded-lg bg-white border border-gray-200 flex flex-col">
      <div className="w-full bg-white p-6 flex-grow">
        <div className="space-y-4">

          <div>
            <label className="font-bold block mb-1 text-gray-700 text-xl">Name</label>
            <input
              type="text"
              id="nombre"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md block"
            />
          </div>

          <div className="w-6/12">
            <label className="font-bold block mb-1 text-gray-700 text-xl">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-2 border rounded-md block"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center space-x-41">
            <div className="w-6/12">
              <label className="font-bold block mb-1 text-gray-700 text-xl">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-md block"
              >
                <option value="All">All</option>
                <option value="Done">Done</option>
                <option value="Undone">Undone</option>
              </select>
            </div>

            <div className="ml-auto mt-auto">
              <button
                onClick={handleSearch}
                className="px-8 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchTask;
