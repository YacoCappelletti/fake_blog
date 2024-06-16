# Fake Blog

Fake Blog is a web application designed to simulate a full-featured blogging platform. It allows users to create accounts, write posts, comment on posts, like posts, and follow other users. The application is built with a modern tech stack, including React for the frontend and Spring Boot for the backend. Docker is used to containerize the services, and Docker Compose is used to orchestrate them.

## Project Structure

```plaintext
fake_blog_deploy/
│
├── fake_blog_backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── Dockerfile
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── wait-for-it.sh
│
├── fake_blog_frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── db_data/
│   └── db_export.sql
│
└── docker-compose.yaml
```

## Getting Started

Prerequisites

-   Docker
-   Docker Compose
-   Node.js
-   Java 17 or later
-   MySQL

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/YacoCappelletti/fake_blog.git
    cd fake_blog_deploy

    ```

2. Build and start the containers:

    ```bash
    docker-compose up --build
    ```

3. Access the application:

    - Frontend: http://localhost:3000
    - Backend API: http://localhost:8080

## Project Components

### Backend

The backend is built with Spring Boot and provides RESTful APIs for the blog functionalities. Key functionalities include user authentication, post creation, comment handling, and user interactions such as liking posts and following users.

-   `Dockerfile`: Defines the Docker image for the backend.
-   `pom.xml`: Maven configuration file.
-   `src/main/java/`: Contains the Java source code.
-   `src/main/resources/`: Contains the application configuration files.
-   `wait-for-it.sh`: Script to wait for the database to be ready before starting the backend service.

### Frontend

The frontend is built with React and uses Vite for bundling. The user interface includes pages for user registration, login, viewing and creating posts, commenting, and profile management.

-   `Dockerfile`: Defines the Docker image for the frontend.
-   `package.json`: Contains the project metadata and dependencies.
-   `src/`: Contains the React source code.
-   `vite.config.ts`: Configuration file for Vite.

### Database

The project uses MySQL as the database. The database schema includes tables for users, posts, comments, likes, and follows.

-   db_data/db_export.sql: Initial database schema and data.

### Docker Compose

`docker-compose.yaml` defines the multi-container application setup, including the services for the database, backend, and frontend.

# Usage

## Development

For development, you can run the backend and frontend separately.

### Backend

1. Navigate to the backend directory:

    ```bash
    cd fake_blog_backend
    ```

2. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd fake_blog_frontend
    ```
2. Install the dependencies and start the development server:
    ```bash
    npm install
    npm run dev
    ```

## Production

For production, use Docker Compose to build and run the entire application stack as described in the Installation section.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
