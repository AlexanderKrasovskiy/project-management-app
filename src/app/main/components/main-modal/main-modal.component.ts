import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CreateBoardData {
  heading: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss'],
})
export class MainModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MainModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateBoardData,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
