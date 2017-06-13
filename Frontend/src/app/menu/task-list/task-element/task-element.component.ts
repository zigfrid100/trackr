import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../task.service';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() task: any;
  show: boolean = false;
  startbtn: boolean = true;
  pausebtn: boolean = false;
  starttime: any;
  endtime: any;
  constructor(private taskService: TaskService) {}
  ngOnInit() {
  }

  start() {
    this.taskService.startTask(this.task._id, 'something');
    this.starttime = Date.now();
    this.endtime = Date.now();
  }

  pause() {
    this.taskService.pauseTask(this.task._id);
    this.endtime = Date.now();
  }

  stop() {
    this.taskService.stopTask(this.task._id);
  }

}
