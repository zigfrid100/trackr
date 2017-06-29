import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import {  trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers:[TaskService],
  animations: [
    trigger('taskState', [
      state('inactive', style({
        backgroundColor: '#cfd8dc',
        width: '300px',
        height: '200px',
        margin: '30px 30px 30px 30px',
        transform: 'scale(1.0)',
      })),
      state('active',   style({
        backgroundColor: '#FF650F',
        width: '300px',
        height: '200px',
        margin: '30px 30px 30px 30px',
        transform: 'scale(1.2)',
      })),
      state('void',style({
        transform: 'scale(1)',
        display: 'none'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out')),
    ])
  ]
})
export class TaskListComponent implements OnInit {

  //public tasks: any[];// = [];

  constructor(private taskService: TaskService) {
    //this.tasks = taskService.tasks;

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
    this.taskService.deleteTask(id,pos);
    //this.tasks.splice(pos, 1);
  }

  ngOnInit() {
    this.getTasks();
    console.log(this.taskService.tasks[0]);
  }

}
