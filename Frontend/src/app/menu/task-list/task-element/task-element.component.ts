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
  running: boolean = false;

  @Input() task: any;
  @Input() index: any;
  totaltime: any;
  starttime: any;
  endtime: any;

  constructor(private taskService: TaskService, public dialog: MdDialog) {}

  ngOnInit() {
    this.totaltime = Date.now() - Date.now();
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
      }
    } );
    this.totaltime = Math.round(this.totaltime / 100) * 100;
    this.running = this.isRunning();
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
    return this.task.interval.filter(i => i.run).length > 0;
  }

  openDetails() {
    const dialogRef = this.dialog.open(DialogDetailsComponent);
    const instance = dialogRef.componentInstance;
    instance.task  = this.task;
    instance.index = this.index;
  }
}
