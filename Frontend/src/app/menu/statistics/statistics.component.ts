import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [TaskService]
})

export class StatisticsComponent implements OnInit {
  public totaltime = 0;
  public pie_ChartData = [['Task', 'Hours per Day']];
  public pie_ChartOptions = {
    title: 'My Task Activities (min.)',
    width: 1200,
    height: 800,
    is3D: true,
    fontSize: 21,
  };

  constructor(private taskService: TaskService) {
  }

  getTasks() {
    this.taskService.getTasks();
  }

  ngOnInit() {
    this.getTasks();
    this.showChart();
  }

  showChart() {
    setTimeout(() => {
      this.taskService.tasks.forEach((task: any) => {
        task.interval.forEach((inter: any) => {
          if (inter.stopDate) {
            this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
          }
        });
        this.totaltime = this.totaltime / 1000 / 60;
        this.pie_ChartData.push([task.name, this.totaltime]);
        this.totaltime = 0;
      });
    }, 500);
  }

  showUsedTime() {
    const date = new Date(null, null, null, 0, 0, 1233);
  }
}
