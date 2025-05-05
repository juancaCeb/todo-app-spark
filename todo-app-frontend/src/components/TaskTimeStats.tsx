import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchToken } from '../utils/api/authApi';
import { API_CONFIG } from '../config/api.config';
import { TaskMetrics } from "../types/todo.types";

/**
 * TaskTimeStats Component
 * Displays real-time metrics about task completion times
 * Auto-refreshes every 5 seconds
 * Requires authenticated API access
 * 
 * @component
 * @returns {JSX.Element} Rendered metrics display
 */

function TaskTimeStats() {

  const [metrics, setMetrics] = useState<TaskMetrics>();
  /**
   * Fetches task metrics from the API
   * Requires valid authentication token
   * Updates metrics state on success
   * Shows error toast on failure
   * 
   * @async
   * @function fetchMetrics
   * @throws {Error} When API request fails
   * @returns {Promise<void>}
   */

  const fetchMetrics = async () => { 
    try {
      const token = await fetchToken();
      
      if (!token) {
        toast.error("Error While Fetching Metrics");
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.METRICS}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.status}`);
      }

      const data: TaskMetrics = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      toast.error("Failed to fetch metrics");
    }
  };

  /**
   * Sets up auto-refresh for metrics
   * Runs on component mount
   * Cleans up interval on unmount
   * 
   * @effect
   * @listens []
   * @cleanup Clears refresh interval
   */

  useEffect(() => {
    fetchMetrics();

    const intervalId = setInterval(() => {
      fetchMetrics();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  /**
   * Renders metrics display
   * Shows total average and priority-based metrics
   * Uses optional chaining for null safety
   * Applies Tailwind CSS for styling
   * 
   * @returns {JSX.Element} Metrics display component
   */

  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-sm border border-gray-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-gray-600 text-sm">Average time to finish tasks:</p>
          <p className="text-2xl font-semibold">{metrics?.totalAverageMinutes} mins</p>
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
