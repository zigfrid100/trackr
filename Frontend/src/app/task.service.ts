import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {forEach} from '@angular/router/src/utils/collection';
import {errorHandler} from '@angular/platform-browser/src/browser';

@Injectable()
export class TaskService {
  private server = 'localhost';

  public online: Observable<boolean>;
  public isonline: boolean;

  public projects: any[];
  public tasks: any[];
  public task: any;

  constructor(private http: Http) {
    this.projects = [];
    this.tasks = [];
    this.online = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.online.subscribe(status => this.isonline = status);
  }

  getProjects() {
    console.log('get Project');
    this.http.get('http://' + this.server + ':3000/projects')
      .map(response => response.json()).subscribe(
      (responseItems: any[]) => {
        responseItems.forEach((responseItem: any) => {
          responseItem.statusVal = 'active';
          this.projects.push(responseItem);
          console.log(responseItem);
        });
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  postProject(name, description) {
    console.log('post Project');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://' + this.server + ':3000/projects', {name, description}, headers)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
        this.projects.push(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  postProjectWithTasks(name, description, tasks) {
    console.log('post Project');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://' + this.server + ':3000/projects', {name, description, tasks}, headers)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  getTasksOfProject(id) {
    console.log('get TasksOfProject:id');
    this.http.get('http://' + this.server + ':3000/projects/tasks/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        responseItem.statusVal = 'active';
        this.projects.push(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  getProject(id) {
    console.log('get Project:id');
    this.http.get('http://' + this.server + ':3000/projects/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        responseItem.statusVal = 'active';
        this.projects.push(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  deleteProject(id) {
    console.log('delete Jokes:id');
    this.http.delete('http://' + this.server + ':3000/projects/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem.message);
        alert(responseItem.message);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );

  }

  putProject(id, name, description, tasks) {
    console.log('put Project');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.put('http://' + this.server + ':3000/projects/' + id, {name, description, tasks})
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  addTaskToProject(projectid, taskid) {
    console.log('add task to project');
    this.http.post('http://' + this.server + ':3000/projects/' + projectid + '/tasks/' + taskid, {})
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  removeTaskFromProject(projectid, taskid) {
    console.log('remove task from project');
    this.http.delete('http://' + this.server + ':3000/projects/' + projectid + '/tasks/' + taskid)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  getTasks() {
    console.log('get Tasks');
    this.http.get('http://' + this.server + ':3000/tasks/')
      .map(response => response.json()).subscribe(
      (responseItems: any[]) => {
        console.log(responseItems);
        responseItems.forEach((responseItem: any) => {
          responseItem.statusVal = 'inactive';
          this.tasks.push(responseItem);
        });
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }


  postTask(name, description, status) {
    console.log('post Task');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://' + this.server + ':3000/tasks', {name, description, status}, headers)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        responseItem.task.statusVal = 'inactive';
        console.log(responseItem.task);
        this.tasks.push(responseItem.task);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  getTask(id) {
    console.log('get Task:id');
    this.http.get('http://' + this.server + ':3000/tasks/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        if (responseItem != null) {
          responseItem.statusVal = 'inactive';
          this.tasks.push(responseItem);
        }
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  deleteTask(id,index) {
    this.http.delete('http://'+this.server+':3000/tasks/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        this.tasks.splice(index,1);
        console.log(this.tasks);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().error);
        }
      }
    );
  }

  putTask(id, name, description, runPauseStop) {
    console.log('post Task');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.put('http://' + this.server + ':3000/tasks/' + id, {name, description, runPauseStop}, headers)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().error);
          console.log('Error: ' + err.json().error);
        }
      }
    );
  }

  startTask(id, changes) {
    console.log('start Task');
    this.http.put('http://' + this.server + ':3000/tasks/start/' + id, {changes})
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
        responseItem.task.statusVal = 'active';
        this.task = responseItem.task;
        this.tasks.forEach((task: any,i) => {
          if (task._id === id) {
            console.log('service');
            console.log(task);
            task = responseItem.task;
            console.log('service');
            console.log(task);
          }
        });
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().error);
          console.log('Error: ' + err.json().error);
        }
      }
    );
  }

  pauseTask(id) {
    console.log('pause Task');
    this.http.put('http://' + this.server + ':3000/tasks/pause/' + id, {})
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
        responseItem.task.statusVal = "inactive";
        //this.task = responseItem.task;
        this.tasks.forEach((task: any, i ) => {
          if (task._id === id) {
            this.tasks[i] = responseItem.task;
          }
        });
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      });
  }

  stopTask(id) {
    console.log('stop Task');
    this.http.put('http://' + this.server + ':3000/tasks/stop/' + id, {})
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if (err.status == 0) {
          alert('Server down');
        } else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }
}
