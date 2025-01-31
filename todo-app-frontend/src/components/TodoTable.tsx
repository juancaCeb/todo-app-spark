import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';

interface Todo {
  id: string;
  name: string;
  priority: string;
  dueDate: string | null;  
  doneStatus: string;
}

interface TodoTableProps {
  todos: Todo[];
  performFetch: () => void;
  setTodos: (todo:Todo[]) => void;
  currPage:number;
  numOfTotalPages:number;
}

const TodoTable = ({ todos, setTodos, performFetch, currPage, numOfTotalPages }: TodoTableProps) => {

  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [isAllChecked, setIsAllChecked] = useState<boolean[]>(new Array(numOfTotalPages).fill(false));
  const [prioritySort, setPrioritySort] = useState<string>('All');
  const [dueDateSort, setDueDateSort] = useState<string>('All');
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [finalTodos, setFinalTodos] = useState<Todo[]>([]);

  useEffect(() => {

    if (needsSorting()){

      setSortedTodos(todos);

    }else{

      setFinalTodos(todos);

    }
    
  }, [todos])

  useEffect(() => {

    setSortedTodos(finalTodos);
    
  }, [dueDateSort, prioritySort])

  function needsSorting() : boolean {
     
      if(prioritySort === "All" && dueDateSort === "All"){
          return false;
      }else{
        return true;
      }

  };

  useEffect(() => {
    const priorities = ['Low', 'Medium', 'High'];
    const sortedPriorities = priorities.slice(priorities.indexOf(prioritySort)).concat(priorities.slice(0, priorities.indexOf(prioritySort)));

  
    const sorted = [...sortedTodos].sort((a, b) => {
      let priorityComparison = 0;
  
      if (prioritySort !== "All") {
        const indexA = sortedPriorities.indexOf(a.priority);
        const indexB = sortedPriorities.indexOf(b.priority);
        priorityComparison = indexA - indexB;
      }
  
      if (priorityComparison === 0 && dueDateSort !== "All") {
        const dueA = a.dueDate ? dayjs(a.dueDate) : null;
        const dueB = b.dueDate ? dayjs(b.dueDate) : null;
  
        if (!dueA && !dueB) return 0;
  
        if (!dueA) return 1;
        if (!dueB) return -1;
  
        if (dueDateSort === "Closest") {
          return dueA.isBefore(dueB) ? -1 : 1;
        } else if (dueDateSort === "Farthest") {
          return dueA.isAfter(dueB) ? -1 : 1;
        }
      }

      if (prioritySort !== "All" && dueDateSort === "All") {
        const indexA = sortedPriorities.indexOf(a.priority);
        const indexB = sortedPriorities.indexOf(b.priority);
        return indexA - indexB;
      }
  
      if (prioritySort === "All" && dueDateSort !== "All") {
        const dueA = a.dueDate ? dayjs(a.dueDate) : null;
        const dueB = b.dueDate ? dayjs(b.dueDate) : null;
  
        if (!dueA && !dueB) return 0;
        if (!dueA) return 1;
        if (!dueB) return -1;
  
        if (dueDateSort === "Closest") {
          return dueA.isBefore(dueB) ? -1 : 1;
        } else if (dueDateSort === "Farthest") {
          return dueA.isAfter(dueB) ? -1 : 1;
        }
      }
  
      return priorityComparison;

    });
  
    setFinalTodos(sorted);
  
  }, [sortedTodos]);

  const handleCheckboxChange = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:9090/todos/${id}/doneStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        performFetch();
      } else {
        console.error('Failed to update todo status');
      }
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrioritySort(e.target.value); 
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDueDateSort(e.target.value); 
  };
  

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo.id);
  
    setEditedTodo({ 
      ...todo, 
      dueDate: todo.dueDate !== null ? dayjs(todo.dueDate).format('YYYY-MM-DD') : null

    });
    

    
  };
  
  

  const handleCancelEdit = () => {
    setEditingTodo(null); 
    setEditedTodo(null);
  };

  const handleSaveEdit = async () => {
    if (editedTodo) {
      let formattedDueDate = null;
      
  
      if (editedTodo.dueDate && editedTodo.dueDate !== '') {
        formattedDueDate = dayjs(editedTodo.dueDate).format('YYYY-MM-DD[T]HH:mm:ss');
      }
  
      const updatedTodo = { ...editedTodo, dueDate: formattedDueDate };
      
  
      try {
        const response = await fetch(`http://localhost:9090/todos/${updatedTodo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodo),
        });
  
        if (response.ok) {
          console.log('Todo updated successfully');
          setEditingTodo(null);
          setEditedTodo(null);
          performFetch();
          toast.success('Successfully Edited');
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

  const handleDelete = async (id: string) => {

    try {
      const response = await fetch(`http://localhost:9090/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Successfully Deleted')

        performFetch();
        
      } else {
        console.error('Failed to delete todo');
        toast.error('Failed To Delete')
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }

  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const checked = e.target.checked;
  
    const updatedIsAllChecked = [...isAllChecked];
  
    updatedIsAllChecked[currPage] = checked;
  
    setIsAllChecked(updatedIsAllChecked);
  
    todos.forEach((todo) => {
      if (convertToBoolean(todo.doneStatus) !== checked) {
        handleCheckboxChange(todo.id);
      }
    });

  };

  const convertToBoolean = (doneStatus: string) => doneStatus === 'Done';

  const getDueDateBackgroundColor = (dueDate: string | null): string => {
    if (!dueDate) return '';
    const dueDateMoment = dayjs(dueDate);
    const now = dayjs();
    const oneWeekFromNow = now.add(1, 'week');
    const twoWeeksFromNow = now.add(2, 'week');

    if (dueDateMoment.isBefore(oneWeekFromNow) && dueDateMoment.isAfter(now)) {
      return 'bg-red-100'; // Red background for tasks within 1 week
    } else if (dueDateMoment.isBefore(twoWeeksFromNow) && dueDateMoment.isAfter(now)) {
      return 'bg-yellow-100'; // Yellow background for tasks within 2 weeks
    } else if (dueDateMoment.isAfter(twoWeeksFromNow)) {
      return 'bg-green-100'; // Green background for tasks more than 2 weeks away
    }
    return '';
  };

  return (
    
    <div className="container mx-auto p-6 max-w-4xl">
      <ToastContainer
  position="bottom-center"
/>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={isAllChecked[currPage]}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                  <select
                    value={prioritySort}
                    onChange={handlePriorityChange} 
                    className="ml-2 border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
                <select
                    value={dueDateSort}
                    onChange={handleDueDateChange} 
                    className="ml-2 border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="All"> All </option>
                    <option value="Closest">Closest</option>
                    <option value="Farthest">Farthest</option>
                  </select>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {finalTodos.map((todo) => (
              <tr key={todo.id} className={`hover:bg-gray-50 ${getDueDateBackgroundColor(todo.dueDate)}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={convertToBoolean(todo.doneStatus)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                </td>

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

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingTodo === todo.id ? (
                    <input
                      type="date"
                      name="dueDate"
                      value={editedTodo?.dueDate || ""}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    todo.dueDate ? dayjs(todo.dueDate).format('DD/MM/YYYY') : ""
                  )}
                </td>

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
                    <>
                      <button
                        onClick={() => handleEditClick(todo)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </>
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
