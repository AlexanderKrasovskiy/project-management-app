import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { deleteTask, updateTask } from 'src/app/store/actions/details.actions';
import { TaskModel } from '../../models/details.model';
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

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(
        deleteTask({ columnId: this.columnId, taskId: this.task.id }),
      );
    });
  }

  openEditTaskModal(): void {
    const data = {
      heading: this.transLoco.translate('details.editTask'),
      title: this.task.title,
      description: this.task.description,
    };
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    const bodyPayload = {
      order: this.task.order,
      userId: this.task.userId,
      boardId: '',
      columnId: this.columnId,
    };

    dialogRef.afterClosed().subscribe((modalData) => {
      if (!modalData?.title || !modalData?.description) return;

      if (
        modalData.title === this.task.title &&
        modalData.description === this.task.description
      )
        return;

      this.store.dispatch(
        updateTask({
          columnId: this.columnId,
          taskId: this.task.id,
          body: {
            ...bodyPayload,
            title: modalData.title,
            description: modalData.description,
          },
        }),
      );
    });
  }
}
