package com.todoapp.todoappbackend.todotasks.Repository;

import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TodoRepositoryInMemory implements TodoRepository {

    private List<TodoTask> todos = new ArrayList<>();

    public void createTodo(TodoTask newTodo) {
        todos.add(newTodo);

    }

    public List<TodoTask> getAllTodos(){
        return todos;

    }

    public TodoTask searchTodoTaskById(String id){
        return todos.stream()
                .filter(todo -> todo.getId().contains(id))
                .findFirst().orElse(null);

    }

    public void deleteTodoTask(String id) {
        TodoTask todoTask = searchTodoTaskById(id);

        if (todoTask != null) {
            todos.remove(todoTask);
        } else {
            System.out.println("Todo with id " + id + " not found.");
        }

    }
}
