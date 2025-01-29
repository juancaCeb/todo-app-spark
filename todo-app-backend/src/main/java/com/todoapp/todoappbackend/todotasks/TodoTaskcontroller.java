package com.todoapp.todoappbackend.todotasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
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

    @CrossOrigin(origins = "http://localhost:3000", exposedHeaders = "tasks-count")
    @GetMapping("/todos")
    public ResponseEntity<List<TodoTask>> getTodoTasks(@RequestParam(required = false) String priority,
                                                      @RequestParam(required = false) String doneStatus,
                                                      @RequestParam(required = false)String name,
                                                      @RequestParam(required = true)int page)
    {
        List<TodoTask> todos = todoService.getTasks(priority, doneStatus, name, page);
        int taskCount = todos.size();
        List<TodoTask> paginatedTodos = todoService.paginateResponse(todos, page);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("tasks-count", String.valueOf(taskCount));

        return new ResponseEntity<>(paginatedTodos, responseHeaders, 200);

    }

    @PostMapping("/todos")
    public void createTodoTask(@RequestBody TodoTask todo) {
        todoService.createTodoTask(todo.getName(), todo.getPriority(), todo.getDueDate());
    }

    @PutMapping("/todos/{id}")
    public void changeTodoTaskStatus(@PathVariable String id){
        todoService.updateTodoTaskStatus(id);

    }

    @GetMapping("/todos/metrics")
    public TodoMetric getMetrics(){
        return todoService.calculateAppMetrics();

    }





}
