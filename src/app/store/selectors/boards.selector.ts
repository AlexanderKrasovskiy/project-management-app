import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from '../reducers/boards.reducer';

export const selectBoardsStore = createFeatureSelector<BoardsState>('boards');
export const selectCurrentBoards = createSelector(
  selectBoardsStore,
  (state) => state.boards,
);
