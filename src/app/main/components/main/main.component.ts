import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { Subscription, tap } from 'rxjs';
import { CreateBoardService } from 'src/app/shared/services/create-board.service';
import { loadBoards } from 'src/app/store/actions/boards.action';
import { selectCurrentBoards } from 'src/app/store/selectors/boards.selector';
import { BoardLocalStoreModel } from '../../models/main.model';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('boardImage') elems!: QueryList<ElementRef>;

  boards$ = this.store.select(selectCurrentBoards);
  private subscribe: Subscription = new Subscription();
  private indexBoard: number = 0;
  private idBoard: string = '';
  private imgBoard: string = '';

  constructor(
    public createBoard: CreateBoardService,
    public mainService: MainService,
    private store: Store,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  ngAfterViewInit(): void {
    const storage = localStorage.getItem(LocalStorageItems.BoardImage);

    if (storage) {
      JSON.parse(storage).forEach((el: BoardLocalStoreModel) => {
        this.subscribe = this.elems.changes
          .pipe(
            tap(() => {
              this.elems.forEach((e) => {
                if (e.nativeElement.id === el.id) {
                  this.renderer2.setStyle(
                    e.nativeElement,
                    'background-image',
                    `url(assets/images/${el.image}-small.png)`,
                  );
                }
              });
            }),
          )
          .subscribe();
      });
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  showBackgroundChangeModalWindow(id: string, index: number): void {
    this.idBoard = id;
    this.indexBoard = index;
    this.mainService.isBackgroundSwap = true;
  }

  changeBackground(image: string): void {
    const board = this.elems?.toArray();

    if (board) {
      this.renderer2.setStyle(
        board[this.indexBoard].nativeElement,
        'background-image',
        `url(assets/images/${image}-small.png)`,
      );
    }

    this.imgBoard = image;
    this.mainService.isBackgroundSwap = false;
    this.updateLocalStoreBoardImg();
  }

  private updateLocalStoreBoardImg(): void {
    this.mainService.updateLocalStore(this.idBoard, this.imgBoard);
  }
}
