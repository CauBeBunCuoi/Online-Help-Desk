import { createReducer, on } from '@ngrx/store';
import { clearColor, setColor } from './actions';
import { initialState } from './state';



export const colorReducer = createReducer(
  initialState,
  on(setColor, (state, { id, name }) => ({
    ...state,
    id: id,
    name: name
  })),
  on(clearColor, state => ({
    ...state,
    id: null,
    name: null
  }))
);
