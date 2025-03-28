import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AccountActions from './account.actions';
import { catchError, map, mergeMap, of, from, switchMap } from 'rxjs';
import { MessResponse } from '../../api/main/responseGenerator';
import { loginFailureAlert, loginSuccessAlert } from '../../utils/alert.util';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  constructor() {
    console.log('🔥 AccountEffects initialized');
  }

  // Effect cho đăng nhập (sử dụng from() để chuyển đổi Promise thành Observable)
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.login),
      switchMap(({ email, password }) =>
        from(
          this.authService.login(email, password)).pipe(
          map((response: MessResponse) => {
            if (response.success) {
              loginSuccessAlert(response.message.title, response.message.content, response.message.color);
              return AccountActions.loginSuccess(
                {
                  token: response.data.access_token,
                  user: response.data.user
                }
              )
            } else if (!response.isAppError) {
              loginFailureAlert(response.message.title, response.message.content, response.message.color);
              return AccountActions.loginFailure({ error: response.message.content });
            }
            return null; // Thêm return ở đây để tránh lỗi
          })
        )
      )
    )
  );

  // Effect cho đăng ký tài khoản
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.register),
      mergeMap(({ user }) =>
        from(this.authService.register(user)).pipe(
          map((response) => AccountActions.registerSuccess({ user: response })),
          catchError((error) => of(AccountActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  // Effect lấy thông tin tài khoản theo ID
  getAccountById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.getAccountById),
      mergeMap(({ id }) =>
        from(this.authService.findByEmail(id)).pipe(
          map((user) => AccountActions.getAccountByIdSuccess({ user })),
          catchError((error) => of(AccountActions.getAccountByIdFailure({ error: error.message })))
        )
      )
    )
  );
}
