# TaskBuddy API

This is a RESTful API for a task management application. It allows users to create accounts, manage projects, and track tasks within those projects.

## Features

- User authentication (register and login)
- Project management (CRUD operations)
- Task management within projects (CRUD operations)
- JWT-based authentication
- PostgreSQL database with Prisma ORM

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/taskbuddy-api.git
   cd taskbuddy-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
   JWT_SECRET="your_jwt_secret"
   PORT=3000
   ```

4. Set up the database:
   ```
   npx prisma migrate dev
   ```

## Usage

1. Start the server:

   ```
   npm start
   ```

2. The API will be available at `http://localhost:3000` (or the port you specified in the .env file)

## API Documentation

For detailed information about the API endpoints and usage, please see our [API Documentation](docs/api-documentation.md).

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login and receive a JWT

### Projects

- `GET /projects`: Get all projects for the authenticated user
- `POST /projects`: Create a new project
- `PUT /projects/:projectId`: Update a project
- `DELETE /projects/:projectId`: Delete a project

### Tasks

- `GET /projects/:projectId/tasks`: Get all tasks for a project
- `POST /projects/:projectId/tasks`: Create a new task in a project
- `PUT /projects/:projectId/tasks/:taskId`: Update a task
- `DELETE /projects/:projectId/tasks/:taskId`: Delete a task
- `PUT /projects/:projectId/tasks/:taskId/complete`: Mark a task as complete
- `DELETE /projects/:projectId/tasks/:taskId/complete`: Mark a task as incomplete

## Testing

To run the test suite:

```
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [JSON Web Tokens](https://jwt.io/)
