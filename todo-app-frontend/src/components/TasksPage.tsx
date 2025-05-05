import { useEffect, useState } from "react";
import SearchTask from "./SearchTask";
import TodoTable from "./TodoTable";
import CreateTodo from "./CreateTodo";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import { Todo, TodoTableProps} from '../types/todo.types';

/**
 * TasksPage Component
 * 
 * This component manages the main todo list functionality including:
 * - Fetching and displaying todos
 * - Filtering todos
 * - Pagination
 * - Authentication token management
 * 
 * @dependencies
 * - Requires a running API server at localhost:9090
 * - Expects token-based authentication
 * - Requires react-toastify for notifications
 */

function TasksPage() {
  /**
   * Represents the state of the todo list shown on the page
   * - todos: Array of todo items
   * - currPage: Current page number for pagination
   * - numOfTotalPages: Total number of pages available for pagination
   */

  const [todos, setTodos] = useState<Todo[]>([]);
  const [currPage, setCurrPage] = useState(1);
  const [numOfTotalPages, setNumOfTotalPages] = useState(1);

  /**
   * Represents the state of the filters applied to the search
   */

  const [name, setName] = useState('');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');

  const BASE_URL = "http://localhost:9090/todos";

  const applyFilter = (name: string, priority: string, status: string) => {
    setName(name);
    setPriority(priority);
    setStatus(status);
    setCurrPage(1);
  };


  /**
   * Fetches authentication token from localStorage or API
   * @returns Promise<string | null> - The authentication token or null if retrieval fails
   */  
    const fetchToken = async (): Promise<string | null> => {
      let token = localStorage.getItem("token");
  
      if (!token) {
        try {
          const response = await fetch("http://localhost:9090/token");
          if (!response.ok) {
            throw new Error("Failed to retrieve token");
          }
  
          token = await response.text();
          localStorage.setItem("token", token);
  
        } catch (error) {
          console.error("Error retrieving token:", error);
          return null;
        }
      }
  
      return token;
    };

    /**
     * Constructs API URL with query parameters
     * @param baseUrl - Base URL for the API endpoint
     * @param params - Object containing query parameters
     * @returns Formatted URL string
     */
  
    const constructUrl = (baseUrl: string, params: Record<string, any>) => {
      const url = new URL(baseUrl);
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });
      return url.toString();
    };

    /**
     * Makes authenticated API request to fetch todos
     * @param url - Full API URL including query parameters
     * @param token - Authentication token
     * @returns Promise<Response> - Fetch API response
     */
    
    const fetchTodosFromApi = async (url: string, token: string) => {
      return await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    };

    /**
     * Fetches todos from the API with current filters and pagination
     * - Handles token authentication
     * - Makes API calls
     * - Updates state with fetched data
     * - Handles errors
     * 
     * @returns void
     */

    const performFetch = async () => {

      const token = await fetchToken();

      console.log("Token:", token);

      if (!token) {
        console.error("Token could not be retrieved.");
        toast.error("Authentication token missing");
        return;
      }
    
      const url = constructUrl(BASE_URL, {
        priority,
        page: currPage,
        name,
        doneStatus: status,
      });
    
      try {
        const response = await fetchTodosFromApi(url, token);
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch todos: ${response.status} ${errorText}`);
        }
    
        const totalItems = response.headers.get("Tasks-Count");
        const totalItemsCount = totalItems ? parseInt(totalItems, 10) : 0;
        const totalPages = Math.ceil(totalItemsCount / 10);
    
        const data: Todo[] = await response.json();
        
        setTodos(data);
        setNumOfTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching todos:", error);
        toast.error("Failed to fetch todos");
      }
    };
  
  
  // Fetch todos when filters or pagination changes
  useEffect(() => {
    performFetch();
  }, [currPage, name, priority, status]);

  return (
    <div className="container mx-auto pt-4 px-14 pb-6 space-y-6 shadow-sm">

      <SearchTask filterFunc={applyFilter} />
      <CreateTodo performFetch={performFetch} />
      <TodoTable todos={todos} performFetch={performFetch} currPage={currPage} numOfTotalPages={numOfTotalPages} setTodos={setTodos} />
      <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={numOfTotalPages} />
    </div>
  );
}

export default TasksPage;
