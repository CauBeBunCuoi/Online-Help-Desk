import { Action, ActionReducer, ActionReducerMap, combineReducers, MetaReducer } from '@ngrx/store';
// import { AuthState } from './auth/state';
// import { authReducer } from './auth/reducer';
// import { ColorState } from './color/state';
// import { colorReducer } from './color/reducer';
import { accountReducer } from './accounts/account.reducer';
import { AccountState } from './accounts/account.state';

export interface AppState {
  // auth: AuthState, 
  // color: ColorState,
  account: AccountState,
}

export const rootReducers: ActionReducerMap<AppState> = {
  //   auth: authReducer,
  //   color: colorReducer,
  account: accountReducer,
};