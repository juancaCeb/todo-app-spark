import { Todo } from '../../types/todo.types';
import dayjs from 'dayjs';

/**
 * Updates a todo item in the API
 * @param todo - Todo item to update
 * @param token - Authentication token
 * @returns Promise with update status
 */

interface UpdateTodoResponse {
    success: boolean;
    error?: string;
  }

  
export const TODO_API = {
    BASE_URL: 'http://localhost:9090',
    ENDPOINTS: {
      UPDATE: (id: string) => `${TODO_API.BASE_URL}/todos/${id}`,
    },
  } as const;


export const updateTodo = async (todo: Todo, token: string): Promise<UpdateTodoResponse> => {
    try {
      // Format due date if exists
      const formattedDueDate = todo.dueDate && todo.dueDate !== '' 
        ? dayjs(todo.dueDate).format('YYYY-MM-DD[T]HH:mm:ss')
        : null;
  
      const updatedTodo = { ...todo, dueDate: formattedDueDate };
  
      const response = await fetch(TODO_API.ENDPOINTS.UPDATE(todo.id), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update todo: ${response.status} ${errorText}`);
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error updating todo:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  };