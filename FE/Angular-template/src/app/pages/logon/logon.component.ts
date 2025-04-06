import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { AccountService } from '../../core/service/accounts.service';
import { AuthState } from '../../store/auth/state';
import { selectAuthState } from '../../store/auth/selectors';
import { callApi } from '../../api/main/api_call/api';
import { publicApi } from '../../api/instance/axiosInstance';
import { JwtUtil } from '../../core/utils/jwt.util';
import { errorAlert, successAlert } from '../../core/utils/alert.util';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    ToastModule,
    MessageModule
  ],
  providers: [MessageService],
  templateUrl: './logon.component.html',
  styleUrl: './logon.component.scss'
})
export class LogonComponent implements OnInit {
  auth_subscription: any;

  loginForm: FormGroup;

  email: string;
  password: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;

  constructor(
    private accountService: AccountService,
    private store: Store<AuthState>,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    this.auth_subscription = this.store.select(selectAuthState).subscribe((auth) => {

      const token = auth.token;
      const user = auth.user;

      if (token && user && JwtUtil.isTokenValid(token)) {
        this.router.navigate(['/home']);
      }

    });
  }

  async login() {
    // ** Validate input + call api login *
    if (this.loginForm.invalid) {
      return;
    }
    const Data = {
      login: {
        Email: this.email,
        Password: this.password
      }
    };
    const res = await callApi({
      instance: publicApi,
      method: 'post',
      url: '/User/auth/login',
      data: Data
    })
    if (res.success) {
      successAlert(res.message.content ? res.message.content : 'Login success');
      const user = jwtDecode(res.data.Token);
      this.accountService.save_login(res.data.Token, {
        ...user
      });
    } else {
      errorAlert(res.message.content ? res.message.content : 'Login failed');
    }
  }

}
