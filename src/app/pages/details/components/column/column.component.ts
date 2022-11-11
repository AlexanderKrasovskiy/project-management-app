import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteColumn } from 'src/app/store/actions/details.actions';
import { ColumnModel, TaskModel } from '../../models/details.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  isEditable = false;

  @Input() column!: ColumnModel;

  constructor(public dialog: MatDialog, private store: Store) {}

  openDialog(): void {
    const data = { title: 'колонку' };
    const dialogRef = this.dialog.open(DeleteModalComponent, { data });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(deleteColumn({ columnId: this.column.id }));
    });
  }

  toggleTitleEdit() {
    this.isEditable = !this.isEditable;
  }

  dropTask(event: CdkDragDrop<TaskModel[]>) {
    if (event.previousContainer === event.container) {
      // console.log('Move Task in Col: ', event);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      // console.log('Move Task bw Cols: ', event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
