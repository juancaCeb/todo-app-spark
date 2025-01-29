import { useEffect, useState } from "react";
import SearchTask from "./SearchTask";
import TodoTable from "./TodoTable";
import CreateTodo from "./CreateTodo";
import Pagination from "./Pagination";

function TasksPage() {
  interface todo {
    id: number;
    name: string;
    priority: string;
    dueDate: string;
    doneStatus: string;
  }

  const [todos, setTodos] = useState<todo[]>([]);
  const [currPage, setCurrPage] = useState(1);

  const BASE_URL = "http://localhost:9090/todos";

  const applyFilter = (name: string, priority: string, status: string) => {

    const url = `${BASE_URL}?priority=${priority}&page=${currPage}&name=${name}&doneStatus=${status}`;

    fetch(url)
      .then((response) => response.json())
      .then((data: todo[]) => {
        setTodos(data);
      });
  };

  useEffect(() => {

    applyFilter("", "All", "All");

  }, []); 

  return (
    <div>
      <SearchTask filterFunc={applyFilter} />
      <CreateTodo />
      <TodoTable todos={todos} />
      <Pagination currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );

}

export default TasksPage;
