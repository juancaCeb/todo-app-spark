import TodoTable from './components/TodoTable'
import NewToDo from './components/NewToDo';
import SearchTask from './components/SearchTask';
import Pagination from './components/Pagination';
import TaskTimeStats from './components/TaskTimeStats';

function App(){

  return <div>
    
    <SearchTask></SearchTask>
  
    <TodoTable></TodoTable>
    <Pagination></Pagination>
    <TaskTimeStats></TaskTimeStats>

  </div>;

}

export default App;




