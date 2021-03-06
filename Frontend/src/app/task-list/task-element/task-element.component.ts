import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { DialogDetailsComponent } from '../dialog-details/dialog-details.component';
import { MdDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.scss'],
  animations: [
    trigger('taskState', [
      state('inactive', style({
        transform: 'scale(1.0)'
      })),
      state('active', style({
        transform: 'scale(1.1)'
      })),
      state('void', style({
        transform: 'scale(1)',
        display: 'none'
      })),
      transition('inactive => active', animate(300)),
      transition('active => inactive', animate(300)),
    ])
  ]
})

export class TaskElementComponent implements OnInit {
  running = false;

  @Input() task: any;
  @Input() index: any;
  totaltime: any;
  starttime: any;
  endtime: any;

  constructor(
    private apiService: ApiService,
    private dialog: MdDialog,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.calculateTotalTime();
    this.running = this.isRunning();
    setTimeout(() => {
      if (this.task.interval.filter((interval) => interval.run).length > 0) {
        this.toActiveStatus();
        this.timer();
      }
    }, 100);
  }

  start() {
    this.toActiveStatus();
    this.apiService.startTask(this.task._id, ' ');
    this.running = this.isRunning();
    this.updateTask();
    this.timer();
    this.pauseOtherTasks();
  }

  pause() {
    this.toInactiveStatus();
    this.apiService.pauseTask(this.task._id);
    setTimeout(() => {
      this.updateTask();
      this.calculateTotalTime();
    }, 1000);
  }

  updateTask() {
    setTimeout(() => {
      this.apiService.getTask(this.task._id)
        .subscribe(
          task => this.task.interval = task.interval,
          err => this.notifications.error('Error', err.error)
        );
    }, 100);
  }

  timer() {

    setTimeout(() => {
      this.running = this.isRunning();
    if (this.running) {
        this.calculateTotalTime();
        this.timer();
    }else {
      this.toInactiveStatus();
    }}, 100);
  }

  isRunning() {
    return this.task.interval.filter(i => i.run).length > 0;
  }

  openDetails() {
    const dialogRef = this.dialog.open(DialogDetailsComponent);
    const instance = dialogRef.componentInstance;
    instance.task = this.task;
  }

  calculateTotalTime() {
    this.totaltime = Date.now() - Date.now();
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate) {
        this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
      } else {
        inter.stopDate = Date.now();
        this.totaltime += inter.stopDate - Date.parse(inter.startDate);
        inter.stopDate = null;
      }
    });
    this.totaltime = Math.round(this.totaltime / 100) * 100;
    this.task.totaltime = this.totaltime;
  }

  toActiveStatus() {
    this.running = true;
    this.task.statusVal = 'active';
  }

  toInactiveStatus() {
    this.running = false;
    this.task.statusVal = 'inactive';
  }

  pauseOtherTasks() {
    this.apiService.tasks.forEach((task: any) => {
      if (this.task._id !== task._id) {
        task.interval.filter((interval) => interval.run).forEach((inter: any) => {
          this.apiService.pauseTask(task._id);
        });
       }
    });
  }

  showTotaltimeTime() {
    const secs = Math.round(this.totaltime) / 1000;
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
      'h': hours,
      'm': minutes,
      's': seconds
    };

    return `${obj.h}:${obj.m}:${obj.s}`;
  }

  deleteTask() {
    this.apiService.deleteTask(this.task._id);
  }

  removeFromProject() {
    this.apiService.removeTaskFromProject(this.task.project, this.task._id);
  }
}
