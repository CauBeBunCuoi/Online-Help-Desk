import { createReducer, on } from '@ngrx/store';
import { clearAuthToken, setAuthToken } from './actions';
import { initialState } from './state';



export const authReducer = createReducer(
  initialState,
  on(setAuthToken, (state, { token, user }) => ({
    ...state,
    token: token,
    user: user
  })),
  on(clearAuthToken, state => {
    return {
      ...state,
      token: null,
      user: null
    }
  }
  )
);
