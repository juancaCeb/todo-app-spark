import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import { Todo, TodoTableProps} from '../types/todo.types';
import { fetchToken } from '../utils/api/authApi';
import { updateTodo } from '../utils/api/todoApi';
import { DUE_DATE_COLORS, TIME_PERIODS } from '../types/todo.types';


/**
 * TodoTable Component
 * 
 * A complex data table component that handles todo items with the following features:
 * - Sortable columns (priority and due date)
 * - Inline editing
 * - Batch status updates
 * - Row-level actions (edit, delete)
 * - Visual indicators for due dates
 * - Authentication integration
 * 
 * @param {Object} props
 * @param {Todo[]} props.todos - Array of todo items to display
 * @param {Function} props.setTodos - Function to update todos state
 * @param {Function} props.performFetch - Function to refresh data from API
 * @param {number} props.currPage - Current page number
 * @param {number} props.numOfTotalPages - Total number of pages
 */

const TodoTable = ({ todos, setTodos, performFetch, currPage, numOfTotalPages }: TodoTableProps) => {

  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);
  const [isAllChecked, setIsAllChecked] = useState<boolean[]>(new Array(numOfTotalPages).fill(false));
  const [prioritySort, setPrioritySort] = useState<string>('All');
  const [dueDateSort, setDueDateSort] = useState<string>('All');
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);
  const [finalTodos, setFinalTodos] = useState<Todo[]>([]);

  /**
   * If soring is needed, set the sortedTodos to the current todos
   * Else, set the finalTodos to the current todos
   * This is done to prevent unnecessary sorting on every render
   * and to optimize performance
   */

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

  /**
   * Determines if sorting is needed based on current filters
   * Used to optimize rendering and prevent unnecessary sorts
   */
  function needsSorting() : boolean {

      if(prioritySort === "All" && dueDateSort === "All"){
          return false;
      }else{
        return true;
      }

  };

  /**
   * Handles the complete sorting logic
   * Priority sorting takes precedence over date sorting
   * Maintains sort order across pagination
   */

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

  /**
   * Handles the checkbox change event
   * Updates the status of the todo item
   * @param {string} id - The ID of the todo item
   */

  const handleCheckboxChange = async (id: string) => {
    try {
      const token = await fetchToken();
      
      if (!token) {
        console.error("Token could not be retrieved.");
        toast.error("Authentication token missing");
        return;
      }
  
      const response = await fetch(`http://localhost:9090/todos/${id}/doneStatus`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        performFetch();
        toast.success('Status updated successfully');
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to update todo status: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Error updating todo status:', error);
      toast.error('Failed to update todo status');
    }
  };
  /**
   * Handles the priority change event
   * Updates the priority filter
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object
   */

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrioritySort(e.target.value); 
  };
  /**
   * Handles the due date change event
   * Updates the due date filter
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The event object
   */

  const handleDueDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDueDateSort(e.target.value); 
  };
  /**
   * Handles the edit button click event
   * Sets the editing state and pre-fills the form with current todo data
   * @param {Todo} todo - The todo item to edit
   */
  
  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo.id);
  
    setEditedTodo({ 
      ...todo, 
      dueDate: todo.dueDate !== null ? dayjs(todo.dueDate).format('YYYY-MM-DD') : null

    });

    
  };
  
  /**
   * Handles the cancel edit button click event
   * Resets the editing state
   */
  const handleCancelEdit = () => {
    setEditingTodo(null); 
    setEditedTodo(null);
  };
  /**
   * Handles the save edit button click event
   * Sends the updated todo data to the API
   * @param {string} id - The ID of the todo item
   */
  const handleSaveEdit = async () => {

    if (!editedTodo) return;
    try {
      const token = await fetchToken();
      
      if (!token) {
        console.error("Token could not be retrieved.");
        toast.error("Authentication token missing");
        return;
      }
  
      const result = await updateTodo(editedTodo, token);
  
      if (result.success) {
        setEditingTodo(null);
        setEditedTodo(null);
        performFetch();
        toast.success('Successfully updated todo');
      } else {
        toast.error(result.error || 'Failed to update todo');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update todo');
    }
  };
  /**
   * Handles the change event for the todo input fields
   * Updates the editedTodo state with new values
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The event object
   */
  
  const handleChangeOnTodo = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedTodo) {
      setEditedTodo({
        ...editedTodo,
        [e.target.name]: e.target.value,
      });
    }
  };
  /**
   * Handles the delete button click event
   * Sends a delete request to the API
   * @param {string} id - The ID of the todo item
   */

  const handleDelete = async (id: string) => {
    try {

      const token = await fetchToken();
      
      if (!token) {
        console.error("Token could not be retrieved.");
        toast.error("Authentication token missing");
        return;
      }
  
      const response = await fetch(`http://localhost:9090/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        toast.success('Successfully Deleted');
        performFetch();
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete todo: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete todo');
    }
  };
  /**
   * Handles the select all checkboxes event
   * Updates the status of all todos on the current page
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object
   */

  const handleSelectAllCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {

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

  /**
   * Determines the background color for the due date cell
   * based on the current date and the due date of the todo item
   * @param {string | null} dueDate - The due date of the todo item
   * @returns {string} - The background color class
   */

  const getDueDateBackgroundColor = (dueDate: string | null): string => {
    if (!dueDate) return DUE_DATE_COLORS.DEFAULT;
  
    const dueDateMoment = dayjs(dueDate);
    const now = dayjs();
    const oneWeekFromNow = now.add(TIME_PERIODS.ONE_WEEK, 'week');
    const twoWeeksFromNow = now.add(TIME_PERIODS.TWO_WEEKS, 'week');
  
    if (dueDateMoment.isBefore(now)) {
      return DUE_DATE_COLORS.URGENT; 
    }
  
    switch (true) {
      case dueDateMoment.isBefore(oneWeekFromNow):
        return DUE_DATE_COLORS.URGENT;
      case dueDateMoment.isBefore(twoWeeksFromNow):
        return DUE_DATE_COLORS.WARNING;
      case dueDateMoment.isAfter(twoWeeksFromNow):
        return DUE_DATE_COLORS.SAFE;
      default:
        return DUE_DATE_COLORS.DEFAULT;
    }
  };

  /**
   * Renders the TodoTable component
   * Displays the todos in a table format with sorting, editing, and deleting functionalities
   * @returns {JSX.Element}
   */

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
                  onChange={handleSelectAllCheckboxes}
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
                      onChange={handleChangeOnTodo}
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
                      onChange={handleChangeOnTodo}
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
                      onChange={handleChangeOnTodo}
                      className="border border-gray-300 rounded px-2 py-1"
                      min={dayjs().format("YYYY-MM-DD")}
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
