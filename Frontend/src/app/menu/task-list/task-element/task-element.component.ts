import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../task.service';
import { DialogDetailsComponent } from '../dialog-details/dialog-details.component';
import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() task: any;
  startbtn: boolean = true;
  pausebtn: boolean = false;
  running: boolean = false;
  totaltime: any;
  starttime: any;
  endtime: any;

  constructor(private taskService: TaskService, public dialog: MdDialog) {}
  ngOnInit() {

    this.calculateTotalTime();
    this.running = this.isRunning();
    this.startbtn = !this.running;
    this.pausebtn = this.running;
  }

  start() {
    this.taskService.startTask(this.task._id, ' ');
    this.pausebtn = true;
    this.updateTask();
    this.timer();
  }

  updateTask () {
    setTimeout(() => {
      this.task = this.taskService.task;
      console.log('Task updated');
    }, 100);
  }

  timer() {
    if (this.pausebtn) {
      setTimeout(() => {
        this.calculateTotalTime();
        this.timer();
      }, 100);
    }
  }

  pause() {
    this.taskService.pauseTask(this.task._id);
    this.updateTask();
    setTimeout(() => {
      this.updateTask();
      this.calculateTotalTime();
    }, 1000);
  }

  removeFromProject() {
    this.taskService.removeTaskFromProject(this.task.project,this.task._id);
  }




  isRunning() {
    for (const i of this.task.interval) {
      if (i.run) {
        return true;
      }
    }

    return false;
  }

  openDetails() {
    let dialogRef = this.dialog.open(DialogDetailsComponent);
    let instance = dialogRef.componentInstance;
    instance.task  = this.task;
    console.log('dialogRef', dialogRef);
  }

  calculateTotalTime() {
    this.totaltime = Date.now() - Date.now();
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
      }else {
        inter.stopDate = Date.now();
        this.totaltime += inter.stopDate - Date.parse(inter.startDate);
        inter.stopDate = null;
      }
    } );
    this.totaltime = Math.round(this.totaltime / 100) * 100;
    this.task.totaltime = this.totaltime;
  }

  deleteTask() {
    this.taskService.deleteTask(this.task._id);
  }
}
