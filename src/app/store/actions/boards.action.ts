import { createAction, props } from '@ngrx/store';
import {
  BoardIDRequestModel,
  BoardRequestModel,
} from 'src/app/pages/main/models/main.model';

export const loadBoards = createAction(`[Board] Load Boards`);

export const loadBoardsSuccess = createAction(
  '[Board] Boards Load Success',
  props<{ boards: BoardIDRequestModel[] }>(),
);

export const loadBoardsFailure = createAction(
  '[Board] Boards Load Failure',
  props<{ error: string }>(),
);

export const createBoard = createAction(
  '[Board] Create Board',
  props<{ newBoard: BoardRequestModel }>(),
);

export const createBoardSuccess = createAction(
  '[Board] Create Board Success',
  props<{ newBoard: BoardIDRequestModel }>(),
);

export const createBoardFailure = createAction(
  '[Board] Create Board Failure',
  props<{ error: string }>(),
);

export const updateBoard = createAction(
  '[Board] Update Board',
  props<{ id: string; newBoard: BoardRequestModel }>(),
);

export const updateBoardSuccess = createAction(
  '[Board] Update Board Success',
  props<{ newBoard: BoardIDRequestModel }>(),
);

export const updateBoardFailure = createAction(
  '[Board] Update Board Failure',
  props<{ error: string }>(),
);

export const deleteBoard = createAction(
  '[Board] Delete Board',
  props<{ id: string }>(),
);

export const deleteBoardSuccess = createAction(
  '[Board] Delete Board Success',
  props<{ id: string }>(),
);

export const deleteBoardFailure = createAction(
  '[Board] Create Board Failure',
  props<{ error: string }>(),
);
