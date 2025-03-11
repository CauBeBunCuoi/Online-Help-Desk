import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MessResponse } from '../../api/main/responseGenerator';

import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  updateForm!: FormGroup;
  userId!: string;
  successMessage = '';
  errorMessage = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.email = localStorage.getItem('email') || '';

    this.updateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]]
    });

    await this.loadUserProfile();
  }

  // ✅ Lấy thông tin người dùng từ API
  async loadUserProfile() {
    try {
      const response: MessResponse = await this.authService.findByEmail(this.email);
      if (response.success) {
        this.updateForm.patchValue(response.data);
      } else {
        this.errorMessage = response.message.content;
      }
    } catch (error) {
      this.errorMessage = "Lỗi khi tải thông tin tài khoản.";
    }
  }

  // ✅ Cập nhật thông tin tài khoản
  async updateAccount() {
    if (this.updateForm.invalid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.updateForm.get('name')?.value);
    formData.append('email', this.updateForm.get('email')?.value);
    formData.append('phone', this.updateForm.get('phone')?.value);

    try {
      const response: MessResponse = await this.authService.updateAccount(this.userId, formData);
      if (response.success) {
        this.successMessage = 'Cập nhật thành công!';
        this.errorMessage = '';
      } else {
        this.errorMessage = response.message.content;
        this.successMessage = '';
      }
    } catch (error) {
      this.errorMessage = 'Có lỗi xảy ra, thử lại sau!';
      this.successMessage = '';
    }
  }
}
