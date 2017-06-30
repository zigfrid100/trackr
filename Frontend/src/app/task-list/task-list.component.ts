import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService]
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

  ngOnInit() {
    this.getTasks();
  }
}
