package com.todoapp.todoappbackend.todotasks;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class TodoRepository {

    private List<TodoTask> todos = new ArrayList<>();

    public List<TodoTask> queryTasks(@RequestParam(required = false) String priority,
                                     @RequestParam(required = false) Boolean doneStatus,
                                     @RequestParam(required = false) String name) {
        return todos.stream()
                .filter(todo -> priority == null || priority.equalsIgnoreCase("All") || todo.getPriority().equals(priority))
                .filter(todo -> doneStatus == null ||
                        todo.getDoneStatus().equals(doneStatus))
                .filter(todo -> name == null || name.isEmpty() ||
                        todo.getDescription().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public void createTodoTask(TodoTask newTodoTask) {
        todos.add(newTodoTask);
    }

    public void updateTodoTaskStatus(String id, Boolean isDone){
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
