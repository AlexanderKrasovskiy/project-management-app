import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';

import { DetailsRoutingModule } from 'src/app/details/details-routing.module';
import { DetailsComponent } from 'src/app/details/container/details.component';
import { BoardHeaderComponent } from 'src/app/details/components/board-header/board-header.component';
import { ColumnComponent } from 'src/app/details/components/column/column.component';
import { TaskComponent } from 'src/app/details/components/task/task.component';
import { ColumnModalComponent } from 'src/app/details/components/column-modal/column-modal.component';
import { TaskModalComponent } from 'src/app/details/components/task-modal/task-modal.component';

@NgModule({
  declarations: [
    DetailsComponent,
    BoardHeaderComponent,
    ColumnComponent,
    TaskComponent,
    ColumnModalComponent,
    TaskModalComponent,
  ],
  imports: [CommonModule, DetailsRoutingModule, DragDropModule, SharedModule],
})
export class DetailsModule {}
