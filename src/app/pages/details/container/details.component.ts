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
import { filter, map, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadBoard,
  createColumn,
  updateColumn,
} from 'src/app/store/actions/details.actions';
import { selectColumns } from 'src/app/store/selectors/details.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ColumnModel } from '../models/details-api.model';
import { ColumnModalComponent } from '../components/column-modal/column-modal.component';
import { DetailsTranslations } from '../models/details-translate.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('boardContainer') boardContainer!: ElementRef<HTMLDivElement>;
  boardId = '';
  subId$!: Subscription;
  subCols$!: Subscription;
  columns: ColumnModel[] = [];
  translations = DetailsTranslations;

  constructor(
    public dialog: MatDialog,
    private renderer2: Renderer2,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.dispatchLoadBoard();

    this.setColumnsProperty();
  }

  ngAfterViewInit(): void {
    this.setBoardBackGround();
  }

  ngOnDestroy(): void {
    this.subId$.unsubscribe();
    this.subCols$.unsubscribe();
  }

  dispatchLoadBoard() {
    this.subId$ = this.route.params
      .pipe(
        map((params) => params['id']),
        tap((id) => {
          this.boardId = id;
        }),
        tap((id: string) => this.store.dispatch(loadBoard({ id }))),
      )
      .subscribe();
  }

  setColumnsProperty() {
    this.subCols$ = this.store
      .select(selectColumns)
      .pipe(
        tap((cols) => {
          this.columns = [...cols];
        }),
      )
      .subscribe();
  }

  setBoardBackGround() {
    const boardImages = localStorage.getItem('BoardImage');

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

    if (prevIdx === currIdx) {
      return;
    }

    moveItemInArray(this.columns, prevIdx, currIdx);

    this.store.dispatch(
      updateColumn({ columnId: id, body: { title, order: currIdx + 1 } }),
    );
  }

  openAddColumnModal(): void {
    const data = '';
    const dialogRef = this.dialog.open(ColumnModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((title) => !!title),
        tap((title) => this.store.dispatch(createColumn({ title }))),
      )
      .subscribe();
  }
}
