import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  getProjects() {
    this.taskService.getProjects();
  }

  postProject(name, description) {
    this.taskService.postProject(name, description);
  }

  deleteProject(id) {
    this.taskService.deleteProject(id);
  }

  addTask(pid, tid) {
    this.taskService.addTaskToProject(pid, tid);
  }

  getTasks() {
    this.taskService.getTasks();
  }

  postTask(name, desc, status) {
    this.taskService.postTask(name, desc, status);
  }

  getTask(id) {
    this.taskService.getTask(id);
  }

  deleteTask(id) {
    this.taskService.deleteTask(id);
  }

  putTask(id) {
    this.taskService.putTask(id, 'puttest', 'testing', 0);
  }

  startTask(id) {
   // this.taskService.startTask(id);
  }

  pauseTask(id) {
    this.taskService.pauseTask(id);
  }

  stopTask(id) {
    this.taskService.stopTask(id);
  }


}
