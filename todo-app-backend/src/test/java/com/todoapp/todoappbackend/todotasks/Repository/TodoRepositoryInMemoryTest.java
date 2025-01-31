package com.todoapp.todoappbackend.todotasks.Repository;

import com.todoapp.todoappbackend.todotasks.Entities.TodoTask;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TodoRepositoryInMemoryTest {
    @Autowired
    private TodoRepositoryInMemory testRepository;
    @Autowired
    private TodoRepository todoRepository;

    @Test
    void checkIfTodoCreates() {

        //given
        TodoTask todo = new TodoTask("TareaUni","High", null);
        testRepository.createTodo(todo);

        //when
        TodoTask exists = testRepository.searchTodoTaskById(todo.getId());

        //then
        assertEquals(todo, exists);

    }

    @Test
    void getAllTodos() {

        //given
        TodoTask taskTwo = new TodoTask("TaskTwo","High", null);
        TodoTask taskOne = new TodoTask("TaskOne","Low", null);
        TodoTask taskThree = new TodoTask("TaskThree","Medium", null);

        //when

        testRepository.createTodo(taskOne);
        testRepository.createTodo(taskTwo);
        testRepository.createTodo(taskThree);

        //then
        assertEquals(taskOne.getName(), testRepository.searchTodoTaskById(taskOne.getId()).getName() );
        assertEquals(taskTwo.getName(), testRepository.searchTodoTaskById(taskTwo.getId()).getName() );
        assertEquals(taskThree.getName(), testRepository.searchTodoTaskById(taskThree.getId()).getName() );
    }

    @Test
    void searchTodoTaskById() {

        //given
        TodoTask taskOne = new TodoTask("TaskOne","Low", null);
        testRepository.createTodo(taskOne);

        //when
        TodoTask returnedTodo = testRepository.searchTodoTaskById(taskOne.getId());

        //then
        assertEquals(taskOne.getId(), testRepository.searchTodoTaskById(taskOne.getId()).getId() );

    }

    @Test
    void deleteTodoTask() {

        //given
        TodoTask taskTwo = new TodoTask("TaskTwo","High", null);
        TodoTask taskOne = new TodoTask("TaskOne","Low", null);
        TodoTask taskThree = new TodoTask("TaskThree","Medium", null);
        testRepository.createTodo(taskOne);
        testRepository.createTodo(taskTwo);
        testRepository.createTodo(taskThree);

        //when
        testRepository.deleteTodoTask(taskTwo.getId());

        //then
        assertNull(testRepository.searchTodoTaskById(taskTwo.getId()));

    }
}