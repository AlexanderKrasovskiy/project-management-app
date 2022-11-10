import { createReducer, on } from '@ngrx/store';
import { ColumnModel } from 'src/app/pages/details/models/details.model';
import * as DetailsActions from '../actions/details.actions';

export interface DetailsBoardState {
  id: string;
  title: string;
  description: string;
  columns: ColumnModel[];
}

const initialState: DetailsBoardState = {
  id: '',
  title: '',
  description: '',
  columns: [],
};

export const currentBoardReducer = createReducer(
  initialState,
  on(
    DetailsActions.loadBoardSuccess,
    (_, { board: { id, title, description, columns } }): DetailsBoardState => {
      return { id, title, description, columns };
    },
  ),
  on(
    DetailsActions.loadBoardFailure,
    (): DetailsBoardState => ({
      ...initialState,
    }),
  ),
  on(
    DetailsActions.createColumnSuccess,
    (state, { column }): DetailsBoardState => ({
      ...state,
      columns: [...state.columns, column],
    }),
  ),
);
