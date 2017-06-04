## Trackr

# Mongoose Schema
__________________________

Schema User

    firstName: String
    lastName: String
    email: String
    password: String
    

Schema Projekt

    name: String
    description: String
    …
    tasks: [Task]


Schema Task

    name: String
    description: String
    status: Number        //0 if done, 1 if ongoing, 2 if open
    status: Number        //0 if done, 1 if ongoing, 2 if open
    interval: [Interval]
 

Schema Interval

    changes: string
    start: Date
    end: Date


# Funktionen des Backends
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

# Jenkins CI
____________

51.254.103.142:8080

user    |   KD7!nd_J89ds


## trackr api

# project api

51.254.103.142:3000/project 
___________________________

GET	    - gets all projects
POST	- post json object	required: 	name && description
			                optional:	tasks
	
usage:	{"name": "some name", "description": "some description", "tasks": ["task_object_id", "another one"]}

51.254.103.142:3000/project/gettasks/:id
________________________________________

GET	- gets all tasks of a specific project by :id

51.254.103.142:3000/project/:id
_______________________________

GET	    - gets a project by :id
DELETE	- deletes a project by :id
PUT	    - updates a project by :id (see example above)

usage:	{"name": "updated name", "description": "updated description", "tasks": ["new_task_object_id", "another one"]}

51.254.103.142:3000/project/:id/:taskid
_______________________________________

GET	    - adds a new task(:taskid) to a project(:id)
DELETE	- removes a task(:taskid) from a project(:id)

# task api

51.254.103.142:3000/task 
________________________

GET	    - gets all tasks
POST	- post json object	required: 	name && description && status
				            optional:	intervals
	
usage:	{"name": "some name", "description": "some description", "status": 0, "interval": ["interval_object_id", "another one"]}

51.254.103.142:3000/task/:id
____________________________

GET	    - gets a task by :id
DELETE	- deletes a task by :id
PUT	    - updates a task by :id (see example above)

51.254.103.142:3000/task/[OPTION]/:id
_____________________________________

OPTIONS:	start	- starts timetracking for a task(:id)
		    pause	- pauses timetracking for a task(:id)
		    stop	- stops timetracking for a task(:id)



