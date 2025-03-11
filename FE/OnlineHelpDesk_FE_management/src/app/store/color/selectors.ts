import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ColorState } from './state';

export const selectColorState = createFeatureSelector<ColorState>('color');

export const selectColorId = createSelector(
  selectColorState,
  (state: ColorState) => state.id
);

export const selectColorName = createSelector(
  selectColorState,
  (state: ColorState) => state.name
);

export const selectColorPerson = createSelector(
  selectColorState,
  (state: ColorState) => state.person
);
