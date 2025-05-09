import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { errorAlert, successAlert } from '../../core/utils/alert.util';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    Toast,
    InputTextModule,
    MessageModule,
    FileUploadModule,
    AvatarModule,
    Toast,
    ConfirmDialog,
    DialogModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ProfileComponent implements OnInit {
  updateMemberForm: FormGroup;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;

  avatarUrl: string | null = 'https://via.placeholder.com/100';
  userId: number;
  loadingUpdate: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.updateMemberForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Address: ['', Validators.required],
      Image: ['']
    });
  }

  ngOnInit() {
    // Lấy thông tin từ localStorage
    const authDataString = localStorage.getItem('auth');

    // Kiểm tra nếu có dữ liệu và sau đó chuyển sang JSON
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      console.log(authData); // Kiểm tra dữ liệu auth

      // Kiểm tra nếu có dữ liệu 'user' và lấy 'id' từ 'user'
      if (authData.user && authData.user.id) {
        this.userId = authData.user.id;

        console.log('User ID:', this.userId); // In ra userId
      }
    }
    // Lấy thông tin tài khoản từ Store hoặc API
    this.authService.getMemnerById(this.userId).then(member => {
      const User = member.data;
      if (member) {
        this.avatarUrl = User.Account.ImageUrl || null; // Cập nhật avatar

        // 🔥 Cập nhật dữ liệu vào form
        this.updateMemberForm.patchValue({
          FullName: User.Account.FullName,
          Phone: User.Account.Phone,
          Address: User.Account.Address,
          Image: User.Account.ImageUrl // Giữ ảnh nếu có
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

  updateMember(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Confirm to update',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Update',
        severity: 'success',
      },
      accept: () => {
        if (this.updateMemberForm.valid) {
          this.loadingUpdate = true;
          this.authService.updateMember(this.userId!, this.updateMemberForm.value)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => console.error('Lỗi khi cập nhật member:', error))
            .finally(() => this.loadingUpdate = false);
        } else {
          console.log('Form update Invalid');
          this.updateMemberForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }
}