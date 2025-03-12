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
    if (!this.validateRegister()) {
      return;
    }
    const loginInfo = {
      email: this.email,
      password: this.password
    };


    const res = await callApi({
      instance: publicApi,
      method: 'post',
      url: '/Account/login',
      data: loginInfo
    })
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
