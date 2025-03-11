import { createReducer, on } from '@ngrx/store';
import * as AccountActions from './account.actions';
import { initialState } from './account.state';

export const accountReducer = createReducer(
    initialState,
    on(AccountActions.register, AccountActions.login, AccountActions.getAccountById, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(AccountActions.registerSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
    })),
    on(AccountActions.loginSuccess, (state, { token, user }) => ({
        ...state,
        token,
        user,
        loading: false,
    })),
    on(AccountActions.getAccountByIdSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
    })),
    on(AccountActions.registerFailure, AccountActions.loginFailure, AccountActions.getAccountByIdFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false,
    }))
);
