import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  deleteColumn,
  updateColumn,
} from 'src/app/store/actions/details.actions';
import { ColumnModel, TaskModel } from '../../models/details.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnModel;
  isEditable = false;
  @ViewChild('headingInput') headingInput!: ElementRef<HTMLInputElement>;
  tempTitle = '';

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.tempTitle = this.column.title;
  }

  showInput() {
    this.isEditable = true;
    this.headingInput.nativeElement.value = this.tempTitle;
  }

  hideInput() {
    this.isEditable = false;
  }

  updateTitle() {
    this.isEditable = false;
    const title = this.headingInput.nativeElement.value;
    if (!title || title === this.column.title) return;
    this.tempTitle = title;

    const body = {
      order: this.column.order,
      title,
    };
    this.store.dispatch(updateColumn({ columnId: this.column.id, body }));
  }

  openDialog(): void {
    const data = { title: 'колонку' };
    const dialogRef = this.dialog.open(DeleteModalComponent, { data });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(deleteColumn({ columnId: this.column.id }));
    });
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
