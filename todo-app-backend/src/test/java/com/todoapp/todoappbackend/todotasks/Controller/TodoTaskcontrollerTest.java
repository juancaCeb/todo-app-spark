package com.todoapp.todoappbackend.todotasks.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import com.todoapp.todoappbackend.todotasks.Service.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TodoTaskcontrollerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TodoService todoService;

    private String getToken() throws Exception {
        MvcResult result = mockMvc.perform(get("/token"))
                .andExpect(status().isOk())
                .andReturn();

        return result.getResponse().getContentAsString();
    }

    @Test
    void getTodoTasks() throws Exception {
        String token = getToken();

        TodoTask mockTask = new TodoTask("Test Task", "HIGH", LocalDateTime.now());
        List<TodoTask> mockList = List.of(mockTask);

        when(todoService.getTasks(null, null, null, 1)).thenReturn(mockList);
        when(todoService.paginateResponse(mockList, 1)).thenReturn(mockList);

        mockMvc.perform(get("/todos?page=1")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(header().string("tasks-count", "1"))
                .andExpect(jsonPath("$[0].name").value("Test Task"))
                .andExpect(jsonPath("$[0].priority").value("HIGH"));
    }

    @Test
    void createTodoTask() throws Exception {
        String token = getToken();

        TodoTask newTask = new TodoTask("Test Task", "high",  LocalDateTime.now().plusDays(20));

        mockMvc.perform(post("/todos")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newTask)))
                .andExpect(status().isOk());
    }

    @Test
    void changeTodoTaskDoneStatus() throws Exception {
        String token = getToken();
        String taskId = "1";

        mockMvc.perform(put("/todos/{id}/doneStatus", taskId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void editTask() throws Exception {
        String token = getToken();
        String taskId = "1";
        TodoTask updatedTask = new TodoTask("Test Task", "HIGH", LocalDateTime.now());

        mockMvc.perform(put("/todos/{id}", taskId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk());
    }

    @Test
    void getMetrics() throws Exception {
        String token = getToken();

        mockMvc.perform(get("/todos/metrics")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void deleteTodoTask() throws Exception {
        String token = getToken();
        String taskId = "1";

        mockMvc.perform(delete("/todos/{id}", taskId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }
}