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
import { SelectModule, Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';

@Component({
  selector: 'app-staffs',
  standalone: true,
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
    Select
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class StaffsComponent implements OnInit {
  accounts!: any[];
  roleTypes = [
    { label: 'Facility Major Head', value: 2 },
    { label: 'Nô lệ', value: 3 },
  ];

  selectedAccountId: number | null = null;

  facilityMajors: any[] = [];
  selectedFacilityMajors: any[] = []; // Lưu FacilityMajor được chọn

  addStaffForm: FormGroup;
  add: boolean = false;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;
  avatarUrl: string | null = null;

  // updateStaffForm: FormGroup
  update: boolean = false;

  facilityMajorTable: boolean = false;
  workDescription: string = '';

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private authService: AuthService,
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addStaffForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      dateOfBirth: ['', Validators.required],
      roleId: ['', Validators.required],
      avatar: [''] // Thêm ảnh dưới dạng Base64
    });
  }

  ngOnInit() {
    this.authService.getAccounts().then((data) => {
      this.accounts = data;
    });
    this.facilityMajorService.getFacilityMajors().then(data => {
      this.facilityMajors = data;
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
    this.addStaffForm.get('roleId')?.enable(); // 🔥 Bật lại RoleId để chọn
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog

    // 🔥 Gọi API lấy thông tin tài khoản
    this.authService.findById(id).then(account => {
      if (account) {
        const formattedDate = account.dateOfBirth
          ? new Date(account.dateOfBirth).toISOString().split('T')[0] // Chuyển sang YYYY-MM-DD
          : null;

        this.addStaffForm.patchValue({
          fullName: account.fullName,
          email: account.email,
          address: account.address,
          phone: account.phone,
          password: account.password,
          dateOfBirth: formattedDate, // Gán ngày đã chuyển đổi
          avatar: account.logo || null,
        });

        // ✅ Cập nhật RoleId đúng cách
        this.addStaffForm.get('roleId')?.setValue(account.roleId);
        this.addStaffForm.get('roleId')?.disable(); // Không cho phép chỉnh sửa

        this.avatarUrl = account.logo || null; // Cập nhật ảnh đại diện
      }
    });
  }

  hideDialogAdd() {
    this.addStaffForm.reset();
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
    this.addStaffForm.reset();
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
        this.addStaffForm.patchValue({ avatar: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  registerStaff() {
    if (this.addStaffForm.valid) {
      console.log('Form Data:', this.addStaffForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addStaffForm.markAllAsTouched();
    }
  }

  updateStaff() {
    if (this.addStaffForm.valid) {
      console.log('Form update Data:', this.addStaffForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.addStaffForm.markAllAsTouched();
    }
  }

  showDialogFacilityMajorTable(id: number) {
    this.facilityMajorTable = true;
    this.selectedAccountId = id;
  }

  hideDialogFacilityMajorTable() {
    this.facilityMajorTable = false;
    this.selectedAccountId = null;
    this.selectedFacilityMajors = []; // 🔥 Reset danh sách đã chọn
    this.workDescription = ''; // 🔥 Reset workDescription
  }

  updateFacilityMajorSelect() {
    if (!this.selectedAccountId) {
      console.warn('No account selected.');
      return;
    }

    if (this.selectedFacilityMajors.length === 0) {
      console.warn('No FacilityMajor selected.');
      return;
    }

    const formData = new FormData();
    formData.append('accountId', this.selectedAccountId.toString()); // Thêm ID người dùng
    formData.append('workDescription', this.workDescription); // Thêm mô tả công việc

    this.selectedFacilityMajors.forEach(fm => {
      formData.append('facilityMajorsId', fm.id.toString());
    });

    console.log('FormData Values:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log('FacilityMajors ID:', formData.getAll('facilityMajorsId'));

  }

}
