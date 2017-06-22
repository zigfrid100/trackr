import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {TaskService} from '../../../task.service';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})
export class DialogDetailsComponent implements OnInit {

  task: any;
  time: any;
  selectedInterval: any;
  intervalTime: any;
  public scatter_ChartData = [['Date', 'Time']];
  public scatter_ChartOptions = {
    legend: 'none',
    title: 'Task Statistics',
  };

  constructor(private taskService: TaskService, public dialogRef: MdDialogRef<DialogDetailsComponent>) { }

  ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');

    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.time = ((Date.parse(inter.stopDate) - Date.parse(inter.startDate)) / 1000) / 60;
        this.scatter_ChartData.push([new Date(inter.startDate), this.time]);
      }
    } );
  }
  saveName (name) {
    this.taskService.putTask(this.task._id, name, this.task.description, this.task.runPauseStop);
  }
  saveDescription (description) {
    this.taskService.putTask(this.task._id, this.task.name, description, this.task.runPauseStop);
  }
  save () {
    this.taskService.putTask(this.task._id, this.task.name, this.task.description, this.task.runPauseStop);
  }
  updateTime () {
      this.intervalTime = Date.now() - Date.now();
      this.intervalTime = Date.parse(this.selectedInterval.split(' bis ')[1]) - Date.parse(this.selectedInterval.split(' bis ')[0]);
      this.intervalTime = Math.round(this.intervalTime / 100) * 100;
  }


}
