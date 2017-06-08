import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../task.service';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrls: ['./task-element.component.css']
})
export class TaskElementComponent implements OnInit {

  @Input() joke: any;
  private showDetails: any;

  constructor(private taskService: TaskService) {
    this.showDetails = false;
  }

  ngOnInit() {
  }

}
