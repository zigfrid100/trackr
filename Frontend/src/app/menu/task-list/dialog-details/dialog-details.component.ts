import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})
export class DialogDetailsComponent implements OnInit {

  task: any;
  time: any;

  constructor(public dialogRef: MdDialogRef<DialogDetailsComponent>) { }

  ngOnInit() {
    this.dialogRef.updateSize('80%', '80%');

    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.time = ((Date.parse(inter.stopDate) - Date.parse(inter.startDate))/1000)/60;
        this.scatter_ChartData.push([new Date(inter.startDate),this.time]);
      }
    } );
  }

  public scatter_ChartData = [['Date', 'Time']];
  public scatter_ChartOptions = {
    legend: 'none',
    title: 'Task Statistics',
  };

}
