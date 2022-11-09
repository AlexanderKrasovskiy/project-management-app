import { createReducer, on } from '@ngrx/store';
import { ColumnModel } from 'src/app/pages/details/models/details.model';
import * as DetailsActions from '../actions/details.actions';

export interface DetailsBoardState {
  isLoading: boolean;
  id: string;
  title: string;
  description: string;
  columns: ColumnModel[];
}

const initialState: DetailsBoardState = {
  isLoading: false,
  id: '',
  title: '',
  description: '',
  columns: [],
};

export const currentBoardReducer = createReducer(
  initialState,
  on(
    DetailsActions.loadBoard,
    (state): DetailsBoardState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    DetailsActions.loadBoardSuccess,
    (_, { board: { id, title, description, columns } }): DetailsBoardState => {
      // const { id, title, description, columns } = board;
      return { isLoading: false, id, title, description, columns };
    },
  ),
  on(
    DetailsActions.loadBoardFailure,
    (): DetailsBoardState => ({
      ...initialState,
    }),
  ),
);
