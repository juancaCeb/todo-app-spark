package com.todoapp.todoappbackend.todotasks;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class TodoRepositoryInMemory implements TodoRepository{

    private List<TodoTask> todos = new ArrayList<>();
    private final int TODO_PAGE_SIZE = 10;

    public List<TodoTask> queryTasks(@RequestParam(required = false) String priority,
                                     @RequestParam(required = false) Boolean doneStatus,
                                     @RequestParam(required = false) String name) {
        return todos.stream()
                .filter(todo -> priority == null || priority.equalsIgnoreCase("All") || todo.getPriority().equals(priority))
                .filter(todo -> doneStatus == null ||
                        todo.getDoneStatus().equals(doneStatus))
                .filter(todo -> name == null || name.isEmpty() ||
                        todo.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public void createTodo(TodoTask newTodo) {
        todos.add(newTodo);

    }

    public List<TodoTask> getAllTodos(){
        return todos;

    }

    public void updateTodo(String id, Boolean isDone){
        TodoTask taskToUpdate = todos.stream()
                .filter(todo -> todo.getId().contains(id))
                .findFirst()
                .orElse(null);

        if (taskToUpdate != null) {
            taskToUpdate.setDoneStatus(isDone);
        } else {
            throw new IllegalArgumentException("Todo task with ID " + id + " not found.");
        }
    }

}
