package com.todoapp.todoappbackend.todotasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<TodoTask> queryTasks(@RequestParam(required = false) String priority,
                                     @RequestParam(required = false)Boolean doneStatus,
                                     @RequestParam(required = false)String name){

        return todoRepository.queryTasks(priority, doneStatus, name);

    }

    public void createTodoTask(String description, String priority, Date dueDate, Boolean isDone){
        TodoTask newTodo = new TodoTask(description, priority, dueDate, isDone);
        todoRepository.createTodoTask(newTodo);

    }

    public void updateTodoTaskStatus(String id, Boolean isDone){
        todoRepository.updateTodoTaskStatus(id, isDone);

    }

}
