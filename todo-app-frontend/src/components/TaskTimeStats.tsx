import { useEffect, useState } from "react";

function TaskTimeStats() {

  interface metric {
    totalAverageMinutes:number,
    highPriorityAverageMinutes:number,
    mediumPriorityAverageMinutes:number,
    lowPriorityAverageMinutes:number
  }

  const [metrics, setMetrics] = useState<metric>(); 

  const BASE_URL = "http://localhost:9090/todos/metrics";

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data: metric) => {
        setMetrics(data); 
      });
  }, []);

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">Average time to finish tasks:</p>
            <p className="text-2xl font-semibold">{metrics?.totalAverageMinutes} mins </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-600 text-sm">Average time to finish tasks by priority:</p>
          <div className="space-y-1">
            <p className="text-sm">Low: {metrics?.lowPriorityAverageMinutes} mins</p>
            <p className="text-sm">Medium: {metrics?.mediumPriorityAverageMinutes} mins</p>
            <p className="text-sm">High: {metrics?.highPriorityAverageMinutes} mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskTimeStats;
