import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../task.service';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() task: any;
  constructor(private taskService: TaskService) {

  }

  show: boolean = false;
  startbtn: boolean = true;
  pausebtn: boolean = false;

  ngOnInit() {
  }

  start() {
    this.taskService.startTask(this.task._id, 'something');
  }

  pause() {
    this.taskService.pauseTask(this.task._id);
  }

  stop() {
    this.taskService.stopTask(this.task._id);
  }

}
