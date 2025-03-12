import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { AccountService } from '../../../core/service/accounts.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/state';
import { Router, RouterModule } from '@angular/router';
import { selectAuthState } from '../../../store/auth/selectors';
import { JwtUtil } from '../../../core/utils/jwt.util';
import { callApi } from '../../../api/main/api_call/api';
import { publicApi } from '../../../api/instance/axiosInstance';
import { errorAlert, successAlert } from '../../../core/utils/alert.util';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {
  auth_subscription: any;

  email: string;
  password: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;

  constructor(
    private accountService: AccountService,
    private store: Store<AuthState>,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.auth_subscription = this.store.select(selectAuthState).subscribe((auth) => {

      const token = auth.token;
      const user = auth.user;

      if (token && user && JwtUtil.isTokenValid(token)) {
        if (user.role_id == 1) {
          this.router.navigate([environment.ROLES.CAMPUS_MANAGER.BASE_URL]);
        } else if (user.role_id == 2) {
          this.router.navigate([environment.ROLES.FACILITY_MAJOR_HEAD.BASE_URL]);
        } else if (user.role_id == 3) {
          this.router.navigate([environment.ROLES.ASSIGNEE.BASE_URL]);
        }
      }

    });
  }
  ngOnDestroy() {
    this.auth_subscription.unsubscribe();
  }
  validateRegister() {
    var isValid = true;
    if (!this.email || !validateEmail(this.email)) {
      this.emailErrorMessage = "Email is invalid";
      isValid = false;
    } else {
      this.emailErrorMessage = "";
    }
    if (!this.password) {
      this.passwordErrorMessage = "Password is required";
      isValid = false;
    } else {
      this.passwordErrorMessage = "";
    }

    return isValid;
  }

  async login() {
    //** Validate input + call api login */
    // if (!this.validateRegister()) {
    //   return;
    // }
    // const loginInfo = {
    //   email: this.email,
    //   password: this.password
    // };


    // const res = await callApi({
    //   instance: publicApi,
    //   method: 'post',
    //   url: '/Account/login',
    //   data: loginInfo
    // })

    //** test */
    const res = {
      success: true,
      data: {
        token : "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6IjEiLCJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpZCI6IjIiLCJwaG9uZSI6IjEiLCJiYWxhbmNlIjoiMTIzMTMxMjMuMDAiLCJqdGkiOiJlM2I4NzNhNS1hZjNjLTRhYzEtYmQ2NC1hY2RkYWYwN2ZlZjAiLCJleHAiOjE3NDQzNjk3NTksImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.Te6CQXvwdrd0TILEJTyaK9Bh5be2BM-FMY0DMST_9lokiT1kqpXdM3L-a6LyJXTVyxqlEq6O3W7NGja-k40JTtQ4dESg5Z1s9uj5INACGXe7BFlBuSKuiAV-YHbtXWbHVHJmIPItjwtomkK9D10cvI4irYt6pW9-IsidRKM_SSwg_Ankvk9o4EpTLREKV0EvfryMyifubV2u-JNAT60UaD4TYiYVobZP_6ggJY6cp9ZI3DGAdqPEHsS1HTUEzkGU9rWi8NxtxCcvwWU1xzMXRC2mMxe2WGMANx3_lCzUchAD5LGk_J2N5-C9H6vS7EQRfBx46e1-8RCXX9mrf0BbFg",
        user : {
          "sub": "2",
          "name": "1",
          "email": "123@gmail.com",
          "id": "2",
          "phone": "1",
          "balance": "12313123.00",
          "jti": "e3b873a5-af3c-4ac1-bd64-acddaf07fef0",
          "exp": 1744369759,
          "iss": "localhost",
          "aud": "localhost",
          "role_id": 2
        }
      },
      message: {
        content: "Login success"
      }
    }


    if (res.success) {
      successAlert(res.message.content ? res.message.content : 'Login success');
      const user = jwtDecode(res.data.token);
      const role_id = 2;

      this.accountService.save_login(res.data.token, {
        ...user,
        role_id
      });

      

    } else {
      errorAlert(res.message.content ? res.message.content : 'Login failed');
    }

  }
}
