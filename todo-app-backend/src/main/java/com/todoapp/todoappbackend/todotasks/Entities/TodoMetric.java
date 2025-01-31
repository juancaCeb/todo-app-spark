package com.todoapp.todoappbackend.todotasks.Entities;

public class TodoMetric {

    private String totalAverageMinutes;
    private String highPriorityAverageMinutes;
    private String mediumPriorityAverageMinutes;
    private String lowPriorityAverageMinutes;

    public TodoMetric(String totalAverageMinutes, String highPriorityAverageMinutes, String mediumPriorityAverageMinutes, String lowPriorityAverageMinutes){

        this.totalAverageMinutes= totalAverageMinutes;
        this.highPriorityAverageMinutes = highPriorityAverageMinutes;
        this.mediumPriorityAverageMinutes = mediumPriorityAverageMinutes;
        this.lowPriorityAverageMinutes = lowPriorityAverageMinutes;

    }

    public String getTotalAverageMinutes() {
        return totalAverageMinutes;
    }

    public void setTotalAverageMinutes(String totalAverageMinutes) {
        this.totalAverageMinutes = totalAverageMinutes;
    }

    public String getHighPriorityAverageMinutes() {
        return highPriorityAverageMinutes;
    }

    public String getLowPriorityAverageMinutes() {
        return lowPriorityAverageMinutes;
    }

    public String getMediumPriorityAverageMinutes() {
        return mediumPriorityAverageMinutes;
    }

    public void setHighPriorityAverageMinutes(String highPriorityAverageMinutes) {
        this.highPriorityAverageMinutes = highPriorityAverageMinutes;
    }

    public void setLowPriorityAverageMinutes(String lowPriorityAverageMinutes) {
        this.lowPriorityAverageMinutes = lowPriorityAverageMinutes;
    }

    public void setMediumPriorityAverageMinutes(String mediumPriorityAverageMinutes) {
        this.mediumPriorityAverageMinutes = mediumPriorityAverageMinutes;
    }

}
