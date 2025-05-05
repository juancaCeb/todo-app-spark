package com.todoapp.todoappbackend.todotasks.Entities;

/**
 * Entity class representing metrics for Todo tasks.
 * This class encapsulates average completion times for tasks based on their priority levels.
 */
public class TodoMetric {

    private String totalAverageMinutes; // Average completion time for all tasks
    private String highPriorityAverageMinutes; // Average completion time for high-priority tasks
    private String mediumPriorityAverageMinutes; // Average completion time for medium-priority tasks
    private String lowPriorityAverageMinutes; // Average completion time for low-priority tasks

    /**
     * Constructor to initialize a TodoMetric object with average completion times.
     *
     * @param totalAverageMinutes       Average completion time for all tasks.
     * @param highPriorityAverageMinutes Average completion time for high-priority tasks.
     * @param mediumPriorityAverageMinutes Average completion time for medium-priority tasks.
     * @param lowPriorityAverageMinutes Average completion time for low-priority tasks.
     */
    public TodoMetric(String totalAverageMinutes, String highPriorityAverageMinutes, String mediumPriorityAverageMinutes, String lowPriorityAverageMinutes) {
        this.totalAverageMinutes = totalAverageMinutes;
        this.highPriorityAverageMinutes = highPriorityAverageMinutes;
        this.mediumPriorityAverageMinutes = mediumPriorityAverageMinutes;
        this.lowPriorityAverageMinutes = lowPriorityAverageMinutes;
    }

    /**
     * Gets the average completion time for all tasks.
     *
     * @return The total average completion time.
     */
    public String getTotalAverageMinutes() {
        return totalAverageMinutes;
    }

    /**
     * Sets the average completion time for all tasks.
     *
     * @param totalAverageMinutes The total average completion time.
     */
    public void setTotalAverageMinutes(String totalAverageMinutes) {
        this.totalAverageMinutes = totalAverageMinutes;
    }

    /**
     * Gets the average completion time for high-priority tasks.
     *
     * @return The high-priority average completion time.
     */
    public String getHighPriorityAverageMinutes() {
        return highPriorityAverageMinutes;
    }

    /**
     * Sets the average completion time for high-priority tasks.
     *
     * @param highPriorityAverageMinutes The high-priority average completion time.
     */
    public void setHighPriorityAverageMinutes(String highPriorityAverageMinutes) {
        this.highPriorityAverageMinutes = highPriorityAverageMinutes;
    }

    /**
     * Gets the average completion time for medium-priority tasks.
     *
     * @return The medium-priority average completion time.
     */
    public String getMediumPriorityAverageMinutes() {
        return mediumPriorityAverageMinutes;
    }

    /**
     * Sets the average completion time for medium-priority tasks.
     *
     * @param mediumPriorityAverageMinutes The medium-priority average completion time.
     */
    public void setMediumPriorityAverageMinutes(String mediumPriorityAverageMinutes) {
        this.mediumPriorityAverageMinutes = mediumPriorityAverageMinutes;
    }

    /**
     * Gets the average completion time for low-priority tasks.
     *
     * @return The low-priority average completion time.
     */
    public String getLowPriorityAverageMinutes() {
        return lowPriorityAverageMinutes;
    }

    /**
     * Sets the average completion time for low-priority tasks.
     *
     * @param lowPriorityAverageMinutes The low-priority average completion time.
     */
    public void setLowPriorityAverageMinutes(String lowPriorityAverageMinutes) {
        this.lowPriorityAverageMinutes = lowPriorityAverageMinutes;
    }
}