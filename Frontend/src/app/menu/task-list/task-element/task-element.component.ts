import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../task.service';
import { DialogDetailsComponent } from '../dialog-details/dialog-details.component';
import { MdDialog } from '@angular/material';


@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {
  running: boolean = false;

  @Input() task: any;
  @Input() index: any;
  totaltime: any;
  starttime: any;
  endtime: any;
  pausebtn:any;

  constructor(private taskService: TaskService, public dialog: MdDialog) {}
  ngOnInit() {

    this.calculateTotalTime();
    this.running = this.isRunning();
  }

  start() {
    this.taskService.startTask(this.task._id, ' ');
    this.pausebtn = true;
    this.updateTask();
    this.timer();
    this.pauseOtherTasks();
  }

  updateTask () {
    setTimeout(() => {
      this.task.interval = this.taskService.task.interval;
      console.log('Task updated');
    }, 100);
  }

  timer() {
    if (this.pausebtn) {
      setTimeout(() => {
        this.calculateTotalTime();
        this.timer();
      }, 100);
    }
  }

  pause() {
    this.taskService.pauseTask(this.task._id);
    this.updateTask();
    setTimeout(() => {
      this.updateTask();
      this.calculateTotalTime();
    }, 1000);
  }

  stop() {
    this.taskService.stopTask(this.task._id);
  }

  isRunning() {
    return this.task.interval.filter(i => i.run).length > 0;
  }

  openDetails() {
    const dialogRef = this.dialog.open(DialogDetailsComponent);
    const instance = dialogRef.componentInstance;
    instance.task  = this.task;
    console.log('dialogRef', dialogRef);
  }

  calculateTotalTime() {
    this.totaltime = Date.now() - Date.now();
    this.task.interval.forEach((inter: any) => {
      if (inter.stopDate != null && inter.stopDate !== '') {
        this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
      }else {
        inter.stopDate = Date.now();
        this.totaltime += inter.stopDate - Date.parse(inter.startDate);
        inter.stopDate = null;
      }
    } );
    this.totaltime = Math.round(this.totaltime / 100) * 100;
    this.task.totaltime = this.totaltime;
  }
  toActiveStatus(){
    this.task.statusVal = "active";
  }
  toInactiveStatus(){
    this.task.statusVal = "inactive";
  }

  pauseOtherTasks(){
    this.taskService.tasks.forEach((task: any,i)=>{
     if(this.task._id === task._id){
      }else{
        task.interval.forEach((inter:any)=>{
          if(inter.run){
            this.taskService.pauseTask(task._id);
          }
        })
      }
    })
  }

  showTotaltimeTime(){
    let secs = Math.round(this.totaltime)/1000;
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj.h +" : " + obj.m +" : " + obj.s;
  }

}
