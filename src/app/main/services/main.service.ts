import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import { deleteBoard } from 'src/app/store/actions/boards.action';
import { BoardLocalStorModel } from '../models/main.model';

@Injectable()
export class MainService {
  isModalWindow: boolean = false;
  isbackgroundSwap: boolean = false;
  titleModalWindow: string = '';
  idBoard: string = '';
  images: string[] = [
    'board-1',
    'board-2',
    'board-3',
    'board-4',
    'board-5',
    'board-6',
  ];

  constructor(
    private store: Store,
    public confirmationService: ConfirmationModalService,
  ) {}

  showModalWindowForCreate(): void {
    this.isModalWindow = true;
    this.titleModalWindow = 'Создать доску?';
  }

  showModalWindowForUpdate(): void {
    this.isModalWindow = true;
    this.titleModalWindow = 'Обновить доску?';
  }

  showConfirmationModalWindow(): void {
    this.confirmationService.isConfirmationModalBoard = true;
    this.confirmationService.title = 'доску';
  }

  hideBackgroundChangeModalWindow(): void {
    this.isbackgroundSwap = false;
  }

  updateId(id: string) {
    this.idBoard = id;
  }

  deleteBoard(id: string): void {
    this.store.dispatch(deleteBoard({ id }));
  }

  removeBoard(): void {
    const storage = localStorage.getItem('BoardImage');

    if (storage) {
      const storArr = JSON.parse(storage).filter(
        (el: BoardLocalStorModel) => el.id !== this.idBoard,
      );
      localStorage.setItem('BoardImage', JSON.stringify(storArr));
    }

    this.deleteBoard(this.idBoard);
    this.confirmationService.isConfirmationModalBoard = false;
    this.confirmationService.title = '';
  }

  updateLocalStor(id: string, image: string): void {
    const storage = localStorage.getItem('BoardImage');
    const boardImg: BoardLocalStorModel = { id, image };

    if (storage) {
      let storArr = JSON.parse(storage);
      if (storArr.find((i: BoardLocalStorModel) => i.id === id)) {
        storArr = storArr.map((e: BoardLocalStorModel) =>
          e.id === boardImg.id ? boardImg : e,
        );
      } else storArr.push(boardImg);
      localStorage.setItem('BoardImage', JSON.stringify(storArr));
    } else localStorage.setItem('BoardImage', JSON.stringify([boardImg]));
  }
}
