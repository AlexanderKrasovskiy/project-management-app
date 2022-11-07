import { createReducer, on } from '@ngrx/store';
import { BoardIDRequestModel } from 'src/app/main/models/main.model';
import {
  createBoardSuccess,
  deleteBoardSuccess,
  loadBoards,
  loadBoardsSuccess,
  updateBoardSuccess,
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
    (state, { newBoard }): BoardsState => ({
      boards: [...state.boards, newBoard],
    }),
  ),
  on(
    deleteBoardSuccess,
    (state, { id }): BoardsState => ({
      ...state,
      boards: state.boards.filter((board) => board.id !== id),
    }),
  ),
  on(
    updateBoardSuccess,
    (state, { newBoard }): BoardsState => ({
      ...state,
      boards: state.boards.map((board) =>
        board.id === newBoard.id ? newBoard : board,
      ),
    }),
  ),
);
