package com.todoapp.todoappbackend.todotasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController

public class TodoTaskcontroller {

    @Autowired
    private TodoService todoService;

    @GetMapping("/todos")
    public List<TodoTask> getTodoTasks(@RequestParam(required = false) String priority,
                                       @RequestParam(required = false)Boolean doneStatus,
                                       @RequestParam(required = false)String name){
        return todoService.queryTasks(priority, doneStatus, name);

    }

    @PostMapping("/todos")
    public void createTodoTask(String description, String priority,Date dueDate, Boolean isDone){
        todoService.createTodoTask(description, priority, dueDate, isDone);

    }

    @PutMapping("/todos/{id}")
    public void changeTodoTaskStatus(@PathVariable String id, Boolean isDone){

        todoService.updateTodoTaskStatus(id, isDone);

    }






}
