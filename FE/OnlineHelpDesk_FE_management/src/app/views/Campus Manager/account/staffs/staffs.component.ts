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
import { MajorAssignmentService } from '../../../../core/service/major-assignment.service';

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
  // goi api lấy role và job
  roleTypes = [
    { Name: 'Facility Major Head', Id: 2 },
    { Name: 'Nô lệ', Id: 3 },
  ];
  jobTypes = [
    { Name: 'Đa cấp', Id: 1 },
    { Name: 'Nô lệ', Id: 2 },
    { Name: 'Bác sĩ', Id: 3 },
    { Name: 'Công an', Id: 4 },
    { Name: 'Bảo vệ', Id: 5 },
    { Name: 'Giáo viên', Id: 6 },
    { Name: 'Học sinh', Id: 7 },
  ];
  // lấy major của nhân viên
  selectedEmployeeMajors: any[] = [];

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

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private authService: AuthService,
    private facilityMajorService: FacilityMajorService,
    private majorAssignmentService: MajorAssignmentService,
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
      FullName: ['', [Validators.required, Validators.minLength(3)]], // Họ và tên (bắt buộc, tối thiểu 3 ký tự)
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], // Số điện thoại (10-11 số)
      Address: ['', Validators.required], // Địa chỉ (bắt buộc)
      JobTypeId: [null, Validators.required], // Mã loại công việc (bắt buộc)
      DateOfBirth: [null, Validators.required], // Ngày sinh (dạng Date hoặc string ISO 8601)
      Image: [''] // Ảnh dưới dạng Base64 (không bắt buộc)
    });
  }

  ngOnInit() {
    this.authService.getAccountStaff().then((data) => {
      this.staffs = data;
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
      if (!staff || !staff.Account) {
        console.warn(`⚠️ Không tìm thấy thông tin nhân viên với ID: ${id}`);
        return;
      }

      // ✅ Xử lý ngày sinh (convert string -> Date)
      const formattedDateOfBirth = staff.Account.DateOfBirth
        ? new Date(staff.Account.DateOfBirth).toISOString().split('T')[0]
        : null;

      // ✅ Cập nhật ảnh hiển thị
      this.avatarUrl = staff.Account.ImageUrl || null;

      // ✅ Cập nhật dữ liệu vào form
      this.updateStaffForm.patchValue({
        FullName: staff.Account.FullName || '',
        Phone: staff.Account.Phone || '',
        Address: staff.Account.Address || '',
        JobTypeId: staff.Account.JobTypeId || null, // Định danh loại công việc
        DateOfBirth: formattedDateOfBirth, // Chuyển đổi ngày sinh sang định dạng phù hợp
        Image: staff.Account.ImageUrl || '' // Lưu lại ảnh nếu có
      });
    }).catch(error => {
      console.error('❌ Lỗi khi lấy thông tin nhân viên:', error);
    });

    this.majorAssignmentService.getMajorAssignmentsByStaff(id).then(assignments => {
      this.selectedEmployeeMajors = assignments.map(a => a.Major);
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
    Promise.all([
      this.majorAssignmentService.getMajorAssignmentsByStaff(id),
      this.facilityMajorService.getFacilityMajors()
    ]).then(([assignments, allMajors]) => {
      this.selectedEmployeeMajors = assignments.map(a => a.Major);

      // ✅ Lọc ra những major chưa được phân công
      this.facilityMajors = allMajors.filter(major =>
        !this.selectedEmployeeMajors.some(assigned => assigned.Id === major.Major.Id)
      );
    });
  }

  hideDialogFacilityMajorTable() {
    this.facilityMajorTable = false;
    this.selectedAccountId = null;
    this.selectedFacilityMajors = []; // 🔥 Reset danh sách đã chọn
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
