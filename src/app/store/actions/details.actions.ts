import { createAction, props } from '@ngrx/store';
import {
  BoardResModel,
  ColumnModel,
  UpdateColumnPayload,
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
  props<{ title: string }>(),
);
export const createColumnSuccess = createAction(
  '[Details Service] Create Column Success',
  props<{ column: ColumnModel }>(),
);
export const createColumnFailure = createAction(
  '[Details Service] Create Column Failure',
);

export const deleteColumn = createAction(
  '[Details Page] Delete Column',
  props<{ columnId: string }>(),
);
export const deleteColumnSuccess = createAction(
  '[Details Service] Delete Column Success',
  props<{ id: string }>(),
);
export const deleteColumnFailure = createAction(
  '[Details Service] Delete Column Failure',
);

export const updateColumn = createAction(
  '[Details Page] Update Column',
  props<{ columnId: string; body: UpdateColumnPayload }>(),
);
export const updateColumnSuccess = createAction(
  '[Details Service] Update Column Success',
  props<{ id: string }>(),
);
export const updateColumnFailure = createAction(
  '[Details Service] Update Column Failure',
);
