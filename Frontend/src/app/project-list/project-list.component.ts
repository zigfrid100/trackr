import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [TaskService]
})

export class ProjectListComponent implements OnInit {
  constructor(private taskService: TaskService) {
  }

  getTasks() {
    this.taskService.getTasks();
  }

  getProjects() {
    this.taskService.getProjects();
  }

  postNewProject(name: string) {
    this.taskService.postProject(name, '');
    this.getProjects();
    this.getTasks();
  }

  ngOnInit() {
    this.getProjects();
    this.getTasks();
  }
}
