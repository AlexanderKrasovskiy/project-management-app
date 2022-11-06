import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, of, catchError } from 'rxjs';
import { ApiMainHelpersService } from 'src/app/main/services/api-main-helpers.service';
import * as BoardsActions from '../actions/boards.action';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private apiBoards: ApiMainHelpersService,
    private store: Store,
  ) {}

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.loadBoards),
      switchMap(() =>
        this.apiBoards.getAllBoards().pipe(
          map((value) =>
            BoardsActions.loadBoardsSuccess({
              boards: value,
            }),
          ),
          catchError((error) => of(BoardsActions.loadBoardsFailure({ error }))),
        ),
      ),
    );
  });

  createBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.createBoard),
      switchMap(({ boards: value }) =>
        this.apiBoards
          .createBoard(value)
          .pipe(map((board) => BoardsActions.createBoardSuccess(board))),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      switchMap(({ id: value }) =>
        this.apiBoards.deleteBoard(value).pipe(
          map(() => BoardsActions.deleteBoardSuccess({ id: value })),
          catchError((error) =>
            of(BoardsActions.deleteBoardFailure({ error })),
          ),
        ),
      ),
    );
  });

  // saveBoards$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(BoardsActions.deleteBoard),
  //       concatLatestFrom(() => this.store.select(selectCurrentBoards)),
  //     );
  //   },
  //   { dispatch: false },
  // );
}
