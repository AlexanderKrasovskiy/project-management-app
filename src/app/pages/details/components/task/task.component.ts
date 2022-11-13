import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { deleteTask, updateTask } from 'src/app/store/actions/details.actions';
import { TaskModel } from '../../models/details.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
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
    private transloco: TranslocoService,
  ) {}

  openDeleteTaskModal(): void {
    const data = { title: this.transloco.translate('details.deleteTask') };
    const dialogRef = this.dialog.open(DeleteModalComponent, { data });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(
        deleteTask({ columnId: this.columnId, taskId: this.task.id }),
      );
    });
  }

  openEditTaskModal(): void {
    const data = {
      heading: this.transloco.translate('details.editTask'),
      title: this.task.title,
      description: this.task.description,
    };
    const dialogRef = this.dialog.open(TaskModalComponent, { data });

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
