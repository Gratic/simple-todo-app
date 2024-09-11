# TODO REST API

This API provides endpoints for managing tasks in a TODO application. It allows you to create, read, update, and delete tasks.

## Installing and Starting Dev environment

1. Install dependencies: `npm run build`
2. Start the server: `npm run dev`
3. The API will be available at `http://localhost:3000/v1/tasks`

## Testing

To run the test suite:
1. Install dependencies: `npm ci`
2. Run tests: `npm test`

A coverage report made by Jest it available in the coverage folder.

## Building Docker image

1. Build the image with: `docker build -t todo_app_api .`
2. Run the container with: `docker run -d -p <server listening port>:3000 todo_app_api`
3. Access: `http://localhost:<server listening port>/v1/tasks`
    - The json will be empty before inserting tasks.
    - This is not using a database, all data will be lost when container is down.

## Endpoints

### GET /v1/tasks

Retrieves all tasks.

**Response**

- Status Code: 200 OK
- Content-Type: application/json
- Body: Array of task objects

```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string"
  }
]
```

### GET /v1/tasks/:id

Retrieves a specific task by ID.

**Parameters**

- `id` (string, required): The unique identifier of the task.

**Response**

- Status Code: 200 OK
- Content-Type: application/json
- Body: Task object

```json
{
  "id": "string",
  "title": "string",
  "content": "string"
}
```

If the task is not found:
- Status Code: 404 Not Found
- Body: Error message

### POST /v1/tasks

Creates a new task.

**Request**

- Content-Type: application/json
- Body:

```json
{
  "title": "string",
  "content": "string"
}
```

**Response**

- Status Code: 201 Created
- Content-Type: application/json
- Body: Created task object

```json
{
  "id": "string",
  "title": "string",
  "content": "string"
}
```

### PUT /v1/tasks/:id

Updates an existing task.

**Parameters**

- `id` (string, required): The unique identifier of the task to update.

**Request**

- Content-Type: application/json
- Body:

```json
{
  "title": "string",
  "content": "string"
}
```

**Response**

- Status Code: 200 OK
- Content-Type: application/json
- Body: Updated task object

```json
{
  "id": "string",
  "title": "string",
  "content": "string"
}
```

If the task is not found:
- Status Code: 404 Not Found
- Body: Error message

### DELETE /v1/tasks/:id

Deletes a specific task.

**Parameters**

- `id` (string, required): The unique identifier of the task to delete.

**Response**

- Status Code: 204 No Content

If the task is not found:
- Status Code: 404 Not Found
- Body: Error message

## Error Handling

The API returns appropriate HTTP status codes and error messages for invalid requests:

- 400 Bad Request: For invalid input (e.g., non-string title or content)
- 404 Not Found: When a requested task doesn't exist
- 500 Internal Server Error: For unexpected server errors

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Jest (Testing framework)
- Supertest (API testing)
- UUID

For more information on the project structure and configuration, please refer to the source code and configuration files in the repository.