package com.todoapp.todoappbackend.todotasks;

import java.util.Date;
import java.util.List;

public interface TodoRepository {

    List<TodoTask> getAllTodos();
    void createTodo(TodoTask newTodo);
    void updateTodo(String id, Boolean isDone);


}
