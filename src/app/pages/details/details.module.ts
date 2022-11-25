import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared/shared.module';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './container/details.component';
import { BoardHeaderComponent } from './components/board-header/board-header.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { ColumnModalComponent } from './components/column-modal/column-modal.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';

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
