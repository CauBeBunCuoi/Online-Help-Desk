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
  members!: any[];

  jobTypes = [
    { label: 'Đa cấp', value: 1 },
    { label: 'Nô lệ', value: 2 },
    { label: 'Bác sĩ', value: 3 },
    { label: 'Công an', value: 4 },
    { label: 'Bảo vệ', value: 5 },
    { label: 'Giáo viên', value: 6 },
    { label: 'Học sinh', value: 7 },
  ];

  addMemberForm: FormGroup;
  updateMemberForm: FormGroup;
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
      FullName: ['', [Validators.required, Validators.minLength(3)]], // Họ và tên (bắt buộc, tối thiểu 3 ký tự)
      Email: ['', [Validators.required, Validators.email]], // Email (bắt buộc, đúng định dạng)
      Password: ['', [Validators.required, Validators.minLength(6)]], // Mật khẩu (bắt buộc, tối thiểu 6 ký tự)
      JobTypeId: [null, Validators.required], // Nghề nghiệp (bắt buộc)
      Address: ['', Validators.required], // Địa chỉ (bắt buộc)
      DateOfBirth: ['', Validators.required], // Ngày sinh (bắt buộc)
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], // Số điện thoại (10-11 số)
      Image: [''] // Avatar (Base64)
    });
    this.updateMemberForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Address: ['', Validators.required],
      Image: [''] // Ảnh dưới dạng Base64
    });

  }

  ngOnInit() {
    this.authService.getAccountMember().then((data) => {
      this.members = data;
    });
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  confirmDelete(event: Event, id: number) {
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

    this.authService.findById(id).then(staff => {
      if (staff) {
        this.avatarUrl = staff.Account.ImageUrl || null; // Cập nhật avatar

        // 🔥 Cập nhật dữ liệu vào form
        this.updateMemberForm.patchValue({
          FullName: staff.Account.FullName,
          Phone: staff.Account.Phone,
          Address: staff.Account.Address,
          Image: staff.Account.ImageUrl // Giữ ảnh nếu có
        });
      }
    }).catch(error => {
      console.error('Error fetching staff:', error);
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
    this.updateMemberForm.reset();
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
        this.addMemberForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
        this.updateMemberForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
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
    if (this.updateMemberForm.valid) {
      console.log('Form update Data:', this.updateMemberForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.updateMemberForm.markAllAsTouched();
    }
  }
}
