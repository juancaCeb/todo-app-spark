
const NewToDo = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Todo</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1">Priority</label>
            <select className="w-full p-2 border rounded-md">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">State</label>
            <select className="w-full p-2 border rounded-md">
              <option value="Done">Done</option>
              <option value="Undone">Undone</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Due Date (Optional)</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Create
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewToDo;
