package com.todoapp.todoappbackend.todotasks.Entities;

import java.time.LocalDateTime;
import java.util.UUID;

public class TodoTask {

    private final String id;
    private String priority;
    private LocalDateTime creationDate;
    private LocalDateTime dueDate;
    private String name;
    private String doneStatus;
    private LocalDateTime doneDate;

    public TodoTask(String name, String priority, LocalDateTime dueDate){
        this.priority = priority;
        this.dueDate = dueDate;
        this.doneStatus = "Undone";
        this.name = name;
        this.creationDate = LocalDateTime.now();
        this.id = UUID.randomUUID().toString();
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


    public void changeDoneStatus() {
        if(this.doneStatus.equals("Undone")){
            this.doneStatus = "Done";
        }else{
            this.doneStatus = "Undone";
        }
    }

    public String getDoneStatus() {
        return this.doneStatus;
    }

    public void setDoneDate(LocalDateTime date){
        this.doneDate = date;
    }

    public LocalDateTime getDoneDate(){
        return this.doneDate;
    }

}
