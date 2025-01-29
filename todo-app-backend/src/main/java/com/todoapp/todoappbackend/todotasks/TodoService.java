package com.todoapp.todoappbackend.todotasks;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final int TODO_PAGE_SIZE = 10;

    public TodoService (TodoRepository todoRepository) {
        this.todoRepository = todoRepository;

    }

    public List<TodoTask> getTasks(String priority, String doneStatus, String name, int page){
        List<TodoTask> Alltodos = todoRepository.getAllTodos();

        List<TodoTask> todos =  Alltodos.stream()
                .filter(todo -> priority == null || priority.equalsIgnoreCase("All") || todo.getPriority().equals(priority))
                .filter(todo -> doneStatus.equalsIgnoreCase("All")||
                        todo.getDoneStatus().equals(doneStatus))
                .filter(todo -> name == null || name.isEmpty() ||
                        todo.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();


        return todos;

    }

    public List<TodoTask> paginateResponse(List<TodoTask> todos, int page){

        int startIndex = (page - 1) * TODO_PAGE_SIZE;

        int endIndex = Math.min(startIndex + TODO_PAGE_SIZE, todos.size());

        if (startIndex >= todos.size()) {
            return new ArrayList<>();
        }

        return todos.subList(startIndex, endIndex);
    }

    public int getTodoListCount(){

        return todoRepository.getAllTodos().size();

    }


    public void createTodoTask(String name, String priority, LocalDateTime dueDate){
        TodoTask newTodo = new TodoTask(name, priority, dueDate);
        todoRepository.createTodo(newTodo);

    }

    public void updateTodoTaskStatus(String id){
        todoRepository.updateTodoTask(id);

    }

    public TodoMetric calculateAppMetrics(){

        List<TodoTask> todos = todoRepository.getAllTodos();


        List<TodoTask> highPriorityTodos = new ArrayList<>();

        for (TodoTask todo : todos) {
            if ("High".equals(todo.getPriority())) {
                highPriorityTodos.add(todo);
            }
        }

        List<TodoTask> lowPriorityTodos = new ArrayList<>();

        for (TodoTask todo : todos) {
            if ("Low".equals(todo.getPriority())) {
                lowPriorityTodos.add(todo);
            }
        }

        List<TodoTask> mediumPriorityTodos = new ArrayList<>();

        for (TodoTask todo : todos) {
            if ("Medium".equals(todo.getPriority())) {
                mediumPriorityTodos.add(todo);
            }
        }

        String totalAverageMetric = calculateAverageTime(todos);
        String highPriorityMetric = calculateAverageTime(highPriorityTodos);
        String mediumPriorityMetric = calculateAverageTime(mediumPriorityTodos);
        String lowPriorityMetric = calculateAverageTime(lowPriorityTodos);

        TodoMetric metrics = new TodoMetric(totalAverageMetric, highPriorityMetric, mediumPriorityMetric, lowPriorityMetric);

        return metrics;
    }

    private String calculateAverageTime(List<TodoTask> todos){

        int totalSeconds = 0;

        for(TodoTask todo : todos){

            if(todo.getDoneDate() == null){
                totalSeconds += (int) ChronoUnit.SECONDS.between(todo.getCreationDate(), LocalDateTime.now());
            }else{
                totalSeconds += (int) ChronoUnit.SECONDS.between(todo.getCreationDate(), LocalDateTime.now());

            }

        }

        if(todos.isEmpty()){
            return convertSecondsToMinutesAndSeconds(totalSeconds);
        }

        return convertSecondsToMinutesAndSeconds(totalSeconds/todos.size());

    }

    private String convertSecondsToMinutesAndSeconds(int totalSeconds) {
        int minutes = totalSeconds / 60;
        int seconds = totalSeconds % 60;

        return String.format("%d:%02d", minutes, seconds);
    }



}
