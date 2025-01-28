import { useState } from "react";

interface todo {
  id: number;
  description: string;
  priority: string;
  dueDate: string;
  doneStatus: boolean;
}

interface SearchTaskProps {
  todos: todo[];
  filterFunc: (name: string, priority: string, status: string, todos:todo[]) => void; 
}

function SearchTask({ todos, filterFunc }: SearchTaskProps) {
  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<string>('All');
  const [status, setStatus] = useState<string>('All');

  const handleSearch = () => {
    filterFunc(name, priority, status, todos);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>

          <input
            type="text"
            id="nombre"
            placeholder="Name"
            value={name} 
            onChange={(e) => setName(e.target.value)}  
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}  
            className="w-full p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)} 
            className="w-full p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="Undone">Undone</option>
          </select>
        </div>

        <button
          onClick={handleSearch} 
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchTask;
