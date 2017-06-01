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

  constructor() {
    this.online = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false)
    );
    this.online.subscribe(status => this.isonline = status);
  }

}
