import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs';
import { MainModalComponent } from 'src/app/main/components/main-modal/main-modal.component';
import { BoardData } from 'src/app/main/models/main.model';
import { createBoard } from 'src/app/store/actions/boards.action';

@Injectable()
export class CreateBoardService {
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private transLoco: TranslocoService,
  ) {}

  openCreateBoardModal(): void {
    const data: BoardData = {
      heading: this.transLoco.translate('main.createNewBoard'),
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
            createBoard({
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
}
