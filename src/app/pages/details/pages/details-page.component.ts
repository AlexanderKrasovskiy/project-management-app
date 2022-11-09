import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadBoard } from 'src/app/store/actions/details.actions';
import { selectColumns } from 'src/app/store/selectors/details.selectors';
import { ColumnModel } from '../models/details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  subId$!: Subscription;
  subCols$!: Subscription;
  columns: ColumnModel[] = [];

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.subId$ = this.route.params
      .pipe(map((params) => params['id']))
      .subscribe((id: string) => this.store.dispatch(loadBoard({ id })));

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.subCols$ = this.store.select(selectColumns).subscribe((cols) => {
      this.columns = cols;
    });
  }

  ngOnDestroy(): void {
    this.subId$.unsubscribe();
    this.subCols$.unsubscribe();
  }

  dropCols(event: CdkDragDrop<string[]>) {
    // console.log('EVENT: ', event);
    // console.log('DATA: ', event.item.data);
    // console.log('BEFORE: ', columns);
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    // console.log('AFTER: ', columns);
  }
}
