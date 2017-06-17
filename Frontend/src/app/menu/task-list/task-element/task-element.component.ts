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

  constructor(private taskService: TaskService,public dialog: MdDialog) {}
  ngOnInit() {
    this.totaltime = Date.now() - Date.now();
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
      }
    } );
    this.totaltime = Math.round(this.totaltime / 100) * 100;
    this.running = this.isRunning();
    this.startbtn = !this.running;
    this.pausebtn = this.running;
  }

  start() {
    this.taskService.startTask(this.task._id, 'something');
    this.starttime = Date.now();
  }

  pause() {
    this.taskService.pauseTask(this.task._id);
    this.endtime = Date.now();
    this.totaltime += this.endtime - this.starttime;
    this.totaltime = Math.round(this.totaltime / 100) * 100;
  }

  stop() {
    this.taskService.stopTask(this.task._id);
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
    console.log('dialogRef',dialogRef);
  }

}
