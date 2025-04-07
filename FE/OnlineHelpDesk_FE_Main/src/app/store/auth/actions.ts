import { createAction, props } from '@ngrx/store';

export const setAuthToken = createAction(
  '[Auth] Set Auth Token',
  props<{ token: string; user: any }>()
);

export const clearAuthToken = createAction(
  '[Auth] Clear Auth Token'
);
