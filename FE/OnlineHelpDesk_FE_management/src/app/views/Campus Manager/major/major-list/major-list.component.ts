import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
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
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-major-list',
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
    CheckboxModule,
    MultiSelectModule,
    SelectModule,
    HttpClientModule,
    FileUploadModule,
  ],
  templateUrl: './major-list.component.html',
  styleUrl: './major-list.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class MajorListComponent implements OnInit {
  facilityMajors!: any[];
  facilities = [
    { label: 'Main Campus', value: 1 },
    { label: 'North Wing', value: 2 },
    { label: 'South Block', value: 3 },
    { label: 'East Hall', value: 4 },
    { label: 'West Hall', value: 5 }
  ];
  facilityMajorTypes = [
    { label: 'Engineering', value: 1 },
    { label: 'Science', value: 2 },
    { label: 'Arts', value: 3 },
    { label: 'Medicine', value: 4 },
    { label: 'Business', value: 5 }
  ];


  addFacilityMajorForm: FormGroup;
  add: boolean = false;

  @ViewChild('fileUploadLogo') fileUploadLogo!: FileUpload;
  @ViewChild('fileUploadBackground') fileUploadBackground!: FileUpload;

  logoUrl: string | null = null;
  backgroundUrl: string | null = null;

  // updateStaffForm: FormGroup;
  update: boolean = false;
  selectedFacilityMajorId: number | null = null; // Lưu ID của tài  khoản được chọn

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addFacilityMajorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Tên FacilityMajor
      mainDescription: [''], // Mô tả chính
      workShifstDescription: [''], // Mô tả ca làm việc
      isOpen: [false, Validators.required], // Mở hay đóng
      closeScheduleDate: [null], // Ngày đóng
      openScheduleDate: [null], // Ngày mở
      facilityMajorTypeId: [null, Validators.required], // Loại FacilityMajor (Số)
      facilityId: [null, Validators.required], // Facility liên kết (Số)
      logo: [''], // Thêm ảnh dưới dạng Base64
      background: [''] // Thêm ảnh dưới dạng Base64
    });
  }

  ngOnInit() {
    this.facilityMajorService.getFacilityMajors().then((data) => {
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
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    this.selectedFacilityMajorId = id; // Lưu ID FacilityMajor được chọn

    // 🔥 Gọi API lấy thông tin FacilityMajor
    this.facilityMajorService.findById(id).then(facilityMajor => {
      if (facilityMajor) {
        const formattedCloseDate = facilityMajor.closeScheduleDate
          ? new Date(facilityMajor.closeScheduleDate).toISOString().split('T')[0]
          : null;

        const formattedOpenDate = facilityMajor.openScheduleDate
          ? new Date(facilityMajor.openScheduleDate).toISOString().split('T')[0]
          : null;

        this.addFacilityMajorForm.patchValue({
          name: facilityMajor.name,
          mainDescription: facilityMajor.mainDescription,
          workShifstDescription: facilityMajor.workShifstDescription,
          isOpen: facilityMajor.isOpen,
          closeScheduleDate: formattedCloseDate, // Định dạng ngày
          openScheduleDate: formattedOpenDate, // Định dạng ngày
          facilityMajorTypeId: facilityMajor.facilityMajorTypeId,
          facilityId: facilityMajor.facilityId,
          logo: facilityMajor.logo || null,
          background: facilityMajor.background || null
        });

        // Cập nhật hình ảnh hiển thị
        this.logoUrl = facilityMajor.logo || null;
        this.backgroundUrl = facilityMajor.background || null;
      }
    });
  }

  hideDialogAdd() {
    this.addFacilityMajorForm.reset();
    this.logoUrl = null;
    this.backgroundUrl = null;

    // 🔥 Reset file upload
    setTimeout(() => {
      if (this.fileUploadLogo) this.fileUploadLogo.clear();
      if (this.fileUploadBackground) this.fileUploadBackground.clear();
    }, 100);

    this.add = false;
  }
  hideDialogUpdate() {
    this.addFacilityMajorForm.reset();
    this.logoUrl = null;
    this.backgroundUrl = null;

    // 🔥 Reset file upload
    setTimeout(() => {
      if (this.fileUploadLogo) this.fileUploadLogo.clear();
      if (this.fileUploadBackground) this.fileUploadBackground.clear();
    }, 100);

    this.update = false;
  }

  onFileSelectLogo(event: any) {
    const file = event.files[0]; // Lấy file đầu tiên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoUrl = e.target.result; // Hiển thị ảnh trước
        this.addFacilityMajorForm.patchValue({ logo: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelectBackground(event: any) {
    const file = event.files[0]; // Lấy file đầu tiên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.backgroundUrl = e.target.result; // Hiển thị ảnh trước
        this.addFacilityMajorForm.patchValue({ background: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  addFacilityMajor() {
    if (this.addFacilityMajorForm.valid) {
      console.log('Form facility major Data:', this.addFacilityMajorForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addFacilityMajorForm.markAllAsTouched();
    }
  }

  updateFacilityMajor() {
    if (this.addFacilityMajorForm.valid) {
      console.log('Form facility major update Data:', this.addFacilityMajorForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.addFacilityMajorForm.markAllAsTouched();
    }
  }

}
