# Trackr

A simple timetracking app.

## Features

- Timetracking of tasks
- Assign tasks to projects
- View statistics for tasks and projects
- View overall statistics for all of your tasks

## Requirements

- npm
- nodejs
- mongodb

## Setup

### Backend

1. Run `npm install` in the `Backend` directory
2. Update the `default.json` in `/Backend/config` file with your database details
3. Run `npm start` in the `/Backend` directory to start the server

### Frontend

1. Run `npm install` in the `Frontend` directory
2. Run `ng serve` in the `Frontend` directory to serve the app
3. Browse to `http://localhost:4200`

## Tests

Run `npm run test` from the `/Backend` directory.

## API-Endpoints

### /projects

| Method | Route           | Params                    | Description                                                                            |
|--------|-----------------|---------------------------|----------------------------------------------------------------------------------------|
| GET    | /projects        |                           | Returns a list of all projects                                                        |
| GET    | /projects/:id    |                           | Returns a particular project                                                          |
| DELETE | /projects/:id    |                           | Deletes an existing project                                                           |
| POST   | /projects        | { name: STRING, description: STRING } | Adds a new project                                                        |
| PUT    | /projects/:id    | { name: STRING, description: STRING } | Updates an existing project                                               |
| PUT    | /projects/:id/tasks |                          | Returns all tasks for a particular project                                          |
| DELETE | /projects/:id/tasks/:taskid |                  | Removes a task from a project                                                       |
| POST   | /projects/:id/tasks/:taskid |                  | Adds a task to a project                                                            |

### /tasks

| Method | Route           | Params                    | Description                                                                            |
|--------|-----------------|---------------------------|----------------------------------------------------------------------------------------|
| GET    | /tasks        |                           | Returns a list of all tasks                                                        |
| GET    | /tasks/:id    |                           | Returns a particular task                                                          |
| GET    | /tasks/:id/projects    |                           | Returns all projects for a task                                           |
| DELETE | /tasks/:id    |                           | Deletes an existing task                                                           |
| POST   | /tasks        | { name: STRING, description: STRING } | Adds a new task                                                        |
| PUT    | /tasks/:id    | { name: STRING, description: STRING } | Updates an existing task                                               |
| PUT    | /tasks/:id/pause |                          | Pauses a task                                         |
| PUT    | /tasks/:id/start |                  | Starts a task                                                       |


## MongoDB Schemas
__________________________

### User

    firstName: String
    lastName: String
    email: String
    password: String,
    right: Number // 0 if default user, 1 if master user
    
### Project

    name: String
    description: String
    tasks: [Task]

### Task

    name: String
    description: String
    runPauseStop: Number // 0 if running, 1 if paused, 2 if stopped
    interval: [Interval]
    project: Project
    total: Number
 
### Interval

    changes: String
    start: Datetime
    end: Datetime

## Jenkins CI
____________

51.254.103.142:8080

Login: `user`
Password: `KD7!nd_J89ds`
