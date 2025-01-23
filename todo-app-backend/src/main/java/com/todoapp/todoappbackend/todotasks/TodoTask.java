package com.todoapp.todoappbackend.todotasks;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class TodoTask {

    private final String id = UUID.randomUUID().toString();
    private String priority;
    private LocalDateTime creationDate;
    private Date dueDate;
    private String description;
    private Boolean isDone;

    public TodoTask(String description, String priority, Date dueDate, Boolean isDone){
        this.priority = priority;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.description = description;
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

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public void setIsDone(Boolean isDone) {
        this.isDone = isDone;
    }

    public Boolean getDoneStatus() {
        return this.isDone;
    }

}
