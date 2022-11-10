import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DetailsBoardState } from '../reducers/details.reducer';

const selectCurrentBoard =
  createFeatureSelector<DetailsBoardState>('currentBoard');

export const selectBoardTitle = createSelector(
  selectCurrentBoard,
  (board) => board.title,
);

export const selectColumns = createSelector(
  selectCurrentBoard,
  (board) => board.columns,
);

export const selectBoardId = createSelector(
  selectCurrentBoard,
  (board) => board.id,
);
