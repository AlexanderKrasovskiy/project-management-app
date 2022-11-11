import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadBoard,
  createColumn,
  updateColumn,
} from 'src/app/store/actions/details.actions';
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

  subCols$!: Subscription;
  columns: ColumnModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.subId$ = this.route.params
      .pipe(map((params) => params['id']))
      .subscribe((id: string) => this.store.dispatch(loadBoard({ id })));

    // eslint-disable-next-line @ngrx/no-store-subscription
    this.subCols$ = this.store.select(selectColumns).subscribe((cols) => {
      this.columns = [...cols];
    });
  }

  dropCols(event: CdkDragDrop<string[]>) {
    const {
      previousIndex: prevIdx,
      currentIndex: currIdx,
      item: {
        data: { id, title },
      },
    } = event;

    if (prevIdx === currIdx) return;

    moveItemInArray(this.columns, prevIdx, currIdx);

    this.store.dispatch(
      updateColumn({ columnId: id, body: { title, order: currIdx + 1 } }),
    );
  }

  openDialog(): void {
    const data = { title: '' };
    const dialogRef = this.dialog.open(ColumnModalComponent, { data });

    dialogRef.afterClosed().subscribe((title) => {
      if (!title) return;
      this.store.dispatch(createColumn({ title }));
    });
  }

  ngOnDestroy(): void {
    this.subId$.unsubscribe();
    this.subCols$.unsubscribe();
  }
}
