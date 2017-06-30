import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskElementComponent } from './task-list/task-element/task-element.component';
import { TaskService} from './task.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MdCheckboxModule, MdButtonModule, MdCardModule, MaterialModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatisticsComponent } from './statistics/statistics.component';
import { RouterModule, Routes } from '@angular/router';
import { MdDialogModule } from '@angular/material';
import { DialogDetailsComponent } from './task-list/dialog-details/dialog-details.component';
import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';
import { ProjectElementComponent } from './task-list/project-element/project-element.component';

const appRoutes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TaskListComponent,
    TaskElementComponent,
    StatisticsComponent,
    DialogDetailsComponent,
    GoogleChart,
    ProjectElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MaterialModule,
    MdInputModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    MdDialogModule,
    RouterModule.forRoot(appRoutes),
  ],
  entryComponents: [DialogDetailsComponent],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
