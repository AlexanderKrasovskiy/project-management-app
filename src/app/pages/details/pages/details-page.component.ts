import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadBoard,
  createColumn,
  updateColumn,
} from 'src/app/store/actions/details.actions';
import { selectColumns } from 'src/app/store/selectors/details.selectors';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { ColumnModel } from '../models/details.model';
import { ColumnModalComponent } from '../components/column-modal/column-modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  subId$!: Subscription;

  subCols$!: Subscription;
  columns: ColumnModel[] = [];

  @ViewChild('boardContainer') boardContainer!: ElementRef<HTMLDivElement>;
  boardId = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.dispatchLoadBoard();

    this.setColumnsProperty();
  }

  ngAfterViewInit(): void {
    this.setBoardBackGround();
  }

  dispatchLoadBoard() {
    this.subId$ = this.route.params
      .pipe(
        map((params) => params['id']),
        tap((id) => {
          this.boardId = id;
        }),
      )
      .subscribe((id: string) => this.store.dispatch(loadBoard({ id })));
  }

  setColumnsProperty() {
    // eslint-disable-next-line @ngrx/no-store-subscription
    this.subCols$ = this.store.select(selectColumns).subscribe((cols) => {
      this.columns = [...cols];
    });
  }

  setBoardBackGround() {
    const boardImages = localStorage.getItem(LocalStorageItems.BoardImage);

    if (boardImages) {
      JSON.parse(boardImages).forEach((el: { id: string; image: string }) => {
        if (el.id === this.boardId) {
          this.renderer2.setStyle(
            this.boardContainer.nativeElement,
            'background-image',
            `url(assets/images/${el.image}.jpg)`,
          );
        }
      });
    }
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
    const dialogRef = this.dialog.open(ColumnModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

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
