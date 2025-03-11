import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { response_with_mess, MessResponse } from '../../api/main/responseGenerator';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // ✅ Xử lý đăng nhập
  async onLogin() {
    this.errorMessage = ''; // Xóa lỗi cũ trước khi đăng nhập
  
    if (this.loginForm.invalid) {
      this.errorMessage = 'Vui lòng nhập email và mật khẩu!';
      return;
    }
  
    try {
      const response: MessResponse = await this.authService.login(this.loginForm.value);
  
      if (response.success) {
        // ✅ Lưu token và chuyển hướng sau khi hoàn tất
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 500); // Đợi một chút để đảm bảo dữ liệu được lưu
  
        alert('Đăng nhập thành công!');
      } else {
        this.errorMessage = response.message.content; // Hiển thị lỗi API trả về
      }
    } catch (error) {
      this.errorMessage = 'Đăng nhập thất bại! Kiểm tra lại thông tin đăng nhập.';
    }
  }
}
