import { Action, ActionReducer, ActionReducerMap, combineReducers, MetaReducer } from '@ngrx/store';
import { AuthState } from './auth/state';
import { authReducer } from './auth/reducer';
import { ColorState } from './color/state';
import { colorReducer } from './color/reducer';


export interface AppState {
  auth: AuthState, 
  color: ColorState
}

export const rootReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  color: colorReducer
};