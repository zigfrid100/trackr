import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  providers: [ApiService]
})

export class StatisticsComponent implements OnInit {
  public totaltime = 0;
  public pie_ChartData = [['Task', 'Hours per Day']];
  public pie_ChartOptions = {
    title: 'Time distribution',
    width: 1000,
    height: 500,
    is3D: true,
    fontSize: 21,
  };

  constructor(private apiService: ApiService) {
  }

  getTasks() {
    this.apiService.getTasks();
  }

  getProjects() {
    this.apiService.getProjects();
  }

  ngOnInit() {
    this.getTasks();
    this.getProjects();
    this.showChart();
  }

  showChart() {
    setTimeout(() => {
      this.apiService.tasks.forEach((task: any) => {
        task.interval.filter((inter) => inter.stopDate).forEach((inter: any) => {
          this.totaltime += Date.parse(inter.stopDate) - Date.parse(inter.startDate);
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
