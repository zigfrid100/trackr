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

  constructor(
    private http: Http,
    private notifications: NotificationsService
  ) {
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

  public getProjects() {
    this.projects = [];

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
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public postProject(name, description) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`http://${this.server}:3000/projects`, {name, description}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.projects.push(responseItem);
          this.notifications.success(`${responseItem.project.name} created`, 'Your project has been created!');
          this.resetData();
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public postProjectWithTasks(name, description, tasks) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`http://${this.server}:3000/projects`, {name, description, tasks}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public getTasksOfProject(id): Observable<any[]> {
    return this.http.get(`http://${this.server}:3000/projects/${id}/tasks`)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getProject(id) {
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
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public deleteProject(id) {
    this.http.delete(`http://${this.server}:3000/projects/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info('Project deleted', 'Your project has been deleted');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public putProject(id, name, description, tasks) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.put(`http://${this.server}:3000/projects/${id}`, {name, description, tasks})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.notifications.info(`${responseItem.project.name} updated`, 'Your project has been updated');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public addTaskToProject(projectid, taskid) {
    this.http.post(`http://${this.server}:3000/projects/${projectid}/tasks/${taskid}`, {})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info(`${responseItem.project.name} updated`, 'The task has been added to the project.');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public removeTaskFromProject(projectid, taskid) {
    this.http.delete(`http://${this.server}:3000/projects/${projectid}/tasks/${taskid}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info(`${responseItem.project.name} updated`, 'The task has been removed from the project.');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public getTasks() {
    this.tasks = [];

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
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public getTasksAsync(): Observable<any[]> {
    return this.http.get(`http://${this.server}:3000/tasks/`)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public postTask(name, description, status) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post(`http://${this.server}:3000/tasks`, {name, description, status}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          responseItem.task.statusVal = 'inactive';
          this.tasks.push(responseItem.task);
          this.notifications.success(`${responseItem.task.name} created`, 'Your task has been created!');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public getTask(id): Observable<any> {
    return this.http.get(`http://${this.server}:3000/tasks/${id}`)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getProjectsForTask(id): Observable<any> {
    return this.http.get(`http://${this.server}:3000/tasks/${id}/projects`)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteTask(id) {
    this.http.delete(`http://${this.server}:3000/tasks/${id}`)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.resetData();
          this.notifications.info('Deleted', 'Your task has been deleted!');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public putTask(id, name, description, runPauseStop) {
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.put(`http://${this.server}:3000/tasks/${id}`, {name, description, runPauseStop}, headers)
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.notifications.success(`${responseItem.task.name} updated`, 'Your task has been updated');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public startTask(id, changes) {
    this.http.put(`http://${this.server}:3000/tasks/${id}/start`, {changes})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.tasks.find( ( taskf ) => taskf._id === id).interval = responseItem.task.interval;
          this.tasks.find( ( taskf ) => taskf._id === id).run = responseItem.task.run;
          this.notifications.info(`${responseItem.task.name} started`, 'Your task is now running');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  public pauseTask(id) {
    this.http.put(`http://${this.server}:3000/tasks/${id}/pause`, {})
      .map(response => response.json()).subscribe(
        (responseItem: any) => {
              this.tasks.find( ( taskf ) => taskf._id === id).interval = responseItem.task.interval;
              this.tasks.find( ( taskf ) => taskf._id === id).run = responseItem.task.run;
          this.notifications.info(`${responseItem.task.name} paused`, 'Your task is now paused');
        },
        (err: any) => {
          if (err.status === 0) {
            this.alertServerDown();
          } else {
            this.alertOther(err.json().error);
          }
        }
    );
  }

  private alertServerDown() {
    this.notifications.error('Connection Error', 'The server does not seem to be running!');
  }

  private alertOther(message) {
    this.notifications.error('Error', message);
  }
}
