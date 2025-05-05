package com.todoapp.todoappbackend.todotasks.Controller;

import com.todoapp.todoappbackend.todotasks.Entities.TodoMetric;
import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import com.todoapp.todoappbackend.todotasks.Service.TodoService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing Todo tasks.
 * Handles HTTP requests for creating, retrieving, updating, and deleting tasks.
 */
@CrossOrigin(origins = "http://localhost:8080")
@RestController
public class TodoTaskcontroller {

    private final TodoService todoService;

    public TodoTaskcontroller(TodoService todoService){
        this.todoService = todoService;

    }
    /**
     * Retrieves a paginated list of Todo tasks based on optional filters.
     *
     * @param priority   Filter by priority (e.g., low, medium, high).
     * @param doneStatus Filter by done status (e.g., done, notdone).
     * @param name       Filter by task name (partial match).
     * @param page       Page number for pagination (required).
     * @return A paginated list of Todo tasks with a custom header for task count.
     */

    @CrossOrigin(origins = "http://localhost:8080",exposedHeaders = "tasks-count")
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

    /**
     * Creates a new Todo task.
     *
     * @param todo The Todo task to be created.
     * @throws IllegalArgumentException if the input is invalid.
     */

    @PostMapping("/todos")
    public void createTodoTask(@RequestBody TodoTask todo) {
        if (todoService.isSanitized(todo)){
            todoService.createTodoTask(todo.getName(), todo.getPriority(), todo.getDueDate());
        }else{
            throw new IllegalArgumentException("Invalid input");
        }

    }

    /**
     * Updates the done status of a Todo task.
     *
     * @param id The ID of the task to update.
     */

    @PutMapping("/todos/{id}/doneStatus")
    public void changeTodoTaskDoneStatus(@PathVariable String id){
        todoService.updateTodoTaskStatus(id);

    }

    /**
     * Edits an existing Todo task.
     *
     * @param id   The ID of the task to edit.
     * @param todo The updated Todo task details.
     */

    @PutMapping("/todos/{id}")
    public void editTask(@PathVariable String id, @RequestBody TodoTask todo){
        todoService.editTodoTask(id, todo);

    }
    /**
     * Retrieves application metrics for Todo tasks.
     *
     * @return Metrics including average completion time by priority.
     */

    @GetMapping("/todos/metrics")
    public TodoMetric getMetrics(){
        return todoService.calculateAppMetrics();

    }
    /**
     * Deletes a Todo task by ID.
     *
     * @param id The ID of the task to delete.
     */

    @DeleteMapping("todos/{id}")
    public void deleteTodoTask(@PathVariable String id){
        todoService.deleteTodoTask(id);

    }

}
