import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ProjectDialogDetailsComponent } from '../project-dialog-details/project-dialog-details.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-project-element',
  templateUrl: './project-element.component.html',
  styleUrls: ['./project-element.component.scss']
})

export class ProjectElementComponent implements OnInit {
  @Input() project: any;
  @Input() tasks: any[];

  addTasks = false;

  private taskId: string;

  constructor(
    private apiService: ApiService,
    private dialog: MdDialog
  ) {}

  addTask() {
    this.apiService.addTaskToProject(this.project._id, this.taskId);
  }

  deleteProject() {
    this.apiService.deleteProject(this.project._id);
  }

  openDetails() {
    const dialogRef = this.dialog.open(ProjectDialogDetailsComponent);
    const instance = dialogRef.componentInstance;
    instance.project = this.project;
  }

  ngOnInit() {
  }
}
