import { useState } from "react";
/**
   * Callback function to update parent filters
   * @param name - Text to search in todo names
   * @param priority - Priority filter value
   * @param status - Status filter value
   */

interface SearchTaskProps {
  filterFunc: (name: string, priority: string, status: string) => void;
}

/**
 * SearchTask Component
 * -------------------
 * A form component that provides filtering capabilities for todo items.
 * Acts as a controlled component that lifts state up to parent through filterFunc
 * which then executes the filtering logic.
 *
 * @component
 * @param {SearchTaskProps} props
 * @returns {JSX.Element} Search form with name, priority and status filters
 *
 * Key Features:
 * - Name text search
 * - Priority selection (All/High/Medium/Low)
 * - Status filtering (All/Done/Undone)
 * - Immediate search execution (no debouncing)
 */

function SearchTask({ filterFunc }: SearchTaskProps) {
  
  /**
   * Local state management for filters
   * All states are controlled and synced with form inputs
   */
  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<string>('All');
  const [status, setStatus] = useState<string>('All');

  /**
   * handleSearch
   * ------------------------------
   * Purpose: Triggers parent filter update
   * Params: None - uses current state values
   * Returns: void
   * 
   * DO NOT:
   * - Add validation - parent handles it
   * - Add debouncing - instant update needed
   * - Modify state here - use setState functions
   */
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
