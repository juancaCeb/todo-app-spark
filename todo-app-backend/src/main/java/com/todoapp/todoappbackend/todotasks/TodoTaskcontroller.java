package com.todoapp.todoappbackend.todotasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController

public class TodoTaskcontroller {

    private final TodoService todoService;

    public TodoTaskcontroller(TodoService todoService){
        this.todoService = todoService;

    }

    @GetMapping("/todos")
    public List<TodoTask> getTodoTasks(@RequestParam(required = false) String priority,
                                       @RequestParam(required = false)Boolean doneStatus,
                                       @RequestParam(required = false)String name
                                     //   ,@RequestParam(required = true)int page
                                        )
    {
        return todoService.getTasks(priority, doneStatus, name);

    }

    @PostMapping("/todos")
    public void createTodoTask(@RequestBody TodoTask todo) {
        todoService.createTodoTask(todo.getDescription(), todo.getPriority(), todo.getDueDate(), todo.getDoneStatus());
    }

    @PutMapping("/todos/{id}")
    public void changeTodoTaskStatus(@PathVariable String id, Boolean isDone){
        todoService.updateTodoTaskStatus(id, isDone);

    }






}
