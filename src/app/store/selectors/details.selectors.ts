import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DetailsBoardState } from '../reducers/details.reducer';
// import { AppState } from "../state.model";

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
