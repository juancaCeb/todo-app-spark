import NewToDo from './components/NewToDo';
import SearchTask from './components/SearchTask';
import Pagination from './components/Pagination';
import TaskTimeStats from './components/TaskTimeStats';
import TasksPage from './components/TasksPage';

function App(){

  return <div>
  
    <TasksPage></TasksPage>
    <Pagination></Pagination>
    <TaskTimeStats></TaskTimeStats>

  </div>;

}

export default App;




