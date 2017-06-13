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
  running: boolean = false;
  totaltime: any;
  starttime: any;
  endtime: any;
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.totaltime = Date.now() - Date.now();
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
}
