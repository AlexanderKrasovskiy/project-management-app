import { createAction, props } from '@ngrx/store';
import {
  BoardResModel,
  ColumnModel,
} from 'src/app/pages/details/models/details.model';

export const loadBoard = createAction(
  '[Details Page] Load Board',
  props<{ id: string }>(),
);
export const loadBoardSuccess = createAction(
  '[Details Service] Load Board Success',
  props<{ board: BoardResModel }>(),
);
export const loadBoardFailure = createAction(
  '[Details Service] Load Board Failure',
);

export const createColumn = createAction(
  '[Details Page] Create Column',
  props<{ boardId: string; title: string }>(),
);
export const createColumnSuccess = createAction(
  '[Details Page] Create Column Success',
  props<{ column: ColumnModel }>(),
);
export const createColumnFailure = createAction(
  '[Details Page] Create Column Failure',
);
