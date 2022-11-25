import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsTranslations } from '../../models/details-translate.model';
import { CreateTaskData } from '../../models/task-modal.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  translations = DetailsTranslations;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTaskData,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
