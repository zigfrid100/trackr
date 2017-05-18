## Trackr

# Mongoose Schema
__________________________

Schema Projekt

    name: String
    p_description: String
    …
    tasks: [Task]


Schema Task

    Taskname: String
    t_description: String
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


