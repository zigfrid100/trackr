import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { ApiService } from '../../api.service';
import { TaskListComponent } from '../task-list.component';
import { DurationPipe } from '../../duration.pipe';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss'],
  providers: [ ApiService, TaskListComponent ]
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
    public apiService: ApiService,
  ) {}

  ngOnInit() {
    this.inter_index = 0;
    this.dialogRef.updateSize('80%', '80%');

    let time: any = 0;

    this.task.interval.filter((interval) => interval.stopDate).forEach((inter) => {
      this.line_ChartData.push([new Date(inter.startDate), time]);
      time += ((Date.parse(inter.stopDate) - Date.parse(inter.startDate)) / 1000) / 60;
      this.line_ChartData.push([new Date(inter.stopDate), time]);
    });
  }

  save() {
    this.apiService.putTask(this.task._id, this.task.name, this.task.description, this.task.runPauseStop);
  }
}
