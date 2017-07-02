import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { NotificationsService } from 'angular2-notifications';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { forEach} from '@angular/router/src/utils/collection';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class ApiService {
  private server = 'localhost';

  public online: Observable<boolean>;
  public isonline: boolean;

  public projects: any[];
  public tasks: any[];
  public task: any;

  constructor(
    private http: Http,
    private notifications: NotificationsService) {
    this.projects = [];
    this.tasks = [];
    this.online = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.online.subscribe(status => this.isonline = status);
  }

  private resetData() {
    this.tasks.length = 0;
    this.projects.length = 0;
    this.getTasks();
    this.getProjects();
  }

  getProjects() {
    this.http.get(`http://${this.server}:3000/projects`)
      .map(response => response.json()).subscribe(
        (responseItems: any[]) => {
          responseItems.forEach((responseItem: any) => {
            responseItem.statusVal = 'active';
            this.projects.push(responseItem);
          });
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  postProject(name, description) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`http://${this.server}:3000/projects`, {name, description}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.projects.push(responseItem);
          this.notifications.success(`${responseItem.project.name} created`, 'Project has been created!');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  postProjectWithTasks(name, description, tasks) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`http://${this.server}:3000/projects`, {name, description, tasks}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  getTasksOfProject(id) {
    this.http.get(`http://${this.server}:3000/projects/tasks/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          responseItem.statusVal = 'active';
          this.projects.push(responseItem);
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  getProject(id) {
    this.http.get(`http://${this.server}:3000/projects/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          responseItem.statusVal = 'active';
          this.projects.push(responseItem);
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  deleteProject(id) {
    this.http.delete(`http://${this.server}:3000/projects/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.notifications.info('Project deleted', '');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  putProject(id, name, description, tasks) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.put(`http://${this.server}:3000/projects/${id}`, {name, description, tasks})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.notifications.info(`${responseItem.project.name} updated`, '');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  addTaskToProject(projectid, taskid) {
    this.http.post(`http://${this.server}:3000/projects/${projectid}/tasks/${taskid}`, {})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info(`${responseItem.project.name} updated`, 'The Task has been added to the Project.');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  removeTaskFromProject(projectid, taskid) {
    this.http.delete(`http://${this.server}:3000/projects/${projectid}'/tasks/${taskid}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info(`${responseItem.project.name} updated`, 'The Task has been removed from the Project.');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  getTasks() {
    this.http.get(`http://${this.server}:3000/tasks/`)
      .map(response => response.json()).subscribe(
        (responseItems: any[]) => {
          responseItems.forEach((responseItem: any) => {
            responseItem.statusVal = 'inactive';
            if (responseItem.interval.filter((inter) => inter.run).length > 0) {
              responseItem.statusVal = 'active';
            }
            this.tasks.push(responseItem);
          });
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  postTask(name, description, status) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`http://${this.server}:3000/tasks`, {name, description, status}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          responseItem.task.statusVal = 'inactive';
          this.tasks.push(responseItem.task);
          this.notifications.success(`${responseItem.task.name} created`, 'Task has been created!');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  getTask(id) {
    this.http.get(`http://${this.server}:3000/tasks/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          if (responseItem) {
            responseItem.statusVal = 'inactive';
            this.tasks.push(responseItem);
          }
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  deleteTask(id) {
    this.http.delete(`http://${this.server}:3000/tasks/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info('Deleted', 'Task has been deleted!');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  putTask(id, name, description, runPauseStop) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.put(`http://${this.server}:3000/tasks/${id}`, {name, description, runPauseStop}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.notifications.success(`${responseItem.task.name} updated`, '');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  startTask(id, changes) {
    this.http.put(`http://${this.server}:3000/tasks/start/${id}`, {changes})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          responseItem.task.statusVal = 'active';
          this.task = responseItem.task;
          this.notifications.info(`${responseItem.task.name} started`, 'The Task is now running.');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  pauseTask(id) {
    this.http.put(`http://${this.server}:3000/tasks/pause/${id}`, {})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          responseItem.task.statusVal = 'inactive';
          this.tasks.filter((task) => task._id === id).forEach((task: any, i) => {
            this.tasks[i] = responseItem.task;
          });
          this.notifications.info(`${responseItem.task.name} paused`, 'The Task is now paused.');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().message);
          }
        }
    );
  }

  private alertServerDown() {
    this.notifications.error('No Connection Error', 'The server does not seem to be running!');
  }

  private alertOther(message) {
    this.notifications.error('Error', message);
  }
}
