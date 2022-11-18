import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, of, catchError, EMPTY } from 'rxjs';
import { MainErrorHandlerService } from 'src/app/pages/main/service/main-error-handler.service';
import { ApiMainHelpersService } from 'src/app/pages/main/services/api-main-helpers.service';
import * as BoardsActions from '../actions/boards.action';

@Injectable()
export class BoardsEffects {
  constructor(
    private actions$: Actions,
    private api: ApiMainHelpersService,
    private errorService: MainErrorHandlerService,
  ) {}

  loadBoards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        BoardsActions.loadBoards,
        BoardsActions.createBoardSuccess,
        BoardsActions.updateBoardSuccess,
        BoardsActions.deleteBoardSuccess,
      ),
      switchMap(() =>
        this.api.getAllBoards().pipe(
          map((value) =>
            BoardsActions.loadBoardsSuccess({
              boards: value,
            }),
          ),
          catchError((error) => {
            this.errorService.handleError(error);
            return of(BoardsActions.loadBoardsFailure({ error }));
          }),
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
          catchError((error) => {
            this.errorService.handleError(error);
            if (this.errorService.isKnownMessageType(error)) {
              return of(BoardsActions.createBoardFailure({ error }));
            }
            return EMPTY;
          }),
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
          catchError((error) => {
            this.errorService.handleError(error);
            if (this.errorService.isKnownMessageType(error)) {
              return of(BoardsActions.updateBoardFailure({ error }));
            }
            return EMPTY;
          }),
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
          catchError((error) => {
            this.errorService.handleError(error);
            if (this.errorService.isKnownMessageType(error)) {
              return of(BoardsActions.deleteBoardFailure({ error }));
            }
            return EMPTY;
          }),
        ),
      ),
    );
  });
}
