import { localStorageSync } from 'ngrx-store-localstorage';
import { MetaReducer } from '@ngrx/store';
import { AppState } from './rootReducers';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['account'],
    rehydrate: true
  })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];