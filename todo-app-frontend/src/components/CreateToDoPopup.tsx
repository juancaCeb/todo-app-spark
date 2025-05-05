import dayjs from "dayjs";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_CONFIG } from '../config/api.config'; 
import { fetchToken } from '../utils/api/authApi'; 


  /**
   * CreateToDoPopupProps Interface
   * Defines the props expected by the CreateToDoPopup component
   *
   * @interface
   * @property {() => void} toggleModal - Function to close the modal
   * @property {() => void} performFetch - Function to refresh the todo list
   *
   * Usage:
   * <CreateToDoPopup
   *   toggleModal={toggleModal}
   *   performFetch={performFetch}
   * />
   */
  
interface CreateToDoPopupProps {
  toggleModal: () => void;
  performFetch: () => void;
}

/**
 * CreateToDoPopup Component
 * -------------------------
 * Modal component for creating new todo items with form validation and API integration.
 * 
 * @component
 * @param {CreateToDoPopupProps} props
 * @prop {() => void} toggleModal - Function to close the modal
 * @prop {() => void} performFetch - Function to refresh todo list
 */

function CreateToDoPopup({ toggleModal, performFetch }: CreateToDoPopupProps) {

  /**
   * Form State
   * ---------
   * name: Required, string input for todo name
   * priority: Selected from High/Medium/Low, defaults to High
   * dueDate: Optional date string in YYYY-MM-DD format
   */

  const [name, setName] = useState<string>('');
  const [priority, setPriority] = useState<string>('High'); 
  const [dueDate, setDueDate] = useState<string>(''); 

  /**
   * Formats a date string to API expected format
   * @param dateString - Raw date string from input
   * @returns Formatted date string or null
   */
  const formatDueDate = (dateString: string): string | null => {
    return dateString ? `${dateString}T00:00:00` : null;
  };

  /**
   * Creates a new todo item
   * Requires valid authentication token
   * Updates parent state on success
   * Shows toast notifications for feedback
   * 
   * Flow:
   * 1. Prevent default form submission
   * 2. Get authentication token
   * 3. Make API request
   * 4. Handle response/errors
   * 5. Update UI state
   * 
   * @async
   * @function handleCreate
   * @param {React.FormEvent} event - Form submission event
   * @throws {Error} When API request fails
   */

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = await fetchToken();
      
      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          priority,
          dueDate: formatDueDate(dueDate)
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create todo: ${response.status} ${errorText}`);
      }

      toast.success("Todo created successfully");
      performFetch();
      toggleModal();

    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create todo");
    }
  };
  
  /**
   * Handles modal cancellation
   * Closes modal without saving
   * No cleanup needed
   */
  
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
              value={name}
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
            <label className="block mb-1 text-gray-700">Due Date (Optional)</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={dayjs().format("YYYY-MM-DD")}
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
