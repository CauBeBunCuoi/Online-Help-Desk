import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { FacilityService } from '../../../../core/service/facility.service';
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

  // gọi service lấy facility
  facilityOptions: any[] = [];
  selectedFacilityId: number | null = null;

  // đợi lấy service major type
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

  updateFacilityMajorForm: FormGroup;
  update: boolean = false;
  selectedFacilityMajorId: number | null = null; // Lưu ID của tài  khoản được chọn

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private facilityService: FacilityService,
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addFacilityMajorForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Tên Facility Major
      MainDescription: [''], // Mô tả chính
      WorkShiftsDescription: [''], // Mô tả ca làm việc
      FacilityMajorTypeId: [null, Validators.required], // Loại Facility Major
      FacilityId: [null, Validators.required], // Facility liên kết
      BackgroundImage: [''], // Ảnh nền (Base64 hoặc URL)
      Image: [''] // Ảnh chính (Base64 hoặc URL)
    });

    this.updateFacilityMajorForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Tên Facility Major
      MainDescription: [''], // Mô tả chính
      WorkShiftsDescription: [''], // Mô tả ca làm việc
      FacilityMajorTypeId: [null, Validators.required], // Loại Facility Major
      FacilityId: [null, Validators.required], // Facility liên kết
      CloseScheduleDate: [null], // Ngày đóng
      OpenScheduleDate: [null], // Ngày mở
      BackgroundImage: [''], // Ảnh nền (Base64 hoặc URL)
      Image: [''] // Ảnh chính (Base64 hoặc URL)
    });
  }

  ngOnInit() {
    this.loadFacilityOptions();
    this.facilityMajorService.getFacilityMajors().then((data) => {
      this.facilityMajors = data;
    });
  }

  loadFacilityOptions() {
    this.facilityService.getFacilities().then(facilities => {
      // Lọc danh sách Major từ facilities và loại bỏ trùng lặp
      const uniqueFacilities = new Map<number, any>();

      facilities.forEach(facility => {
        if (!uniqueFacilities.has(facility.Facility.Id)) {
          uniqueFacilities.set(facility.Facility.Id, {
            id: facility.Facility.Id,
            name: facility.Facility.Name
          });
        }
      });
      this.facilityOptions = Array.from(uniqueFacilities.values());
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
    this.selectedFacilityMajorId = id; // Lưu ID FacilityMajor được chọn

    // 🔥 Gọi API lấy thông tin FacilityMajor
    this.facilityMajorService.findById(id).then(facilityMajor => {
      if (facilityMajor) {
        // 🔹 Định dạng ngày cho input type="date"
        const formattedCloseDate = facilityMajor.Major.CloseScheduleDate
          ? new Date(facilityMajor.Major.CloseScheduleDate).toISOString().split('T')[0]
          : null;

        const formattedOpenDate = facilityMajor.Major.OpenScheduleDate
          ? new Date(facilityMajor.Major.OpenScheduleDate).toISOString().split('T')[0]
          : null;

        // 🔹 Cập nhật formControl với dữ liệu chính xác từ API
        this.updateFacilityMajorForm.patchValue({
          Name: facilityMajor.Major.Name,
          MainDescription: facilityMajor.Major.MainDescription,
          WorkShiftsDescription: facilityMajor.Major.WorkShiftsDescription,
          CloseScheduleDate: formattedCloseDate, // Định dạng ngày
          OpenScheduleDate: formattedOpenDate, // Định dạng ngày
          FacilityMajorTypeId: facilityMajor.MajorType.Id,
          FacilityId: facilityMajor.Facility.Id,
          Image: facilityMajor.Major.ImageUrl,
          BackgroundImage: facilityMajor.Major.BackgroundImageUrl
        });

        // 🔹 Cập nhật hình ảnh hiển thị
        this.logoUrl = facilityMajor.Major.ImageUrl;
        this.backgroundUrl = facilityMajor.Major.BackgroundImageUrl;
      }
    }).catch(error => {
      console.error('Error fetching facility major:', error);
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
        this.addFacilityMajorForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
        this.updateFacilityMajorForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
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
        this.addFacilityMajorForm.patchValue({ BackgroundImage: e.target.result }); // Gán vào FormGroup
        this.updateFacilityMajorForm.patchValue({ BackgroundImage: e.target.result }); // Gán vào FormGroup
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
