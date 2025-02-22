package com.todoapp.todoappbackend.todotasks.Controller;

import com.todoapp.todoappbackend.todotasks.Entities.TodoMetric;
import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import com.todoapp.todoappbackend.todotasks.Service.TodoService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController

public class TodoTaskcontroller {

    private final TodoService todoService;

    public TodoTaskcontroller(TodoService todoService){
        this.todoService = todoService;

    }

    @CrossOrigin(origins = "http://localhost:8080", exposedHeaders = "tasks-count")
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

    @PutMapping("/todos/{id}/doneStatus")
    public void changeTodoTaskDoneStatus(@PathVariable String id){
        todoService.updateTodoTaskStatus(id);

    }

    @PutMapping("/todos/{id}")
    public void editTask(@PathVariable String id, @RequestBody TodoTask todo){
        todoService.editTodoTask(id, todo);

    }

    @GetMapping("/todos/metrics")
    public TodoMetric getMetrics(){
        return todoService.calculateAppMetrics();

    }

    @DeleteMapping("todos/{id}")
    public void deleteTodoTask(@PathVariable String id){
        todoService.deleteTodoTask(id);

    }

}
