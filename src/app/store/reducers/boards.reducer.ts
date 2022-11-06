import { createReducer, on } from '@ngrx/store';
import { BoardIDRequestModel } from 'src/app/main/models/main.model';
import {
  createBoardSuccess,
  deleteBoardSuccess,
  loadBoards,
  loadBoardsSuccess,
} from '../actions/boards.action';

export const initialBoardsState: BoardsState = { boards: [] };

export type BoardsState = { boards: BoardIDRequestModel[] | [] };

export const allBoardsReducer = createReducer(
  initialBoardsState,
  on(loadBoards, (state): BoardsState => ({ ...state })),
  on(
    loadBoardsSuccess,
    (state, { boards }): BoardsState => ({
      ...state,
      boards,
    }),
  ),
  on(
    createBoardSuccess,
    (state, boards): BoardsState => ({
      boards: [...state.boards, boards],
    }),
  ),
  on(
    deleteBoardSuccess,
    (state, { id }): BoardsState => ({
      ...state,
      boards: state.boards.filter((board) => board.id !== id),
    }),
  ),
);
