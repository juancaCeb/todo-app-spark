import Pagination from './components/Pagination';
import TaskTimeStats from './components/TaskTimeStats';
import TasksPage from './components/TasksPage';
import CreateTodo from './components/CreateTodo';

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-between w-full max-w-[1600px] px-4 max-h-screen overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center space-x-2 mb-8 pt-16">
          <span>Todo App</span>
          <span role="img" aria-label="Checklist" className="text-7xl">📝</span>
        </h1>
        <div className="flex flex-col space-y-6 overflow-y-auto">
          <TasksPage />
          <div className="flex items-center justify-center py-8">
            <TaskTimeStats />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
