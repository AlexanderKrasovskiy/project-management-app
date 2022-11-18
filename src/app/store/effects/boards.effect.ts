import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, of, catchError } from 'rxjs';
import { ApiMainHelpersService } from 'src/app/pages/main/services/api-main-helpers.service';
import * as BoardsActions from '../actions/boards.action';

@Injectable()
export class BoardsEffects {
  constructor(private actions$: Actions, private api: ApiMainHelpersService) {}

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.loadBoards),
      switchMap(() =>
        this.api.getAllBoards().pipe(
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
      switchMap(({ newBoard: value }) =>
        this.api.createBoard(value).pipe(
          map((board) => BoardsActions.createBoardSuccess({ newBoard: board })),
          catchError((error) =>
            of(BoardsActions.createBoardFailure({ error })),
          ),
        ),
      ),
    );
  });

  updateBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.updateBoard),
      switchMap(({ id: value, newBoard: board }) =>
        this.api.updateBoard(value, board).pipe(
          map((updateBoard) =>
            BoardsActions.updateBoardSuccess({ newBoard: updateBoard }),
          ),
          catchError((error) =>
            of(BoardsActions.updateBoardFailure({ error })),
          ),
        ),
      ),
    );
  });

  deleteBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardsActions.deleteBoard),
      switchMap(({ id: value }) =>
        this.api.deleteBoard(value).pipe(
          map(() => BoardsActions.deleteBoardSuccess({ id: value })),
          catchError((error) =>
            of(BoardsActions.deleteBoardFailure({ error })),
          ),
        ),
      ),
    );
  });
}
