import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-project-element',
  templateUrl: './project-element.component.html',
  styleUrls: ['./project-element.component.scss']
})

export class ProjectElementComponent implements OnInit {
  @Input() project: any;
  @Input() tasks: any[];

  showTasks = false;
  addTasks = false;

  private taskId: string;

  constructor(private taskService: TaskService) {
  }

  addTask() {
    this.taskService.addTaskToProject(this.project._id, this.taskId);
  }

  ngOnInit() {
  }
}
