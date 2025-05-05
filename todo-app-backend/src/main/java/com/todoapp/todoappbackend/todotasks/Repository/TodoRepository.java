package com.todoapp.todoappbackend.todotasks.Repository;

import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for managing Todo tasks.
 * This interface abstracts the data access layer, allowing for different implementations.
 *
 * Current implementation: In-memory storage (`TodoRepositoryInMemory`).
 *
 * Future scope: This interface is designed to support integration with a real database
 * (e.g., SQL, NoSQL) by creating a new implementation that interacts with the database.
 */
@Repository
public interface TodoRepository {

    /**
     * Retrieves all Todo tasks.
     *
     * @return A list of all Todo tasks.
     */
    List<TodoTask> getAllTodos();

    /**
     * Adds a new Todo task.
     *
     * @param newTodo The Todo task to be added.
     */
    void createTodo(TodoTask newTodo);

    /**
     * Searches for a Todo task by its ID.
     *
     * @param id The ID of the Todo task to search for.
     * @return The Todo task if found, otherwise null.
     */
    TodoTask searchTodoTaskById(String id);

    /**
     * Deletes a Todo task by its ID.
     *
     * @param id The ID of the Todo task to delete.
     */
    void deleteTodoTask(String id);
}