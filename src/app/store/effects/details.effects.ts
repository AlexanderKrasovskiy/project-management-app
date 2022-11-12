import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { BoardResModel } from 'src/app/pages/details/models/details.model';
import { DetailsService } from 'src/app/pages/details/services/details.service';
import * as DetailsActions from '../actions/details.actions';
import { selectBoardId } from '../selectors/details.selectors';

@Injectable()
export class DetailsEffects {
  constructor(
    private actions$: Actions,
    private detailsService: DetailsService,
    private store: Store,
  ) {}

  loadCurrentBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        DetailsActions.loadBoard,
        DetailsActions.deleteColumnSuccess,
        DetailsActions.updateColumnSuccess,
        DetailsActions.createTaskSuccess,
        DetailsActions.deleteTaskSuccess,
      ),
      switchMap(({ id }) =>
        this.detailsService.getBoardById(id).pipe(
          tap((board: BoardResModel) => {
            board.columns.sort((a, b) => a.order - b.order);
          }),
          map((board) => DetailsActions.loadBoardSuccess({ board })),
          catchError(() => of(DetailsActions.loadBoardFailure())),
        ),
      ),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.createColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([{ title }, boardId]) =>
        this.detailsService.createColumn(boardId, title).pipe(
          map((column) => DetailsActions.createColumnSuccess({ column })),
          catchError(() => of(DetailsActions.createColumnFailure())),
        ),
      ),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.deleteColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([{ columnId }, boardId]) =>
        this.detailsService.deleteColumn(boardId, columnId).pipe(
          map(() => DetailsActions.deleteColumnSuccess({ id: boardId })),
          catchError(() => of(DetailsActions.deleteColumnFailure())),
        ),
      ),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.updateColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([{ columnId, body }, boardId]) =>
        this.detailsService.updateColumn(boardId, columnId, body).pipe(
          map(() => DetailsActions.updateColumnSuccess({ id: boardId })),
          catchError(() => of(DetailsActions.updateColumnFailure())),
        ),
      ),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.createTask),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([{ columnId, body }, boardId]) =>
        this.detailsService.createTask(boardId, columnId, body).pipe(
          map(() => DetailsActions.createTaskSuccess({ id: boardId })),
          catchError(() => of(DetailsActions.createTaskFailure())),
        ),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.deleteTask),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([{ columnId, taskId }, boardId]) =>
        this.detailsService.deleteTask(boardId, columnId, taskId).pipe(
          map(() => DetailsActions.deleteTaskSuccess({ id: boardId })),
          catchError(() => of(DetailsActions.deleteTaskFailure())),
        ),
      ),
    );
  });
}
