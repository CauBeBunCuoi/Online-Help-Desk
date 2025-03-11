import { createAction, props } from '@ngrx/store';

export const setColor = createAction(
  '[Auth] Set Color',
  props<{ id: any; name: any }>()
);

export const clearColor = createAction('[Auth] Clear Color');
