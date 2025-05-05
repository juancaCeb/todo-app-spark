package com.todoapp.todoappbackend.todotasks.Service;

import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import com.todoapp.todoappbackend.todotasks.Entities.TodoMetric;
import com.todoapp.todoappbackend.todotasks.Repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createTodoTask() {
        TodoTask task = new TodoTask("Test Task", "HIGH", LocalDateTime.now().plusDays(1));
        //when(todoRepository.createTodo(any(TodoTask.class))).thenReturn(task);

        assertDoesNotThrow(() -> todoService.createTodoTask("Test Task", "HIGH", LocalDateTime.now().plusDays(1)));
        verify(todoRepository, times(1)).createTodo(any(TodoTask.class));
    }

    @Test
    void updateTodoTaskStatus() {
        TodoTask task = new TodoTask("Test Task", "HIGH", LocalDateTime.now());

        when(todoRepository.searchTodoTaskById("1")).thenReturn(task);

        todoService.updateTodoTaskStatus("1");

        assertEquals("Done", task.getDoneStatus());
        assertNotNull(task.getDoneDate());
        verify(todoRepository, times(1)).searchTodoTaskById("1");
    }

    @Test
    void calculateAppMetrics() {
        TodoTask task1 = new TodoTask("Task 1", "HIGH", LocalDateTime.now().plusDays(1));
        task1.setDoneDate(LocalDateTime.now());
        TodoTask task2 = new TodoTask("Task 2", "LOW", LocalDateTime.now().plusDays(2));
        task2.setDoneDate(LocalDateTime.now());
        when(todoRepository.getAllTodos()).thenReturn(List.of(task1, task2));

        TodoMetric metrics = todoService.calculateAppMetrics();

        assertNotNull(metrics);
        assertNotNull(metrics.getTotalAverageMinutes());
        verify(todoRepository, times(1)).getAllTodos();
    }

    @Test
    void deleteTodoTask() {
        doNothing().when(todoRepository).deleteTodoTask("1");

        assertDoesNotThrow(() -> todoService.deleteTodoTask("1"));
        verify(todoRepository, times(1)).deleteTodoTask("1");
    }

    @Test
    void isSanitized_validTask() {
        TodoTask task = new TodoTask("Valid Task", "HIGH", LocalDateTime.now().plusDays(1));

        assertTrue(todoService.isSanitized(task));
    }

    @Test
    void isSanitized_invalidTask() {
        TodoTask task = new TodoTask("", "INVALID", LocalDateTime.now().minusDays(1));

        assertFalse(todoService.isSanitized(task));
    }
}