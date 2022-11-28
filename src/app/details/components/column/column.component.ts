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
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { filter, tap } from 'rxjs';
import {
  ColumnModel,
  TaskModel,
  UpdateColumnPayload,
  UpdateTaskPayload,
} from '../../models/details-api.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { CreateTaskData } from '../../models/task-modal.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {
  @Input() column!: ColumnModel;
  tempTitle = '';
  isTitleEditable = false;
  tasks: TaskModel[] = [];
  @ViewChild('headingInput')
  private headingInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private transLoco: TranslocoService,
  ) {}

  ngOnChanges(): void {
    this.tempTitle = this.column.title;
    if (this.column.tasks) {
      this.tasks = [...this.column.tasks];
    }
  }

  showInput(): void {
    this.isTitleEditable = true;
    this.headingInput.nativeElement.value = this.tempTitle;
  }

  hideInput(): void {
    this.isTitleEditable = false;
  }

  updateTitle(): void {
    this.isTitleEditable = false;
    const title = this.headingInput.nativeElement.value;

    if (!title || title === this.column.title) {
      return;
    }

    this.tempTitle = title;

    const body: UpdateColumnPayload = {
      order: this.column.order,
      title,
    };
    this.store.dispatch(updateColumn({ columnId: this.column.id, body }));
  }

  openDeleteColumnModal(): void {
    const data = this.transLoco.translate('details.deleteColumn');

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((confirmValue) => !!confirmValue),
        tap(() =>
          this.store.dispatch(deleteColumn({ columnId: this.column.id })),
        ),
      )
      .subscribe();
  }

  openCreateTaskModal(): void {
    const data: CreateTaskData = {
      heading: this.transLoco.translate('details.createTask'),
      title: '',
      description: '',
    };

    const dialogRef = this.dialog.open(TaskModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((task) => task?.title.trim() && task?.description.trim()),
        tap(({ title, description }) => {
          this.store.dispatch(
            createTask({
              columnId: this.column.id,
              body: { title: title.trim(), description: description.trim() },
            }),
          );
        }),
      )
      .subscribe();
  }

  dropTask(event: CdkDragDrop<TaskModel[]>): void {
    const prevIdx = event.previousIndex;
    const currIdx = event.currentIndex;
    const { id: taskId, title, description, userId } = event.item.data;

    const body: UpdateTaskPayload = {
      title,
      order: currIdx + 1,
      description,
      userId,
      boardId: '',
      columnId: '',
    };

    if (event.previousContainer === event.container) {
      if (prevIdx === currIdx) {
        return;
      }

      moveItemInArray(event.container.data, prevIdx, currIdx);

      body.columnId = this.column.id;

      this.store.dispatch(
        updateTask({ columnId: this.column.id, taskId, body }),
      );
      return;
    }

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
