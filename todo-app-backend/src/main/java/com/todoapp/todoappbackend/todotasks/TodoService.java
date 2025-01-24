package com.todoapp.todoappbackend.todotasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService (TodoRepository todoRepository) {
        this.todoRepository = todoRepository;

    }

    public List<TodoTask> getTasks(String priority, Boolean doneStatus, String name /*int page*/){
        return todoRepository.getAllTodos();

    }
    public void createTodoTask(String description, String priority, Date dueDate, Boolean isDone){
        TodoTask newTodo = new TodoTask(description, priority, dueDate, isDone);
        todoRepository.createTodo(newTodo);

    }

    public void updateTodoTaskStatus(String id, Boolean isDone){
        todoRepository.updateTodo(id, isDone);

    }

}
