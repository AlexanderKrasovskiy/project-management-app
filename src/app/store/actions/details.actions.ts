import { createAction, props } from '@ngrx/store';
import { BoardResModel } from 'src/app/pages/details/models/details.model';

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
