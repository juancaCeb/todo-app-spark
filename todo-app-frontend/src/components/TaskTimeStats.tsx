function TaskTimeStats() {
    return (
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col space-y-6">
          {/* Average Time Section */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">Average time to finish tasks:</p>
              <p className="text-2xl font-semibold">22:15 minutes</p>
            </div>
            <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">7</span>
            </div>
          </div>
  
          {/* Priority Times Section */}
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">Average time to finish tasks by priority:</p>
            <div className="space-y-1">
              <p className="text-sm">Low: 10:25 mins</p>
              <p className="text-sm">Medium: 10:25 mins</p>
              <p className="text-sm">High: 10:25 mins</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default TaskTimeStats;