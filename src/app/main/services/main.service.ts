import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { ConfirmationModalService } from 'src/app/shared/services/confirmation-modal.service';
import {
  createBoard,
  deleteBoard,
  updateBoard,
} from 'src/app/store/actions/boards.action';
import { MainModalComponent } from '../components/main-modal/main-modal.component';
import { BoardLocalStorModel } from '../models/main.model';

@Injectable()
export class MainService {
  isbackgroundSwap: boolean = false;
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
    private dialog: MatDialog,
    private transloco: TranslocoService,
  ) {}

  openCreateBoardModal(): void {
    const data = {
      heading: this.transloco.translate('main.createNewBoard'),
      title: '',
      description: '',
    };
    const dialogRef = this.dialog.open(MainModalComponent, { data });

    dialogRef.afterClosed().subscribe((modalData) => {
      if (!modalData?.title || !modalData?.description) return;
      this.store.dispatch(
        createBoard({
          newBoard: {
            title: modalData.title,
            description: modalData.description,
          },
        }),
      );
    });
  }

  openUpdateBoardModal(id: string): void {
    const data = {
      heading: this.transloco.translate('main.editBoard'),
      title: '',
      description: '',
    };
    const dialogRef = this.dialog.open(MainModalComponent, { data });

    dialogRef.afterClosed().subscribe((modalData) => {
      if (!modalData?.title || !modalData?.description) return;
      this.store.dispatch(
        updateBoard({
          id,
          newBoard: {
            title: modalData.title,
            description: modalData.description,
          },
        }),
      );
    });
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
