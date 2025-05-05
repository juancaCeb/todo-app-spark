package com.todoapp.todoappbackend.todotasks.Repository;

import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * In-memory implementation of the TodoRepository interface.
 * This class provides a temporary storage solution for Todo tasks,
 * useful for testing and development purposes without a database.
 */
@Repository
public class TodoRepositoryInMemory implements TodoRepository {

    private final List<TodoTask> todos = new ArrayList<>();

    /**
     * Adds a new Todo task to the in-memory list.
     *
     * @param newTodo The Todo task to be added.
     */
    @Override
    public void createTodo(TodoTask newTodo) {
        todos.add(newTodo);
    }

    /**
     * Retrieves all Todo tasks stored in memory.
     *
     * @return A list of all Todo tasks.
     */
    @Override
    public List<TodoTask> getAllTodos() {
        return todos;
    }

    /**
     * Searches for a Todo task by its ID.
     *
     * @param id The ID of the Todo task to search for.
     * @return The Todo task if found, otherwise null.
     */
    @Override
    public TodoTask searchTodoTaskById(String id) {
        return todos.stream()
                .filter(todo -> todo.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    /**
     * Deletes a Todo task by its ID.
     *
     * @param id The ID of the Todo task to delete.
     */
    @Override
    public void deleteTodoTask(String id) {
        TodoTask todoTask = searchTodoTaskById(id);
        if (todoTask != null) {
            todos.remove(todoTask);
        } else {
            System.out.println("Todo with id " + id + " not found.");
        }
    }
}