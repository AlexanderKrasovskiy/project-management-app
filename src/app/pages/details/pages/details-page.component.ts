import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadBoard, createColumn } from 'src/app/store/actions/details.actions';
import { selectColumns } from 'src/app/store/selectors/details.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModel } from '../models/details.model';
import { ColumnModalComponent } from '../components/column-modal/column-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  subId$!: Subscription;
  boardId!: string;

  subCols$!: Subscription;
  columns: ColumnModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subId$ = this.route.params
      .pipe(
        map((params) => params['id']),
        tap((id) => {
          this.boardId = id;
        }),
      )
      .subscribe((id: string) => this.store.dispatch(loadBoard({ id })));

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.subCols$ = this.store.select(selectColumns).subscribe((cols) => {
      this.columns = cols;
    });
  }

  dropCols(event: CdkDragDrop<string[]>) {
    // console.log('EVENT: ', event);
    // console.log('DATA: ', event.item.data);
    // console.log('BEFORE: ', columns);
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    // console.log('AFTER: ', columns);
  }

  openDialog(): void {
    const data = { title: '' };
    const dialogRef = this.dialog.open(ColumnModalComponent, { data });

    dialogRef.afterClosed().subscribe((title) => {
      // console.log('Modal Result: ', title);
      if (!title) return;
      this.store.dispatch(createColumn({ boardId: this.boardId, title }));
    });
  }

  ngOnDestroy(): void {
    this.subId$.unsubscribe();
    this.subCols$.unsubscribe();
  }
}
