import React, { useState, useEffect } from 'react';

interface Todo {
  id: string;
  name: string;
  priority: string;
  dueDate: string;
  doneStatus: string;
}

interface TodoTableProps {
  todos: Todo[];
}

const TodoTable = ({ todos }: TodoTableProps) => {
  const [editingTodo, setEditingTodo] = useState<string | null>(null);  // Track the id of the todo being edited
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null); // Hold edited data

  const handleCheckboxChange = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:9090/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Todo status updated');
      } else {
        console.error('Failed to update todo status');
      }
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo.id); 
    setEditedTodo({ ...todo }); 
  };

  const handleCancelEdit = () => {
    setEditingTodo(null); // Cancel editing and reset state
    setEditedTodo(null);
  };

  const handleSaveEdit = async () => {
    if (editedTodo) {
      try {
        const response = await fetch(`http://localhost:9090/todos/${editedTodo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedTodo), // Send the updated todo
        });

        if (response.ok) {
          console.log('Todo updated successfully');
          setEditingTodo(null); // Exit editing mode
          setEditedTodo(null);
        } else {
          console.error('Failed to save todo');
        }
      } catch (error) {
        console.error('Error saving todo:', error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedTodo) {
      setEditedTodo({
        ...editedTodo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const convertToBoolean = (doneStatus: string) => doneStatus === 'Done';

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Done
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {todos.map((todo) => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={convertToBoolean(todo.doneStatus)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                </td>

                {/* Editable Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTodo === todo.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedTodo?.name || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span className="text-gray-900">{todo.name}</span>
                  )}
                </td>

                {/* Editable Priority */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTodo === todo.id ? (
                    <select
                      name="priority"
                      value={editedTodo?.priority || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {todo.priority}
                    </span>
                  )}
                </td>

                {/* Editable Due Date */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingTodo === todo.id ? (
                    <input
                      type="date"
                      name="dueDate"
                      value={editedTodo?.dueDate || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    todo.dueDate
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingTodo === todo.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoTable;
