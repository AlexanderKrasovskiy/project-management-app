import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, of, switchMap, tap } from 'rxjs';
import { BoardResModel } from 'src/app/pages/details/models/details.model';
import { DetailsErrorHandlerService } from 'src/app/pages/details/services/details-error-handler.service';
import { DetailsService } from 'src/app/pages/details/services/details.service';
import * as DetailsActions from '../actions/details.actions';
import { selectBoardId } from '../selectors/details.selectors';

@Injectable()
export class DetailsEffects {
  constructor(
    private actions$: Actions,
    private detailsService: DetailsService,
    private store: Store,
    private errorService: DetailsErrorHandlerService,
  ) {}

  loadCurrentBoard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        DetailsActions.loadBoard,
        DetailsActions.deleteColumnSuccess,
        DetailsActions.updateColumnSuccess,
        DetailsActions.createTaskSuccess,
        DetailsActions.deleteTaskSuccess,
        DetailsActions.updateTaskSuccess,
        DetailsActions.deleteColumnFailure,
        DetailsActions.updateColumnFailure,
        DetailsActions.createTaskFailure,
        DetailsActions.deleteTaskFailure,
        DetailsActions.updateTaskFailure,
      ),
      switchMap(({ id }) =>
        this.detailsService.getBoardById(id).pipe(
          tap((board: BoardResModel) => {
            board.columns.sort((a, b) => a.order - b.order);
            board.columns.forEach((col) => {
              col.tasks.sort((a, b) => a.order - b.order);
            });
          }),
          map((board) => DetailsActions.loadBoardSuccess({ board })),
          catchError((err) => {
            this.errorService.handleError(err);
            return of(DetailsActions.loadBoardFailure());
          }),
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
          catchError((err) => {
            this.errorService.handleError(err);
            if (this.errorService.isKnownMessageType(err)) {
              return of(DetailsActions.createColumnFailure());
            }
            return EMPTY;
          }),
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
          catchError((err) => {
            this.errorService.handleError(err);
            if (this.errorService.isKnownMessageType(err)) {
              return of(DetailsActions.deleteColumnFailure({ id: boardId }));
            }
            return EMPTY;
          }),
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
          catchError((err) => {
            this.errorService.handleError(err);
            if (this.errorService.isKnownMessageType(err)) {
              return of(DetailsActions.updateColumnFailure({ id: boardId }));
            }
            return EMPTY;
          }),
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
          catchError((err) => {
            this.errorService.handleError(err);
            if (this.errorService.isKnownMessageType(err)) {
              return of(DetailsActions.createTaskFailure({ id: boardId }));
            }
            return EMPTY;
          }),
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
          catchError((err) => {
            this.errorService.handleError(err);
            if (this.errorService.isKnownMessageType(err)) {
              return of(DetailsActions.deleteTaskFailure({ id: boardId }));
            }
            return EMPTY;
          }),
        ),
      ),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DetailsActions.updateTask),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([{ columnId, taskId, body }, boardId]) =>
        this.detailsService.updateTask(boardId, columnId, taskId, body).pipe(
          map(() => DetailsActions.updateTaskSuccess({ id: boardId })),
          catchError((err) => {
            this.errorService.handleError(err);
            if (this.errorService.isKnownMessageType(err)) {
              return of(DetailsActions.updateTaskFailure({ id: boardId }));
            }
            return EMPTY;
          }),
        ),
      ),
    );
  });
}
