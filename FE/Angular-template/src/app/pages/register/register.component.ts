import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { response_with_mess, MessResponse } from '../../api/main/responseGenerator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]]
    });
  }

  // ✅ Xử lý đăng ký tài khoản
  async save() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registerForm.value.name);
    formData.append('email', this.registerForm.value.email);
    formData.append('phone', this.registerForm.value.phone);
    formData.append('password', this.registerForm.value.password);

    try {
      const response: MessResponse = await this.authService.register(formData);

      if (response.success) {
        alert('Đăng ký thành công! Chuyển đến trang đăng nhập...');
        this.router.navigate(['/login']); // Chuyển hướng sau khi đăng ký thành công
      } else {
        this.errorMessage = response.message.content; // Hiển thị lỗi từ API
      }
    } catch (error) {
      this.errorMessage = 'Đăng ký thất bại! Vui lòng thử lại.';
    }
  }
}
