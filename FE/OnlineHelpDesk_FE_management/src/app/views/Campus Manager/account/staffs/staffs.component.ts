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
  staffs!: any[];
  roleTypes = [
    { label: 'Facility Major Head', value: 2 },
    { label: 'Nô lệ', value: 3 },
  ];
  jobTypes = [
    { label: 'Đa cấp', value: 1 },
    { label: 'Nô lệ', value: 2 },
    { label: 'Bác sĩ', value: 3 },
    { label: 'Công an', value: 4 },
    { label: 'Bảo vệ', value: 5 },
    { label: 'Giáo viên', value: 6 },
    { label: 'Học sinh', value: 7 },
  ];

  selectedAccountId: number | null = null;

  facilityMajors: any[] = [];
  selectedFacilityMajors: any[] = []; // Lưu FacilityMajor được chọn

  addStaffForm: FormGroup;
  updateStaffForm: FormGroup;
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
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      JobTypeId: [null, Validators.required], // Chuyển thành `null` thay vì chuỗi rỗng
      RoleId: [null, Validators.required],
      Address: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Image: [''] // Avatar dưới dạng Base64
    });
    this.updateStaffForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Address: ['', Validators.required],
      Image: [''] // Ảnh dưới dạng Base64
    });

  }

  ngOnInit() {
    this.authService.getAccountStaff().then((data) => {
      this.staffs = data;
    });
    this.facilityMajorService.getFacilityMajors().then(data => {
      this.facilityMajors = data;
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
    this.addStaffForm.get('RoleId')?.enable(); // 🔥 Bật lại RoleId để chọn
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog

    this.authService.findById(id).then(staff => {
      if (staff) {
        this.avatarUrl = staff.Account.ImageUrl || null; // Cập nhật avatar

        // 🔥 Cập nhật dữ liệu vào form
        this.updateStaffForm.patchValue({
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
        this.addStaffForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
        this.updateStaffForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
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
    if (this.updateStaffForm.valid) {
      console.log('Form update Data:', this.updateStaffForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.updateStaffForm.markAllAsTouched();
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
    formData.append('workDescription', this.workDescription); // Thêm mô tả công việc

    this.selectedFacilityMajors.forEach(fm => {
      formData.append('facilityMajorsId', fm.Major.Id.toString());
    });

    console.log('FormData Values:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log('FacilityMajors ID:', formData.getAll('facilityMajorsId'));

  }

}
