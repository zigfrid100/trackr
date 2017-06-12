import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  animations: [
    trigger('projectState', [
      state('inactive', style({
        transform: 'scale(0)',
        display: 'none'
      })),
      state('active',   style({
        transform: 'scale(1)'
      })),
    ])
  ]
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) {
    this.projects = taskService.projects;
  }

  private projects: any[] = [];

  getProjects(){
    this.taskService.getProjects();
  }

  ngOnInit() {
    this.getProjects();
  }

  test(){
    console.log("pushed test button");
  }
}
