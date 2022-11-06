import { createAction, props } from '@ngrx/store';
import {
  BoardIDRequestModel,
  BoardRequestModel,
} from 'src/app/main/models/main.model';

export const loadBoards = createAction(`[Board] Load Boards`);

export const createBoard = createAction(
  '[Board] Create Board',
  props<{ boards: BoardRequestModel }>(),
);

export const createBoardSuccess = createAction(
  '[Board] Create Board Success',
  props<{ id: string; title: string; description: string }>(),
);

export const createBoardFailure = createAction(
  '[Board] Create Board Load Failure',
  props<{ error: string }>(),
);

export const loadBoardsSuccess = createAction(
  '[Board] Boards Load Success',
  props<{ boards: BoardIDRequestModel[] }>(),
);

export const loadBoardsFailure = createAction(
  '[Board] Boards Load Failure',
  props<{ error: string }>(),
);
