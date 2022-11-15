import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
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
    'board-7',
    'board-8',
    'board-9',
    'board-10',
    'board-11',
    'board-12',
    'board-13',
    'board-14',
  ];

  constructor(
    private store: Store,
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

  openDeleteBoardModal(id: string): void {
    const data = this.transloco.translate('confirmation.deleteBoard');

    const dialogRef = this.dialog.open(ConfirmationModalComponent, { data });

    dialogRef.afterClosed().subscribe((modalData) => {
      if (modalData) this.removeBoard(id);
    });
  }

  hideBackgroundChangeModalWindow(): void {
    this.isbackgroundSwap = false;
  }

  deleteBoard(id: string): void {
    this.store.dispatch(deleteBoard({ id }));
  }

  removeBoard(id: string): void {
    const storage = localStorage.getItem('BoardImage');

    if (storage) {
      const storArr = JSON.parse(storage).filter(
        (el: BoardLocalStorModel) => el.id !== id,
      );
      localStorage.setItem('BoardImage', JSON.stringify(storArr));
    }

    this.deleteBoard(id);
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
