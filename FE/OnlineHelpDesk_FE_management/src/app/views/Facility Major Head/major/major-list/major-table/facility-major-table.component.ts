import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
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
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacilityService } from '../../../../../core/service/facility.service';
import { FileUpload } from 'primeng/fileupload';
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { Select, SelectModule } from 'primeng/select';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-facility-major-table',
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
    FileUploadModule,
    RatingModule,
    HttpClientModule,
    Select, SelectModule,
    CheckboxModule, Checkbox,
  ],
  templateUrl: './facility-major-table.component.html',
  styleUrl: './facility-major-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FacilityMajorTableComponent implements OnInit {
  @Input() facilityMajors: any[] = []; // ✅ Nhận dữ liệu từ component cha

  // gọi service lấy facility và type major
  facilityOptions: any[] = [];
  selectedFacilityMajorId: number | null = null;

  // đợi lấy service
  facilityMajorTypes = [
    { label: 'Engineering', value: 1 },
    { label: 'Science', value: 2 },
    { label: 'Arts', value: 3 },
    { label: 'Medicine', value: 4 },
    { label: 'Business', value: 5 }
  ];

  selectedFacilityMajor: number | null = null;

  @ViewChild('fileUploadLogo') fileUploadLogo!: FileUpload;
  @ViewChild('fileUploadBackground') fileUploadBackground!: FileUpload;

  logoUrl: string | null = null;
  backgroundUrl: string | null = null;

  updateFacilityMajorForm: FormGroup;
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private facilityService: FacilityService,
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder
  ) {
    this.updateFacilityMajorForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Tên Facility Major
      MainDescription: [''], // Mô tả chính
      WorkShifstDescription: [''], // Mô tả ca làm việc
      FacilityMajorTypeId: [null, Validators.required], // Loại FacilityMajor (Số)
      FacilityId: [null, Validators.required], // Facility liên kết (Số)
      IsOpen: [false, Validators.required], // Mở hay đóng
      CloseScheduleDate: [null], // Ngày đóng
      OpenScheduleDate: [null], // Ngày mở
      BackgroundImage: [''], // Ảnh nền dưới dạng Base64
      Image: [''] // Logo dưới dạng Base64
    });

  }

  ngOnInit() {
    this.loadFacilityOptions();
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

  showDialogUpdate(id: number) {
    console.log(id);
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
          WorkShifstDescription: facilityMajor.Major.WorkShifstDescription,
          IsOpen: facilityMajor.Major.IsOpen,
          CloseScheduleDate: formattedCloseDate, // Định dạng ngày
          OpenScheduleDate: formattedOpenDate, // Định dạng ngày
          FacilityMajorTypeId: facilityMajor.MajorType.Id,
          FacilityId: facilityMajor.Facility.Id,
          Image: facilityMajor.Major.ImageUrl,
          BackgroundImage: facilityMajor.Major.BackgroundImageUrl,
        });

        // 🔹 Cập nhật hình ảnh hiển thị
        this.logoUrl = facilityMajor.Major.ImageUrl;
        this.backgroundUrl = facilityMajor.Major.BackgroundImageUrl;
      }
    }).catch(error => {
      console.error('Error fetching facility major:', error);
    });
  }

  hideDialogUpdate() {
    this.updateFacilityMajorForm.reset();
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
        this.updateFacilityMajorForm.patchValue({ BackgroundImage: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  updateFacilityMajor() {
    if (this.updateFacilityMajorForm.valid) {
      console.log('Form facility major update Data:', this.updateFacilityMajorForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.updateFacilityMajorForm.markAllAsTouched();
    }
  }
}
