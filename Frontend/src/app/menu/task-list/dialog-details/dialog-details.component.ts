import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { TaskService } from '../../../task.service';
import { TaskListComponent } from '../task-list.component';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css'],
  providers: [ TaskService, TaskListComponent ]
})

export class DialogDetailsComponent implements OnInit {
  task: any;
  time: any;
  index: any;
  ifHaveInterval: boolean;

  public scatter_ChartData = [['Date', 'Time']];
  public scatter_ChartOptions = {
    legend: 'none',
    title: 'Task Statistics',
  };

  constructor(
    public dialogRef: MdDialogRef<DialogDetailsComponent>,
    public taskService: TaskService,
  ) {}

  ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.time = ((Date.parse(inter.stopDate) - Date.parse(inter.startDate))/1000)/60;
        this.scatter_ChartData.push([new Date(inter.startDate),this.time]);
        this.ifHaveInterval = true;
      }else{
        this.ifHaveInterval = false;
      }
    } );
  }

  deleteTask(id: string) {
    if (!id) { return; }
    this.taskService.deleteTask(id, this.index);
    this.task.statusVal = "void";
  }
}
