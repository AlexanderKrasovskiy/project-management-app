import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteTask } from 'src/app/store/actions/details.actions';
import { TaskModel } from '../../models/details.model';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: TaskModel;
  @Input() columnId!: string;

  constructor(public dialog: MatDialog, private store: Store) {}

  openDeleteTaskModal(): void {
    const data = { title: 'задачу' };
    const dialogRef = this.dialog.open(DeleteModalComponent, { data });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (!confirm) return;
      this.store.dispatch(
        deleteTask({ columnId: this.columnId, taskId: this.task.id }),
      );
    });
  }
}
