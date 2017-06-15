import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.css']
})
export class DialogDetailsComponent implements OnInit {

  task: any;

  constructor(public dialogRef: MdDialogRef<DialogDetailsComponent>) { }

  ngOnInit() {
    this.dialogRef.updateSize('50%', '50%');
  }

}
