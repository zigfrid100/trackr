import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [ApiService]
})

export class ProjectListComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  getTasks() {
    this.apiService.getTasks();
  }

  getProjects() {
    this.apiService.getProjects();
  }

  postNewProject(name: string) {
    this.apiService.postProject(name, '');
  }

  filteredTasks(tasks, project_id) {
    return tasks.filter((task) => task.project !== project_id);
  }

  ngOnInit() {
    this.getProjects();
    this.getTasks();
  }
}
