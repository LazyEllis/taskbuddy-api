# TaskBuddy API Documentation

This document provides details on the endpoints and usage of the TaskBuddy API.

## Table of Contents

1. [Authentication](#authentication)
2. [Projects](#projects)
3. [Tasks](#tasks)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the JWT token in the Authorization header of your requests:

```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### Register a new user

- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth required**: No
- **Request body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "User registered successfully",
      "userId": "number"
    }
    ```

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Request body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "token": "string"
    }
    ```

## Projects

### Endpoints

#### Get all projects

- **URL**: `/projects`
- **Method**: `GET`
- **Auth required**: Yes
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "tasks": [
          {
            "id": "number",
            "name": "string",
            "description": "string",
            "dueDate": "string",
            "priority": "string",
            "completed": "boolean"
          }
        ]
      }
    ]
    ```

#### Create a new project

- **URL**: `/projects`
- **Method**: `POST`
- **Auth required**: Yes
- **Request body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "userId": "number"
    }
    ```

#### Update a project

- **URL**: `/projects/:projectId`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**: `projectId=[integer]`
- **Request body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "userId": "number"
    }
    ```

#### Delete a project

- **URL**: `/projects/:projectId`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**: `projectId=[integer]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Project deleted"
    }
    ```

## Tasks

### Endpoints

#### Get all tasks for a project

- **URL**: `/projects/:projectId/tasks`
- **Method**: `GET`
- **Auth required**: Yes
- **URL Parameters**: `projectId=[integer]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "description": "string",
        "dueDate": "string",
        "priority": "string",
        "completed": "boolean",
        "projectId": "number"
      }
    ]
    ```

#### Create a new task

- **URL**: `/projects/:projectId/tasks`
- **Method**: `POST`
- **Auth required**: Yes
- **URL Parameters**: `projectId=[integer]`
- **Request body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "dueDate": "string",
    "priority": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "dueDate": "string",
      "priority": "string",
      "completed": "boolean",
      "projectId": "number"
    }
    ```

#### Update a task

- **URL**: `/projects/:projectId/tasks/:taskId`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**:
  - `projectId=[integer]`
  - `taskId=[integer]`
- **Request body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "dueDate": "string",
    "priority": "string"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "dueDate": "string",
      "priority": "string",
      "completed": "boolean",
      "projectId": "number"
    }
    ```

#### Delete a task

- **URL**: `/projects/:projectId/tasks/:taskId`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**:
  - `projectId=[integer]`
  - `taskId=[integer]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Task deleted"
    }
    ```

#### Set a task as complete

- **URL**: `/projects/:projectId/tasks/:taskId/complete`
- **Method**: `PUT`
- **Auth required**: Yes
- **URL Parameters**:
  - `projectId=[integer]`
  - `taskId=[integer]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "dueDate": "string",
      "priority": "string",
      "completed": true,
      "projectId": "number"
    }
    ```

#### Set a task as incomplete

- **URL**: `/projects/:projectId/tasks/:taskId/complete`
- **Method**: `DELETE`
- **Auth required**: Yes
- **URL Parameters**:
  - `projectId=[integer]`
  - `taskId=[integer]`
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "description": "string",
      "dueDate": "string",
      "priority": "string",
      "completed": false,
      "projectId": "number"
    }
    ```

## Error Responses

All endpoints can return the following error responses:

- **Unauthorized Error**:

  - **Code**: 401
  - **Content**: `{ "error": "Unauthorized" }`

- **Forbidden Error**:

  - **Code**: 403
  - **Content**: `{ "error": "Forbidden" }`

- **Not Found Error**:

  - **Code**: 404
  - **Content**: `{ "error": "Resource not found" }`

- **Internal Server Error**:
  - **Code**: 500
  - **Content**: `{ "error": "Internal server error" }`

For specific validation errors, the API will return a 400 Bad Request status with details about the validation failure.
