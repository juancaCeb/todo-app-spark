package com.todoapp.todoappbackend.todotasks;

import java.util.Date;
import java.util.List;

public interface TodoRepository {

    List<TodoTask> getAllTodos();
    void createTodo(TodoTask newTodo);
    TodoTask searchTodoTaskById(String id);
    void updateTodoTask(String id);


}
