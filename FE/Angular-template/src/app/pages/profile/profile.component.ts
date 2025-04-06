import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    FileUploadModule,
    AvatarModule,
    DialogModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  updateMemberForm: FormGroup;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;

  avatarUrl: string | null = 'https://via.placeholder.com/100';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.updateMemberForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Address: ['', Validators.required],
      Image: ['']
    });
  }

  ngOnInit() {
    // Lấy thông tin tài khoản từ Store hoặc API
    this.authService.getMemnerById(1).then(member => {
      if (member) {
        this.avatarUrl = member.Account.ImageUrl || null; // Cập nhật avatar

        // 🔥 Cập nhật dữ liệu vào form
        this.updateMemberForm.patchValue({
          FullName: member.Account.FullName,
          Phone: member.Account.Phone,
          Address: member.Account.Address,
          Image: member.Account.ImageUrl // Giữ ảnh nếu có
        });
      }
    }).catch(error => {
      console.error('Error fetching staff:', error);
    });
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
        this.updateMemberForm.patchValue({ Image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  updateMember() {
    if (this.updateMemberForm.valid) {
      console.log('Updated Data:', this.updateMemberForm.value);
    } else {
      this.updateMemberForm.markAllAsTouched();
    }
  }
}