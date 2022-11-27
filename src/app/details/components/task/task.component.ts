import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { deleteTask, updateTask } from 'src/app/store/actions/details.actions';
import { TaskModel } from '../../models/details-api.model';
import { CreateTaskData } from '../../models/task-modal.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskModel;
  @Input() columnId!: string;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private transLoco: TranslocoService,
  ) {}

  openDeleteTaskModal(): void {
    const data = this.transLoco.translate('details.deleteTask');

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((confirm) => !!confirm),
        tap(() => {
          this.store.dispatch(
            deleteTask({ columnId: this.columnId, taskId: this.task.id }),
          );
        }),
      )
      .subscribe();
  }

  openEditTaskModal(): void {
    const data: CreateTaskData = {
      heading: this.transLoco.translate('details.editTask'),
      title: this.task.title,
      description: this.task.description,
    };

    const dialogRef = this.dialog.open(TaskModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((task) => task?.title.trim() && task?.description.trim()),
        filter(({ title, description }) => {
          return (
            title.trim() !== this.task.title ||
            description.trim() !== this.task.description
          );
        }),
        tap(({ title, description }) => {
          this.store.dispatch(
            updateTask({
              columnId: this.columnId,
              taskId: this.task.id,
              body: {
                title: title.trim(),
                description: description.trim(),
                order: this.task.order,
                userId: this.task.userId,
                boardId: '',
                columnId: this.columnId,
              },
            }),
          );
        }),
      )
      .subscribe();
  }
}
