import { createAction, props } from '@ngrx/store';

// Đăng ký
export const register = createAction(
    '[Account] Register',
    props<{ user: any }>()
);
export const registerSuccess = createAction(
    '[Account] Register Success',
    props<{ user: any }>()
);
export const registerFailure = createAction(
    '[Account] Register Failure',
    props<{ error: string }>()
);

// Đăng nhập
export const login = createAction(
    '[Account] Login',
    props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
    '[Account] Login Success',
    props<{ token: string; user: any }>()
);
export const loginFailure = createAction(
    '[Account] Login Failure',
    props<{ error: string }>()
);

// Lấy thông tin tài khoản theo ID
export const getAccountById = createAction(
    '[Account] Get By ID',
    props<{ id: string }>()
);
export const getAccountByIdSuccess = createAction(
    '[Account] Get By ID Success',
    props<{ user: any }>()
);
export const getAccountByIdFailure = createAction(
    '[Account] Get By ID Failure',
    props<{ error: string }>()
);
