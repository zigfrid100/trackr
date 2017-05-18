## Trackr

# Mongoose Schema
__________________________

Schema Projekt

	```bash

    name: String
    p_description: String
    …
    tasks: [Task]
    
    ```

Schema Task

	```bash

    Taskname: String
    t_description: String
    interval: [Interval]

  	```  

Schema Interval

	```bash

    start: Date
    end: Date

    ```

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

getInterval():
```


