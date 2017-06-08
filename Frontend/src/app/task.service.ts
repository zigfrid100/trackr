import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {forEach} from '@angular/router/src/utils/collection';
import {errorHandler} from "@angular/platform-browser/src/browser";

@Injectable()
export class TaskService {
  public online: Observable<boolean>;
  public isonline: boolean;

  public projects: any[];

  constructor(private http: Http) {
    this.online = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.online.subscribe(status => this.isonline = status);
  }

  getProjects() {
    console.log('get Project');
    this.http.get('http://51.254.103.142:3000/projects')
      .map(response => response.json()).subscribe(
      (responseItems: any[]) => {
        responseItems.forEach((responseItem: any) => {
          responseItem.statusVal = 'active';
          this.projects.push(responseItem);

        });
      },
      (err: any) => {
        if(err.status == 0){
          alert('Server down')
        }else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  postProject(name, description) {
    console.log('post Project');
    const headers = new Headers({'Content-Type': 'application/json'});
    this.http.post('http://51.254.103.142:3000/projects', {name, description}, headers)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        console.log(responseItem);
      },
      (err: any) => {
        if(err.status == 0){
          alert('Server down')
        }else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  getProject(id) {
    console.log('get Project:id');
    this.http.get('http://51.254.103.142:3000/projects/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        responseItem.statusVal = 'active';
        this.projects.push(responseItem);
      },
      (err: any) => {
        if(err.status == 0){
          alert('Server down')
        }else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }

  getTasksOfProject(id) {
    console.log('get TasksOfProject:id');
    this.http.get('http://51.254.103.142:3000/projects/tasks/' + id)
      .map(response => response.json()).subscribe(
      (responseItem: any) => {
        responseItem.statusVal = 'active';
        this.projects.push(responseItem);
      },
      (err: any) => {
        if(err.status == 0){
          alert('Server down')
        }else {
          alert('Error: ' + err.json().message);
          console.log('Error: ' + err.json().message);
        }
      }
    );
  }





}
