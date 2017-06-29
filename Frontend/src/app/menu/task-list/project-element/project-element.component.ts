import {Component, Input, OnInit} from '@angular/core';
import { trigger, state, style } from '@angular/animations';
import {TaskService} from "../../../task.service";

@Component({
  selector: 'app-project-element',
  templateUrl: './project-element.component.html',
  styleUrls: ['./project-element.component.css'],
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
export class ProjectElementComponent implements OnInit {
  @Input() project: any;
  @Input() tasks: any[];// = [];

  showTasks: boolean = false;4
  addTasks: boolean = false;

  private taskId: string;


  constructor(private taskService: TaskService) {
  }

  addTask() {
    this.taskService.addTaskToProject(this.project._id, this.taskId)
  }

  ngOnInit() {
  }

}
