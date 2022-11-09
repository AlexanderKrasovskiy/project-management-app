import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import { deleteBoard } from 'src/app/store/actions/boards.action';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  isModalWindow: boolean = false;
  titleModalWindow: string = '';
  idBoard: string = '';

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

  updateId(id: string) {
    this.idBoard = id;
  }

  deleteBoard(id: string): void {
    this.store.dispatch(deleteBoard({ id }));
  }

  removeBoard() {
    this.deleteBoard(this.idBoard);
    this.confirmationService.isConfirmationModalBoard = false;
    this.confirmationService.title = '';
  }
}
