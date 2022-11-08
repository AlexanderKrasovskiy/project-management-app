import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  columns = [
    '1_Bronze age1_Bronze age1_Bronze age1_Bronze age',
    '2_Iron age',
    '3_Middle ages',
  ];

  dropCols(event: CdkDragDrop<string[]>, columns: any) {
    // console.log('EVENT: ', event);
    // console.log('DATA: ', event.item.data);
    // console.log('BEFORE: ', columns);
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    // console.log('AFTER: ', columns);
  }
}
