import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
