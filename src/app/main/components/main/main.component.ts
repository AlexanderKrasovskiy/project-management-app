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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import {
  createBoard,
  loadBoards,
  updateBoard,
} from 'src/app/store/actions/boards.action';
import { selectCurrentBoards } from 'src/app/store/selectors/boards.selector';
import {
  BoardLocalStorModel,
  BoardRequestModel,
} from '../../models/main.model';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  formMain: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  boards$ = this.store.select(selectCurrentBoards);
  indexBoard: number = 0;
  idBoard: string = '';
  imgBoard: string = '';

  private subscribe: Subscription = new Subscription();

  @ViewChildren('boardImage') elems!: QueryList<ElementRef>;

  constructor(
    private store: Store,
    public mainService: MainService,
    public confirmationService: ConfirmationModalService,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  ngAfterViewInit(): void {
    const storage = localStorage.getItem('BoardImage');

    if (storage) {
      JSON.parse(storage).forEach((el: BoardLocalStorModel) => {
        this.subscribe = this.elems.changes.subscribe(() => {
          this.elems.forEach((e) => {
            if (e.nativeElement.id === el.id)
              this.renderer2.setStyle(
                e.nativeElement,
                'background-image',
                `url(assets/images/${el.image}-small.png)`,
              );
          });
        });
      });
    }
  }

  onSubmit(): void {
    if (this.mainService.titleModalWindow === 'Создать доску?')
      this.createNewBoard(this.formMain.value);
    else this.updateBoard(this.mainService.idBoard, this.formMain.value);
    this.formMain.reset();
    this.mainService.isModalWindow = false;
  }

  createNewBoard(board: BoardRequestModel): void {
    this.store.dispatch(
      createBoard({
        newBoard: board,
      }),
    );
  }

  updateBoard(id: string, board: BoardRequestModel): void {
    this.store.dispatch(
      updateBoard({
        id,
        newBoard: board,
      }),
    );
  }

  hideModalWindow(): void {
    this.mainService.isModalWindow = false;
    this.formMain.reset();
  }

  showBackgroundChangeModalWindow(id: string, index: number): void {
    this.idBoard = id;
    this.indexBoard = index;
    this.mainService.isbackgroundSwap = true;
  }

  changeBackground(image: string): void {
    const board = this.elems?.toArray();

    if (board)
      this.renderer2.setStyle(
        board[this.indexBoard].nativeElement,
        'background-image',
        `url(assets/images/${image}-small.png)`,
      );

    this.imgBoard = image;
    this.mainService.isbackgroundSwap = false;
    this.updateLocalStorBoardImg();
  }

  updateLocalStorBoardImg(): void {
    this.mainService.updateLocalStor(this.idBoard, this.imgBoard);
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
