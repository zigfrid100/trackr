import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ApiService } from '../../api.service';
import { ProjectListComponent } from '../project-list.component';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-project-dialog-details',
  templateUrl: './project-dialog-details.component.html',
  styleUrls: ['./project-dialog-details.component.scss'],
  providers: [ ApiService, ProjectListComponent ]
})

export class ProjectDialogDetailsComponent implements OnInit {
  project: any;
  tasks: any[] = [];

  constructor(
    private dialogRef: MdDialogRef<ProjectDialogDetailsComponent>,
    private apiService: ApiService,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');
    this.loadTasks();
  }

  removeTask(task_id) {
    this.apiService.removeTaskFromProject(this.project._id, task_id);
    setTimeout(() => {
      this.loadTasks();
    }, 100);
  }

  loadTasks() {
    this.apiService.getTasksOfProject(this.project._id)
      .subscribe(
        tasks => this.tasks = tasks,
        err => this.notifications.error('Error', err.error)
      );
  }

  save() {
    this.apiService.putProject(
      this.project._id,
      this.project.name,
      this.project.description,
      this.project.tasks
    );
  }
}
