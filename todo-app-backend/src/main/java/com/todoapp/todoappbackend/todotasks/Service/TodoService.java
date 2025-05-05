package com.todoapp.todoappbackend.todotasks.Service;

import com.todoapp.todoappbackend.todotasks.Entities.TodoMetric;
import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import com.todoapp.todoappbackend.todotasks.Repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

/**
 * Service class for managing Todo tasks.
 * Handles business logic such as task creation, updates, deletion, and metrics calculation.
 */
@Service
public class TodoService {

    private static final int TODO_PAGE_SIZE = 10;
    private static final int NAME_MAX_LENGTH = 100;

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * Retrieves a filtered list of Todo tasks based on priority, done status, and name.
     *
     * @param priority   Filter by task priority (low, medium, high, or all).
     * @param doneStatus Filter by task completion status (done, notdone, or all).
     * @param name       Filter by partial match of task name.
     * @param page       Page number for pagination.
     * @return A filtered list of TodoTask objects.
     */
    public List<TodoTask> getTasks(String priority, String doneStatus, String name, int page) {
        List<TodoTask> allTodos = todoRepository.getAllTodos();

        return allTodos.stream()
                .filter(todo -> priority == null || priority.equalsIgnoreCase("All") || todo.getPriority().equalsIgnoreCase(priority))
                .filter(todo -> doneStatus == null || doneStatus.equalsIgnoreCase("All") || todo.getDoneStatus().equalsIgnoreCase(doneStatus))
                .filter(todo -> name == null || name.isEmpty() || todo.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();
    }

    /**
     * Paginates the list of tasks based on the page number.
     *
     * @param todos The list of tasks to paginate.
     * @param page  The page number.
     * @return A sublist of tasks for the specified page.
     */
    public List<TodoTask> paginateResponse(List<TodoTask> todos, int page) {
        int startIndex = (page - 1) * TODO_PAGE_SIZE;
        int endIndex = Math.min(startIndex + TODO_PAGE_SIZE, todos.size());

        if (startIndex >= todos.size()) {
            return new ArrayList<>();
        }

        return todos.subList(startIndex, endIndex);
    }

    /**
     * Updates an existing task with new details.
     *
     * @param id      The ID of the task to update.
     * @param newTodo The updated task details.
     */
    public void editTodoTask(String id, TodoTask newTodo) {
        TodoTask oldTodoTask = todoRepository.searchTodoTaskById(id);
        oldTodoTask.setName(newTodo.getName());
        oldTodoTask.setDueDate(newTodo.getDueDate());
        oldTodoTask.setPriority(newTodo.getPriority());
    }

    /**
     * Creates a new Todo task.
     *
     * @param name     The name of the task.
     * @param priority The priority of the task (low, medium, high).
     * @param dueDate  The due date of the task.
     */
    public void createTodoTask(String name, String priority, LocalDateTime dueDate) {
        if (!isSanitized(new TodoTask(name, priority, dueDate))) {
            throw new IllegalArgumentException("Invalid input data for Todo task.");
        }
        TodoTask newTodo = new TodoTask(name, priority, dueDate);
        todoRepository.createTodo(newTodo);
    }

    /**
     * Toggles the completion status of a task.
     *
     * @param id The ID of the task to update.
     */
    public void updateTodoTaskStatus(String id) {
        TodoTask todo = todoRepository.searchTodoTaskById(id);
        todo.changeDoneStatus();

        if ("Done".equalsIgnoreCase(todo.getDoneStatus())) {
            todo.setDoneDate(LocalDateTime.now());
        } else {
            todo.setDoneDate(null);
        }
    }

    /**
     * Calculates metrics for tasks, such as average completion time by priority.
     *
     * @return A TodoMetric object containing metrics for all, high, medium, and low-priority tasks.
     */
    public TodoMetric calculateAppMetrics() {
        List<TodoTask> todos = todoRepository.getAllTodos();

        String totalAverageMetric = calculateAverageTime(todos);
        String highPriorityMetric = calculateAverageTime(filterTasksByPriority(todos, "High"));
        String mediumPriorityMetric = calculateAverageTime(filterTasksByPriority(todos, "Medium"));
        String lowPriorityMetric = calculateAverageTime(filterTasksByPriority(todos, "Low"));

        return new TodoMetric(totalAverageMetric, highPriorityMetric, mediumPriorityMetric, lowPriorityMetric);
    }

    /**
     * Deletes a task by its ID.
     *
     * @param id The ID of the task to delete.
     */
    public void deleteTodoTask(String id) {
        todoRepository.deleteTodoTask(id);
    }

    /**
     * Validates the input data for a task.
     *
     * @param todo The task to validate.
     * @return true if the task is valid, otherwise false.
     */
    public boolean isSanitized(TodoTask todo) {
        return validateName(todo.getName()) &&
                validatePriority(todo.getPriority()) &&
                validateDueDate(todo.getDueDate());
    }

    private boolean validatePriority(String priority) {
        return priority != null && (priority.equalsIgnoreCase("low") ||
                priority.equalsIgnoreCase("medium") ||
                priority.equalsIgnoreCase("high"));
    }

    private boolean validateDueDate(LocalDateTime dueDate) {
        return dueDate != null && dueDate.isAfter(LocalDateTime.now());
    }

    private boolean validateName(String name) {
        return name != null && !name.isEmpty() && name.length() <= NAME_MAX_LENGTH;
    }

    private List<TodoTask> filterTasksByPriority(List<TodoTask> todos, String priority) {
        return todos.stream()
                .filter(todo -> priority.equalsIgnoreCase(todo.getPriority()))
                .toList();
    }

    private String calculateAverageTime(List<TodoTask> todos) {
        int totalSeconds = todos.stream()
                .mapToInt(todo -> {
                    if (todo.getDoneDate() == null) {
                        return (int) ChronoUnit.SECONDS.between(todo.getCreationDate(), LocalDateTime.now());
                    } else {
                        return (int) ChronoUnit.SECONDS.between(todo.getCreationDate(), todo.getDoneDate());
                    }
                })
                .sum();

        if (todos.isEmpty()) {
            return convertSecondsToMinutesAndSeconds(totalSeconds);
        }

        return convertSecondsToMinutesAndSeconds(totalSeconds / todos.size());
    }

    private String convertSecondsToMinutesAndSeconds(int totalSeconds) {
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;
        return String.format("%d:%02d", minutes, seconds);
    }
}