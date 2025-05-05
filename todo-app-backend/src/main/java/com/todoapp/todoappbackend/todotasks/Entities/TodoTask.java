package com.todoapp.todoappbackend.todotasks.Entities;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity class representing a Todo Task.
 * This class encapsulates the details of a task, including its name, priority, status, and timestamps.
 */
public class TodoTask {

    private final String id; // Unique identifier for the task
    private String priority; // Priority of the task (e.g., Low, Medium, High)
    private LocalDateTime creationDate; // Timestamp when the task was created
    private LocalDateTime dueDate; // Due date for the task
    private String name; // Name or description of the task
    private String doneStatus; // Status of the task (e.g., Done, Undone)
    private LocalDateTime doneDate; // Timestamp when the task was marked as done

    /**
     * Constructor to initialize a new TodoTask.
     *
     * @param name     The name or description of the task.
     * @param priority The priority of the task (e.g., Low, Medium, High).
     * @param dueDate  The due date for the task.
     */
    public TodoTask(String name, String priority, LocalDateTime dueDate) {
        this.priority = priority;
        this.dueDate = dueDate;
        this.doneStatus = "Undone";
        this.name = name;
        this.creationDate = LocalDateTime.now();
        this.id = UUID.randomUUID().toString();
    }

    /**
     * Gets the unique identifier of the task.
     *
     * @return The task ID.
     */
    public String getId() {
        return this.id;
    }

    /**
     * Gets the priority of the task.
     *
     * @return The task priority.
     */
    public String getPriority() {
        return priority;
    }

    /**
     * Sets the priority of the task.
     *
     * @param priority The new priority of the task.
     */
    public void setPriority(String priority) {
        this.priority = priority;
    }

    /**
     * Gets the creation date of the task.
     *
     * @return The creation timestamp.
     */
    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    /**
     * Sets the creation date of the task.
     *
     * @param creationDate The new creation timestamp.
     */
    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    /**
     * Gets the due date of the task.
     *
     * @return The due date.
     */
    public LocalDateTime getDueDate() {
        return dueDate;
    }

    /**
     * Sets the due date of the task.
     *
     * @param dueDate The new due date.
     */
    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    /**
     * Gets the name or description of the task.
     *
     * @return The task name.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name or description of the task.
     *
     * @param name The new task name.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Toggles the done status of the task between "Done" and "Undone".
     */
    public void changeDoneStatus() {
        if (this.doneStatus.equals("Undone")) {
            this.doneStatus = "Done";
        } else {
            this.doneStatus = "Undone";
        }
    }

    /**
     * Gets the current done status of the task.
     *
     * @return The done status (e.g., Done, Undone).
     */
    public String getDoneStatus() {
        return this.doneStatus;
    }

    /**
     * Sets the timestamp when the task was marked as done.
     *
     * @param date The done timestamp.
     */
    public void setDoneDate(LocalDateTime date) {
        this.doneDate = date;
    }

    /**
     * Gets the timestamp when the task was marked as done.
     *
     * @return The done timestamp.
     */
    public LocalDateTime getDoneDate() {
        return this.doneDate;
    }
}