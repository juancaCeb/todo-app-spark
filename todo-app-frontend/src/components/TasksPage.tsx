import { useEffect, useState } from "react";
import SearchTask from "./SearchTask";
import TodoTable from "./TodoTable";


function TasksPage(){

    interface todo{

        id:number;
        description:string;
        priority:string;
        dueDate: string;
        doneStatus: boolean;
      
    }
    
    const [ todos, setTodos ] = useState<todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<todo[]>([]); 

    
    const BASE_URL = "http://localhost:9090/todos";

    useEffect(() => {
        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data: todo[]) => {
                setTodos(data);
                setFilteredTodos(data);  // Initially set filteredTodos to all todos
            });
    }, []);

    const applyFilter = (name:string, priority:string, status:string, _todos: todo[]) => {

        let filteredTodos = todos;

        if (name) {
          filteredTodos = filteredTodos.filter((todo) =>
            todo.description.toLowerCase().includes(name.toLowerCase())
          );
        }
    
        if (priority !== "All") {
          filteredTodos = filteredTodos.filter((todo) => todo.priority === priority);
        }
    
        if (status !== "All") {
          const isDone = status === "Done";
          filteredTodos = filteredTodos.filter((todo) => todo.doneStatus === isDone);
        }
    
        setFilteredTodos(filteredTodos);

    }

 return (
    <div>
       <SearchTask todos={todos} filterFunc={applyFilter}/>
        <TodoTable todos={filteredTodos}/>
    </div>
  );

};

export default TasksPage;