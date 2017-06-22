import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers:[TaskService]
})
export class StatisticsComponent implements OnInit {

  public totaltime = 0;
  public pie_ChartData = [['Task', 'Hours per Day']];
  public pie_ChartOptions = {
    title: 'My Task Activities',
    width: 1200,
    height: 800,
    is3D: true,
  };

  constructor(private taskService: TaskService) {
  }

  getTasks(){
    this.taskService.getTasks();
    console.log(this.taskService.tasks);
  }

  ngOnInit() {
    this.getTasks();
    this.showChart();
  }

  showChart(){
    setTimeout(()=>{
      this.taskService.tasks.forEach((task : any) => {
        task.interval.forEach((inter: any) => {
          if (inter.stopDate != null && inter.stopDate !== '') {
            this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
          }
        });
        this.pie_ChartData.push([task.name,this.totaltime]);
        this.totaltime = 0;
      });
    },1);
  }

  showUsedTime(){
    let date = new Date(null, null, null, 0, 0, 1233);
    console.log("Minutes: ",date.getMinutes());
  }

}
