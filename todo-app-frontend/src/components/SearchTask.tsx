



function SearchTask () {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div>
          <select className="w-full p-2 border rounded-md">
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <select className="w-full p-2 border rounded-md">
            <option value="All">All</option>
            <option value="Done">Done</option>
            <option value="Undone">Undone</option>
          </select>
        </div>

        <button
          onClick={() => {}}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchTask;
