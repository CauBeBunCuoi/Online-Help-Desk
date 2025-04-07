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
import { publicApi } from '../../api/instance/axiosInstance';
import { JwtUtil } from '../../core/utils/jwt.util';
import { errorAlert, successAlert } from '../../core/utils/alert.util';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { callApi } from '../../api/main/api_call/api';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    // RouterLink,
    ToastModule,
    MessageModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
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
    // Kiểm tra form
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Đánh dấu tất cả field để hiển thị lỗi
      return;
    }

    // Lấy dữ liệu từ form
    const data = {
      login: this.loginForm.value
    };

    try {
      const res = await callApi({
        instance: publicApi,
        method: 'post',
        url: '/User/auth/login',
        data
      });

      if (res.success) {
        successAlert(res.message?.content || 'Đăng nhập thành công!');

        const user = jwtDecode(res.data.Token); // Giải mã token lấy thông tin user

        // Lưu thông tin đăng nhập
        this.accountService.save_login(res.data.Token, { ...user });

        // Optional: điều hướng sang trang chủ hoặc dashboard
        this.router.navigate(['/home']);
      } else {
        errorAlert(res.message?.content || 'Đăng nhập thất bại!');
      }

    } catch (error) {
      console.error('❌ Lỗi khi đăng nhập:', error);
      errorAlert('Có lỗi xảy ra khi đăng nhập!');
    }
  }


}
