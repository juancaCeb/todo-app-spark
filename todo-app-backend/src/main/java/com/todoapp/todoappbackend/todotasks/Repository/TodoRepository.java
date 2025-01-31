package com.todoapp.todoappbackend.todotasks.Repository;

import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface TodoRepository {

    List<TodoTask> getAllTodos();
    void createTodo(TodoTask newTodo);
    TodoTask searchTodoTaskById(String id);
    void deleteTodoTask(String id);

}
