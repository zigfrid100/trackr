import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [ApiService]
})

export class TaskListComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  getTasks() {
    this.apiService.getTasks();
  }

  postNewTask(name: string) {
    this.apiService.postTask(name, '', 2);
  }

  getProjects() {
    this.apiService.getProjects();
  }

  ngOnInit() {
    this.getProjects();
    this.getTasks();
  }
}
