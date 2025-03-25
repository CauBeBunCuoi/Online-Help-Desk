import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../../../core/service/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
@Component({
  selector: 'app-campus-members',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    Dialog,
    InputTextModule,
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    HttpClientModule,
    FileUploadModule,
  ],
  templateUrl: './campus-members.component.html',
  styleUrl: './campus-members.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class CampusMembersComponent {
  accounts!: any[];

  addMemberForm: FormGroup;
  add: boolean = false;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;
  avatarUrl: string | null = null;

  update: boolean = false;
  selectedAccountId: number | null = null; // Lưu ID của tài khoản được chọn

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addMemberForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      dateOfBirth: ['', Validators.required],
      avatar: [''], // Thêm ảnh dưới dạng Base64,
      roleId: 4,
    });
  }

  ngOnInit() {
    this.authService.getAccounts().then((data) => {
      this.accounts = data;
    });
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  showDialogAdd() {
    this.add = true;
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    this.selectedAccountId = id; // Lưu ID của tài khoản được chọn

    // 🔥 Gọi API lấy thông tin tài khoản
    this.authService.findById(id).then(account => {
      if (account) {
        const formattedDate = account.dateOfBirth
          ? new Date(account.dateOfBirth).toISOString().split('T')[0] // Chuyển sang YYYY-MM-DD
          : null;

        this.addMemberForm.patchValue({
          fullName: account.fullName,
          email: account.email,
          address: account.address,
          phone: account.phone,
          password: account.password,
          dateOfBirth: formattedDate, // Gán ngày đã chuyển đổi
          avatar: account.logo || null
        });

        this.avatarUrl = account.logo || null; // Cập nhật ảnh đại diện
      }
    });
  }


  hideDialogAdd() {
    this.addMemberForm.reset();
    this.avatarUrl = null; // X
    // 🔥 Reset PrimeNG FileUpload
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear(); // Reset fileUpload về trạng thái ban đầu
      }
    }, 100);
    this.add = false;
  }

  hideDialogUpdate() {
    this.addMemberForm.reset();
    this.avatarUrl = null; // X
    // 🔥 Reset PrimeNG FileUpload
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear(); // Reset fileUpload về trạng thái ban đầu
      }
    }, 100);
    this.update = false;
  }

  onFileSelect(event: any) {
    const file = event.files[0]; // Lấy file đầu tiên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result; // Hiển thị ảnh trước
        this.addMemberForm.patchValue({ avatar: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  registerMember() {
    if (this.addMemberForm.valid) {
      console.log('Form Data:', this.addMemberForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addMemberForm.markAllAsTouched();
    }
  }

  updateMember() {
    if (this.addMemberForm.valid) {
      console.log('Form update Data:', this.addMemberForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.addMemberForm.markAllAsTouched();
    }
  }
}
