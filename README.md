# Trackr

## Backend

### Tests
__________________________

Run `npm run test` from the `/Backend` folder.

### Mongoose Schema
__________________________

Schema User

    firstName: String
    lastName: String
    email: String
    password: String,
    right: Number // 0 if default user, 1 if master user
    
    

Schema Projekt

    name: String
    description: String
    …
    tasks: [Task]


Schema Task

    name: String
    description: String
    runPauseStop: Number        //0 if run, 1 if pause, 2 if stop
    interval: [Interval]
 

Schema Interval

    changes: string
    start: Date
    end: Date


### Funktionen des Backends
___________________________
```bash
getTasks()
getTask(ID)
startTask()
pauseTask()
stopTask()
getProject(TaskID)

getProjects()
getProjekt(Name)
getTasksInProject(ProjektID)
addTaskToProjekt(TaskID)

getInterval():
```

#### User Functions
___________________________
```bash
// only master user functions
getUsers()
postUser() 
getUser(userID)
deleteUser(userID)
putUser(userID)

// open funcions
signupUser() // User want register itself
loginUser()

// authenticated user functions
getProfile()
deleteProfile()
putProfile()
logoutUser()
```

# Jenkins CI
____________

51.254.103.142:8080

user    |   KD7!nd_J89ds

# Project API

## 51.254.103.142:3000/projects 
___________________________
```bash
GET	    - gets all projects
POST	- post json object	required: 	name && description
			                optional:	tasks
	
usage:	{"name": "some name", "description": "some description", "tasks": ["task_object_id", "another one"]}
```
## 51.254.103.142:3000/projects/tasks/:id
________________________________________
```bash
GET	- gets all tasks of a specific project by :id
```
## 51.254.103.142:3000/projects/:id
_______________________________
```bash
GET	    - gets a project by :id
DELETE	- deletes a project by :id
PUT	    - updates a project by :id (see example above)

usage:	{"name": "updated name", "description": "updated description", "tasks": ["new_task_object_id", "another one"]}
```
## 51.254.103.142:3000/projects/:id/tasks/:taskid
_______________________________________
```bash
POST	    - adds a new task(:taskid) to a project(:id)
DELETE	- removes a task(:taskid) from a project(:id)
```
# Task API

## 51.254.103.142:3000/tasks 
________________________
```bash
GET	    - gets all tasks
POST	- post json object	required: 	name && description && status
				            optional:	intervals
	
usage:	{"name": "some name", "description": "some description", "status": 0, "interval": ["interval_object_id", "another one"]}
```
## 51.254.103.142:3000/tasks/:id
____________________________
```bash
GET	    - gets a task by :id
DELETE	- deletes a task by :id
PUT	    - updates a task by :id (see example above)
```
## 51.254.103.142:3000/tasks/[OPTION]/:id
_____________________________________
```bash
OPTIONS:	start	- starts timetracking for a task(:id), required changes
		    pause	- pauses timetracking for a task(:id), optional changes
		    stop	- stops timetracking for a task(:id), optional changes

All are PUT requests.
```

# User API

## 51.254.103.142:3000/users - master functions
________________________
```bash
GET	    - gets all users
POST	- post json object	required: 	firstname, lastname, right, email && password
	
usage:	{"firstname": "some name", "lastname": "some name", "right": 0 or 1, "email": "some email", "password": "some passord"}
```

## 51.254.103.142:3000/users/:id - master function
____________________________
```bash
GET	    - gets a user by :id
DELETE	- deletes a user by :id
PUT	    - updates a user by :id (see example above)
```

## 51.254.103.142:3000/users/signup - open function
________________________
```bash
POST	- post json object	required: 	firstname, lastname, right, email && password
	
usage:	{"firstname": "some name", "lastname": "some name", "right": 0, "email": "some email", "password": "some passord"}
```

## 51.254.103.142:3000/users/login - open function
________________________
```bash
POST	- post json object	required: email && password
	
usage:	{"email": "some email", "password": "some passord"}
```

## 51.254.103.142:3000/users/profile - authenticated user function
____________________________
```bash
GET	    - gets authenticated user
DELETE	- deletes authenticated user
PUT	    - updates authenticated user (see example signup above)
```

## 51.254.103.142:3000/users/logout - authenticated user function
____________________________
```bash
POST	- logout authenticated user,	required: none
```

