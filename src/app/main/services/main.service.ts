import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import { deleteBoard } from 'src/app/store/actions/boards.action';

@Injectable()
export class MainService {
  isModalWindow: boolean = false;
  isbackgroundSwap: boolean = false;
  titleModalWindow: string = '';
  idBoard: string = '';
  images: string[] = [
    'board-1-small',
    'board-2-small',
    'board-3-small',
    'board-4-small',
    'board-5-small',
    'board-6-small',
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
    this.deleteBoard(this.idBoard);
    this.confirmationService.isConfirmationModalBoard = false;
    this.confirmationService.title = '';
  }
}
