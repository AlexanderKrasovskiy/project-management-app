import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  display = false;
  sideBarStyles = {
    width: '150px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(3px)',
  };

  columns = ['1_Bronze age', '2_Iron age', '3_Middle ages'];

  drop(event: CdkDragDrop<string[]>) {
    // console.log('EVENT: ', event);
    // console.log('DATA: ', event.item.data);
    // console.log('BEFORE: ', this.columns);
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    // console.log('AFTER: ', this.columns);
  }
}
