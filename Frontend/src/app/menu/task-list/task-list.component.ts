import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:[TaskService],
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

  private tasks: any[];// = [];

  constructor(private taskService: TaskService) {
    this.tasks = taskService.tasks;
  }

  getTasks(){
    this.taskService.getTasks();
  }

  postNewTask(name: string) {
    this.taskService.postTask(name, 'empty', 2);
    //location.reload();
  }

  deleteTask(pos: number, id: string) {
    if (!id) { return; }
    this.taskService.deleteTask(id);
    this.tasks.splice(pos, 1);
  }

  ngOnInit() {
    this.getTasks();
  }

}
