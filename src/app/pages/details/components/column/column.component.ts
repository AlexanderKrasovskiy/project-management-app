import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  createTask,
  deleteColumn,
  updateColumn,
} from 'src/app/store/actions/details.actions';
import { ColumnModel, TaskModel } from '../../models/details.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: ColumnModel;
  isTitleEditable = false;
  @ViewChild('headingInput') headingInput!: ElementRef<HTMLInputElement>;
  tempTitle = '';

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.tempTitle = this.column.title;
  }

  showInput() {
    this.isTitleEditable = true;
    this.headingInput.nativeElement.value = this.tempTitle;
  }

  hideInput() {
    this.isTitleEditable = false;
  }

  updateTitle() {
    this.isTitleEditable = false;
    const title = this.headingInput.nativeElement.value;
    if (!title || title === this.column.title) return;
    this.tempTitle = title;

    const body = {
      order: this.column.order,
      title,
    };
    this.store.dispatch(updateColumn({ columnId: this.column.id, body }));
  }

  openDeleteColumnModal(): void {
    const data = { title: 'колонку' };
    const dialogRef = this.dialog.open(DeleteModalComponent, { data });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(deleteColumn({ columnId: this.column.id }));
    });
  }

  openCreateTaskModal(): void {
    const data = { title: '', description: '' };
    const dialogRef = this.dialog.open(TaskModalComponent, { data });

    dialogRef.afterClosed().subscribe((body) => {
      if (!(body.title && body.description)) return;
      this.store.dispatch(createTask({ columnId: this.column.id, body }));
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
