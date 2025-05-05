# Todo App Spark

A simple and efficient Todo List app built with **React.js**, **Vite**, **Tailwind CSS**, **Day.js**, and **Java Spring**.

## Features
- Add, edit, and delete tasks
- Mark tasks as completed
- View tasks sorted by date and priority
- Responsive design powered by Tailwind CSS
- Uses **Day.js** for date and time management

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Java Spring (Spring Boot)
- **Date Handling**: Day.js
- **Node**: Used for managing the project

## Getting Started

### Prerequisites

Ensure that you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Java](https://www.oracle.com/java/technologies/javase-downloads.html) (JDK 11 or higher)
- [Maven](https://maven.apache.org/) for Java backend
- [Vite](https://vitejs.dev/) for development server

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/juancaCeb/todo-app-spark.git
    cd todo-app
    cd todo-app-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

   This will run the frontend on [http://localhost:8080](http://localhost:8080).

### Backend Setup (Java Spring)

1. Navigate to the backend directory:
    ```bash
    cd todo-app
    cd todo-app-backend
    ```

2. Build and run the backend:
    ```bash
    mvn spring-boot:run or run the project using IntelliJ
    ```

   The backend will run on [http://localhost:9090](http://localhost:9090).

### Environment Variables

- Ensure your backend and frontend are configured to communicate by setting appropriate URLs for API calls in the frontend code.

## API Endpoints

- **GET** `/todos`  
- **POST** `/todos`  
- **PUT** `/todos/{id}/doneStatus`  
- **PUT** `/todos/{id}`  
- **GET** `/todos/metrics`  
- **DELETE** `/todos/{id}`
