import { createAction, props } from '@ngrx/store';
import {
  BoardResModel,
  ColumnModel,
  CreateTaskPayload,
  UpdateColumnPayload,
  UpdateTaskPayload,
} from 'src/app/details/models/details-api.model';

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
  props<{ id: string }>(),
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
  props<{ id: string }>(),
);

export const createTask = createAction(
  '[Details Page] Create Task',
  props<{ columnId: string; body: CreateTaskPayload }>(),
);
export const createTaskSuccess = createAction(
  '[Details Service] Create Task Success',
  props<{ id: string }>(),
);
export const createTaskFailure = createAction(
  '[Details Service] Create Task Failure',
  props<{ id: string }>(),
);

export const deleteTask = createAction(
  '[Details Page] Delete Task',
  props<{ columnId: string; taskId: string }>(),
);
export const deleteTaskSuccess = createAction(
  '[Details Service] Delete Task Success',
  props<{ id: string }>(),
);
export const deleteTaskFailure = createAction(
  '[Details Service] Delete Task Failure',
  props<{ id: string }>(),
);

export const updateTask = createAction(
  '[Details Page] Update Task',
  props<{ columnId: string; taskId: string; body: UpdateTaskPayload }>(),
);
export const updateTaskSuccess = createAction(
  '[Details Service] Update Task Success',
  props<{ id: string }>(),
);
export const updateTaskFailure = createAction(
  '[Details Service] Update Task Failure',
  props<{ id: string }>(),
);
