import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
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
  updateTask,
} from 'src/app/store/actions/details.actions';
import { TranslocoService } from '@ngneat/transloco';
import { ColumnModel, TaskModel } from '../../models/details.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {
  @Input() column!: ColumnModel;

  isTitleEditable = false;
  @ViewChild('headingInput') headingInput!: ElementRef<HTMLInputElement>;
  tempTitle = '';

  tasks: TaskModel[] = [];

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private transloco: TranslocoService,
  ) {}

  ngOnChanges(): void {
    this.tempTitle = this.column.title;
    this.tasks = [...this.column.tasks];
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
    const data = { title: this.transloco.translate('details.deleteColumn') };
    const dialogRef = this.dialog.open(DeleteModalComponent, { data });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(deleteColumn({ columnId: this.column.id }));
    });
  }

  openCreateTaskModal(): void {
    const data = {
      heading: this.transloco.translate('details.createTask'),
      title: '',
      description: '',
    };
    const dialogRef = this.dialog.open(TaskModalComponent, { data });

    dialogRef.afterClosed().subscribe((body) => {
      if (!body?.title || !body?.description) return;
      const { title, description } = body;
      this.store.dispatch(
        createTask({ columnId: this.column.id, body: { title, description } }),
      );
    });
  }

  dropTask(event: CdkDragDrop<TaskModel[]>) {
    const prevIdx = event.previousIndex;
    const currIdx = event.currentIndex;
    const { id: taskId, title, description, userId } = event.item.data;

    const body = {
      title,
      order: currIdx + 1,
      description,
      userId,
      boardId: '',
      columnId: '',
    };

    if (event.previousContainer === event.container) {
      if (prevIdx === currIdx) return;

      moveItemInArray(event.container.data, prevIdx, currIdx);

      body.columnId = this.column.id;

      this.store.dispatch(
        updateTask({ columnId: this.column.id, taskId, body }),
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        prevIdx,
        currIdx,
      );

      const targetColId = event.container.element.nativeElement.dataset[
        'id'
      ] as string;
      const oldColId = event.previousContainer.element.nativeElement.dataset[
        'id'
      ] as string;

      body.columnId = targetColId;

      this.store.dispatch(updateTask({ columnId: oldColId, taskId, body }));
    }
  }
}
