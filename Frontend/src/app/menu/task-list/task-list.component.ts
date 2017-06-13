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

  taskService_:TaskService;

  constructor(private taskService: TaskService) {
    this.projects = taskService.projects;
  }

  private projects: any[] = [];
  public project : any;
  getProjects(){
    this.taskService.getProjects();
  }

  postNewProject(name:string){
    if (!name) { return; }
    this.project = this.taskService.postProject(name,"description");
    console.log(this.project);
  }

  deleteProject(pos:number,id:string){
    if (!id) { return; }
    this.taskService.deleteProject(id)
    this.projects.splice(pos,1);
  }

  ngOnInit() {
    this.getProjects();
  }

  test(){
    console.log("pushed test button");
  }
}
