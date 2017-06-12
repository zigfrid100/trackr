import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { TaskListComponent } from './menu/task-list/task-list.component';
import { TaskElementComponent } from './menu/task-list/task-element/task-element.component';
import {TaskService} from "./task.service";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MdCheckboxModule, MdButtonModule, MdCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TaskListComponent,
    TaskElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule, MdCardModule,BrowserAnimationsModule,Ng2SearchPipeModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
