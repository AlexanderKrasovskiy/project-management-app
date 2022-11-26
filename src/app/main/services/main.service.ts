import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { LocalStorageItems } from 'src/app/shared/models/common.model';
import { deleteBoard, updateBoard } from 'src/app/store/actions/boards.action';
import { MainModalComponent } from '../components/main-modal/main-modal.component';
import { BoardData, BoardLocalStoreModel } from '../models/main.model';

@Injectable()
export class MainService {
  isBackgroundSwap: boolean = false;
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
    private transLoco: TranslocoService,
  ) {}

  openUpdateBoardModal(id: string): void {
    const data: BoardData = {
      heading: this.transLoco.translate('main.editBoard'),
      title: '',
      description: '',
    };
    const dialogRef = this.dialog.open(MainModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(
          (modalData) =>
            modalData?.title.trim() || modalData?.description.trim(),
        ),
        tap((modalData) =>
          this.store.dispatch(
            updateBoard({
              id,
              newBoard: {
                title: modalData.title,
                description: modalData.description,
              },
            }),
          ),
        ),
      )
      .subscribe();
  }

  openDeleteBoardModal(id: string): void {
    const data = this.transLoco.translate('confirmation.deleteBoard');

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data,
      backdropClass: 'backdropBackground',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((modalData) => modalData),
        tap(() => this.removeBoard(id)),
      )
      .subscribe();
  }

  hideBackgroundChangeModalWindow(): void {
    this.isBackgroundSwap = false;
  }

  updateLocalStore(id: string, image: string): void {
    const storage = localStorage.getItem(LocalStorageItems.BoardImage);
    const boardImg: BoardLocalStoreModel = { id, image };

    if (storage) {
      let storArr = JSON.parse(storage);

      if (storArr.find((i: BoardLocalStoreModel) => i.id === id)) {
        storArr = storArr.map((e: BoardLocalStoreModel) =>
          e.id === boardImg.id ? boardImg : e,
        );
      } else {
        storArr.push(boardImg);
      }

      localStorage.setItem(
        LocalStorageItems.BoardImage,
        JSON.stringify(storArr),
      );
    } else {
      localStorage.setItem(
        LocalStorageItems.BoardImage,
        JSON.stringify([boardImg]),
      );
    }
  }

  private deleteBoard(id: string): void {
    this.store.dispatch(deleteBoard({ id }));
  }

  private removeBoard(id: string): void {
    const storage = localStorage.getItem(LocalStorageItems.BoardImage);

    if (storage) {
      const storArr = JSON.parse(storage).filter(
        (el: BoardLocalStoreModel) => el.id !== id,
      );
      localStorage.setItem(
        LocalStorageItems.BoardImage,
        JSON.stringify(storArr),
      );
    }

    this.deleteBoard(id);
  }
}
