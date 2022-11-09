import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  isEditable = false;

  @Input() column!: any; // add types from models

  tasks = [1, 2, 3, 4, 5, 6];

  toggleEdit() {
    this.isEditable = !this.isEditable;
  }

  dropTask(event: CdkDragDrop<number[]>) {
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
