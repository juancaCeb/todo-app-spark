package com.todoapp.todoappbackend.todotasks.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import com.todoapp.todoappbackend.todotasks.Repository.TodoRepository;
import com.todoapp.todoappbackend.todotasks.Service.TodoService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class TodoTaskcontrollerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getTodoTasks() throws Exception {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private TodoService todoService;

        @Autowired
        private ObjectMapper objectMapper;

        String priority = "high";
        String doneStatus = "notdone";
        String name = "test task";
        int page = 1;

    }

    @Test
    void createTodoTask() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/todos")
                        .contentType("application/json")
                        .content("{\"name\": \"Task 1\", \"priority\": \"High\", \"dueDate\": \"2025-02-08T00:00:00\"}")
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void shouldReturnListOfTodosAndStatus200() throws Exception {
        // Arrange: Mock a TodoTask list
        TodoTask mockTask = new TodoTask("1", "Test Task", "HIGH", false, LocalDate.now());
        List<TodoTask> mockList = List.of(mockTask);

        when(todoService.getTasks(null, null, null, 1)).thenReturn(mockList);
        when(todoService.paginateResponse(mockList, 1)).thenReturn(mockList);

        // Act & Assert
        mockMvc.perform(get("/todos?page=1"))
                .andExpect(status().isOk())
                .andExpect(header().string("tasks-count", "1"))
                .andExpect(jsonPath("$[0].name").value("Test Task"))
                .andExpect(jsonPath("$[0].priority").value("HIGH"))
                .andExpect(jsonPath("$[0].done").value(false));
    }


    @Test
    void editTask() {
    }

    @Test
    void getMetrics() {
    }

    @Test
    void deleteTodoTask() {
    }
}