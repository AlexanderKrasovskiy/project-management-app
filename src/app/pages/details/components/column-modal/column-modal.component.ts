import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsTranslations } from '../../models/details-translate.model';

@Component({
  selector: 'app-column-modal',
  templateUrl: './column-modal.component.html',
  styleUrls: ['./column-modal.component.scss'],
})
export class ColumnModalComponent {
  translations = DetailsTranslations;

  constructor(
    public dialogRef: MatDialogRef<ColumnModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
