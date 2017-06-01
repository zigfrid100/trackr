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
    p_description: String
    …
    tasks: [Task]


Schema Task

    Taskname: String
    t_description: String
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



