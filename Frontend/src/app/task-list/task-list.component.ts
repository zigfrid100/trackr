import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
  animations: [
    trigger('projectState', [
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

export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) {
  }

  getTasks() {
    this.taskService.getTasks();
  }

  postNewTask(name: string) {
    this.taskService.postTask(name, 'empty', 2);
  }

  getProjects() {
    this.taskService.getProjects();
  }

  ngOnInit() {
    this.getProjects();
    this.getTasks();
  }
}
