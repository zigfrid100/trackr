import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ProjectDialogDetailsComponent } from '../project-dialog-details/project-dialog-details.component';
import { MdDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-project-element',
  templateUrl: './project-element.component.html',
  styleUrls: ['./project-element.component.scss']
})

export class ProjectElementComponent implements OnInit {
  @Input() project: any;
  allTasks: any[];
  tasks: any[];
  availableTasks: any[];

  private taskId: string;

  constructor(
    private apiService: ApiService,
    private dialog: MdDialog,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  addTask() {
    this.apiService.addTaskToProject(this.project._id, this.taskId);
  }

  deleteProject() {
    this.apiService.deleteProject(this.project._id);
  }

  openDetails() {
    const dialogRef = this.dialog.open(ProjectDialogDetailsComponent, {
      data: { project: this.project, tasks: this.tasks }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getTasks();
    });
  }

  private getTasks() {
    this.apiService.getTasksAsync()
      .subscribe(
        tasks => {
          this.allTasks = tasks;
          this.tasks = tasks.filter((task) => task.project === this.project._id);
          this.availableTasks = tasks.filter((task) => task.project !== this.project._id);
        },
        err => this.notifications.error('Error', err)
      );
  }
}
