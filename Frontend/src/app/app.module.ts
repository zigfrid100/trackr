import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskElementComponent } from './task-list/task-element/task-element.component';
import { ApiService} from './api.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MdCheckboxModule, MdButtonModule, MdCardModule, MaterialModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatisticsComponent } from './statistics/statistics.component';
import { RouterModule, Routes } from '@angular/router';
import { MdDialogModule } from '@angular/material';
import { DialogDetailsComponent } from './task-list/dialog-details/dialog-details.component';
import { ProjectDialogDetailsComponent } from './project-list/project-dialog-details/project-dialog-details.component';
import { GoogleChart } from 'angular2-google-chart/directives/angular2-google-chart.directive';
import { ProjectElementComponent } from './project-list/project-element/project-element.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DurationPipe } from './duration.pipe';

const appRoutes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TaskListComponent,
    ProjectListComponent,
    TaskElementComponent,
    StatisticsComponent,
    DialogDetailsComponent,
    ProjectDialogDetailsComponent,
    GoogleChart,
    ProjectElementComponent,
    DurationPipe
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
    SimpleNotificationsModule.forRoot()
  ],
  entryComponents: [
    DialogDetailsComponent,
    ProjectDialogDetailsComponent
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
