import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

}