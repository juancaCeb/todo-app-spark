import { useEffect, useState } from "react";
import SearchTask from "./SearchTask";
import TodoTable from "./TodoTable";
import CreateTodo from "./CreateTodo";
import Pagination from "./Pagination";

function TasksPage() {
  interface todo {
    id: string;
    name: string;
    priority: string;
    dueDate: string | null;
    doneStatus: string;
  }

  const [todos, setTodos] = useState<todo[]>([]);
  const [currPage, setCurrPage] = useState(1);
  const [numOfTotalPages, setNumOfTotalPages] = useState(1);

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

  const performFetch = () => {
    const url = `${BASE_URL}?priority=${priority}&page=${currPage}&name=${name}&doneStatus=${status}`;

    fetch(url)
      .then((response) => {
        const totalItems = response.headers.get("Tasks-Count");
        const totalItemsCount = totalItems ? parseInt(totalItems, 10) : 0;
        const totalPages = Math.ceil(totalItemsCount / 10);

        return response.json().then((data: todo[]) => {
          setTodos(data);
          setNumOfTotalPages(totalPages);
        });
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };

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
