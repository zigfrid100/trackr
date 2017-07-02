import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ApiService } from '../../api.service';
import { ProjectListComponent } from '../project-list.component';
import { NotificationsService } from 'angular2-notifications';
import { DurationPipe } from '../../duration.pipe';

@Component({
  selector: 'app-project-dialog-details',
  templateUrl: './project-dialog-details.component.html',
  styleUrls: ['./project-dialog-details.component.scss'],
  providers: [ ApiService, ProjectListComponent ]
})

export class ProjectDialogDetailsComponent implements OnInit {
  project: any;
  tasks: any[] = [];
  public line_ChartData = [['Date', 'Time']];
  public line_ChartOptions = {
    legend: 'none',
    title: 'Project Statistics',
  };

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

  loadChart() {
    this.tasks.filter((task) => !task.run).forEach((task) => {
      task.interval.forEach((inter) => {
        let time: any = 0;
        this.line_ChartData.push([new Date(inter.startDate), time]);
        time += task.total / 60;
        this.line_ChartData.push([new Date(inter.stopDate), time]);
      });
    });
  }

  loadTasks() {
    this.apiService.getTasksOfProject(this.project._id)
      .subscribe(
        tasks => {
          this.tasks = tasks;
          this.loadChart();
        },
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

  totalTime() {
    let total = 0;

    this.tasks.forEach((task) => {
      total += task.total;
    });

    return total;
  }
}
