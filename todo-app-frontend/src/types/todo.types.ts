
/**
 * Represents the priority levels for a todo item
 */
export type Priority = 'Low' | 'Medium' | 'High';

/**
 * Represents the status options for a todo item
 */
export type TodoStatus = 'Done' | 'Pending';

/**
 * Represents the sorting options for due dates
 */
export type DueDateSortOption = 'All' | 'Closest' | 'Farthest';

/**
 * Represents a todo item in the application
 */
export interface Todo {
    id: string;
    name: string;
    priority: string;
    dueDate: string | null;
    doneStatus: string;
  }


/**
 * Props for the TodoTable component
 */
export interface TodoTableProps {
    todos: Todo[];
    performFetch: () => void;
    setTodos: (todos: Todo[]) => void;
    currPage: number;
    numOfTotalPages: number;
  }

export const DUE_DATE_COLORS = {
URGENT: 'bg-red-100',
WARNING: 'bg-yellow-100',
SAFE: 'bg-green-100',
DEFAULT: ''
} as const;

export const TIME_PERIODS = {
ONE_WEEK: 1,
TWO_WEEKS: 2
} as const;

export interface TaskMetrics {
    totalAverageMinutes: number;
    highPriorityAverageMinutes: number;
    mediumPriorityAverageMinutes: number;
    lowPriorityAverageMinutes: number;
  }

