import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DetailsService } from 'src/app/pages/details/services/details.service';
import * as DetailsActions from '../actions/details.actions';

@Injectable()
export class DetailsEffects {
  constructor(
    private actions$: Actions,
    private detailsService: DetailsService,
  ) {}

  loadCurrentBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.loadBoard),
      switchMap(({ id }) =>
        this.detailsService.getBoardById(id).pipe(
          map((board) => DetailsActions.loadBoardSuccess({ board })),
          catchError(() => of(DetailsActions.loadBoardFailure())),
        ),
      ),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.createColumn),
      switchMap(({ boardId, title }) =>
        this.detailsService.createColumn(boardId, title).pipe(
          map((column) => DetailsActions.createColumnSuccess({ column })),
          catchError(() => of(DetailsActions.createColumnFailure())),
        ),
      ),
    );
  });
}
