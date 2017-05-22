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
    status: boolean        //true if ongoing, false if finished
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

jenkins läuft nun auf 185.47.61.184:8081

sobald ich mit dem einrichten fertig bin bekommt ihr die user accounts von mir.


