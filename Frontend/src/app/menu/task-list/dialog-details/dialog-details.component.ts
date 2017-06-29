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
  inter_index: any;
  selectedInterval: any;
  intervalTime: any;
  public line_ChartData = [['Date', 'Time']];
  public line_ChartOptions = {
    legend: 'none',
    title: 'Task Statistics',
  };

  constructor(
    public dialogRef: MdDialogRef<DialogDetailsComponent>,
    public taskService: TaskService,
  ) {}

  ngOnInit() {
    this.inter_index = 0;
    this.dialogRef.updateSize('80%', '80%');
  this.time = 0;
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.line_ChartData.push([new Date(inter.startDate), this.time]);
        this.time += ((Date.parse(inter.stopDate) - Date.parse(inter.startDate)) / 1000) / 60;
        this.line_ChartData.push([new Date(inter.stopDate), this.time]);
      }
    } );
  }
  save () {
    this.taskService.putTask(this.task._id, this.task.name, this.task.description, this.task.runPauseStop);
  }
  updateTime () {
    this.inter_index = 0;
      this.intervalTime = Date.now() - Date.now();
      this.intervalTime = Date.parse(this.selectedInterval.split(' bis ')[1]) - Date.parse(this.selectedInterval.split(' bis ')[0]);
      this.intervalTime = Math.round(this.intervalTime / 100) * 100;
      let i = 0;
      let selected = false;
      do {
        if (this.task.interval[i].startDate === this.selectedInterval.split(' bis ')[0]) {
          selected = true;
          this.inter_index = i;
        }
        i++;
      }while (!selected);

  }
}
