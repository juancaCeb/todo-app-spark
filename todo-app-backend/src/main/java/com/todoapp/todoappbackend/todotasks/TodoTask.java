package com.todoapp.todoappbackend.todotasks;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class TodoTask {

    private final String id = UUID.randomUUID().toString();
    private String priority;
    private LocalDateTime creationDate;
    private LocalDateTime dueDate;
    private String name;
    private Boolean isDone;
    private LocalDateTime doneDate;

    public TodoTask(String name, String priority, LocalDateTime dueDate, Boolean isDone){
        this.priority = priority;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.name = name;
        this.creationDate = LocalDateTime.now();
    }

    public String getId() {
        return this.id;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String description) {
        this.name = description;
    }


    public void setDoneStatus(Boolean isDone) {
        this.isDone = isDone;
    }

    public Boolean getDoneStatus() {
        return this.isDone;
    }

    public void setDoneDate(LocalDateTime date){
        this.doneDate = date;
    }

    public LocalDateTime getDoneDate(){
        return this.doneDate;
    }

}
