import Pagination from './components/Pagination';
import TaskTimeStats from './components/TaskTimeStats';
import TasksPage from './components/TasksPage';
import CreateTodo from './components/CreateTodo';

function App(){

  return <div>
  
    <TasksPage></TasksPage>
    <CreateTodo></CreateTodo>
    <Pagination></Pagination>
    <TaskTimeStats></TaskTimeStats>

  </div>;

}

export default App;




