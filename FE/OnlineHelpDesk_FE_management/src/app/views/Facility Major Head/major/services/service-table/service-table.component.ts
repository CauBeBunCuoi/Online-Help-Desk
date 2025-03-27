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
import { FileUpload } from 'primeng/fileupload';
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { Select, SelectModule } from 'primeng/select';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { ServiceManagementService } from '../../../../../core/service/service-management.service';
import { ServiceAvailabilityService } from '../../../../../core/service/service-availability.service';

@Component({
  selector: 'app-service-table',
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
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ServiceTableComponent implements OnInit {
  @Input() services: any[] = []; // ✅ Nhận dữ liệu từ component cha

  // all api service type
  serviceTypes = [
    { value: 1, label: 'IT Support' },
    { value: 2, label: 'Maintenance' },
    { value: 3, label: 'Consultation' },
    { value: 4, label: 'Cleaning' },
    { value: 5, label: 'Security' },
  ];

  facilityMajorOptions: any[] = [];
  selectedMajorId: number | null = null;

  serviceSchedules: any[] = [];

  selectedServiceId: number | null = null;

  @ViewChild('fileUploadLogo') fileUploadLogo!: FileUpload;

  logoUrl: string | null = null;
  backgroundUrl: string | null = null;

  addServiceForm: FormGroup;
  add: boolean = false;

  addServiceAvailableForm: FormGroup;
  addServiceAvailable: boolean = false;

  // goi service lấy day
  daysOfWeek = [
    { value: 1, label: 'Sunday' },
    { value: 2, label: 'Monday' },
    { value: 3, label: 'Tuesday' },
    { value: 4, label: 'Wednesday' },
    { value: 5, label: 'Thursday' },
    { value: 6, label: 'Friday' },
    { value: 7, label: 'Saturday' }
  ];

  updateServiceForm: FormGroup;
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private serviceManagementService: ServiceManagementService,
    private facilityMajorService: FacilityMajorService,
    private serviceAvailabilityService: ServiceAvailabilityService,
    private fb: FormBuilder,
  ) {
    this.addServiceForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Tên dịch vụ
      FacilityMajorId: [null, Validators.required], // ID FacilityMajor liên kết
      IsInitRequestDescriptionRequired: [false], // Yêu cầu mô tả khi tạo request
      RequestInitHintDescription: [''], // Gợi ý mô tả khi tạo request
      MainDescription: ['', [Validators.required, Validators.minLength(5)]], // Mô tả chính
      WorkShiftsDescription: [''], // Mô tả ca làm việc
      ServiceTypeId: [null, Validators.required], // Loại dịch vụ
      Image: [''] // Hình ảnh (logo) dưới dạng Base64
    });
    this.addServiceAvailableForm = this.fb.group({
      DayOfWeek: [null, Validators.required],
      StartRequestableTime: ['', Validators.required],
      EndRequestableTime: ['', Validators.required]
    });
    this.updateServiceForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Tên dịch vụ
      FacilityMajorId: [null, Validators.required], // ID Facility Major (Chữ 'm' cần viết thường theo JSON)
      IsInitRequestDescriptionRequired: [false, Validators.required], // Có bắt buộc mô tả không
      RequestInitHintDescription: [''], // Gợi ý mô tả yêu cầu
      MainDescription: [''], // Mô tả chính
      WorkShiftsDescription: [''], // Mô tả ca làm việc
      CloseScheduleDate: [null], // Ngày đóng
      OpenScheduleDate: [null], // Ngày mở
      ServiceTypeId: [null, Validators.required], // Loại dịch vụ
      Image: [''] // Ảnh dịch vụ (Base64 hoặc URL)
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
  }

  loadMajorOptions() {
    // theo head
    this.facilityMajorService.getFacilityMajorsByAccountId(1).then(facilityMajors => {
      if (!facilityMajors || !Array.isArray(facilityMajors)) {
        this.facilityMajorOptions = [];
        return;
      }
      this.facilityMajorOptions = facilityMajors.reduce((acc, major) => {
        if (!acc.some(item => item.id === major.Major.Id)) {
          acc.push({
            id: major.Major.Id,
            name: major.Major.Name
          });
        }
        return acc;
      }, []);
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.facilityMajorOptions = [];
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

  hideDialogAdd() {
    this.addServiceForm.reset();
    this.logoUrl = null; // X
    // 🔥 Reset PrimeNG FileUpload
    setTimeout(() => {
      if (this.fileUploadLogo) {
        this.fileUploadLogo.clear(); // Reset fileUpload về trạng thái ban đầu
      }
    }, 100);
    this.add = false;
  }

  addService() {
    if (this.addServiceForm.valid) {
      console.log('Form Data:', this.addServiceForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addServiceForm.markAllAsTouched();
    }
  }

  showDialogServiceAvailable(id: number) {
    this.addServiceAvailable = true;
    this.selectedServiceId = id;
  }

  hideDialogServiceAvailable() {
    this.addServiceAvailableForm.reset();
    this.addServiceAvailable = false;
  }

  addAvailability() {
    if (this.addServiceAvailableForm.valid) {
      const newSchedule = {
        Schedule: this.addServiceAvailableForm.value
      };
      // them service id vao tu selectedservice
      this.serviceAvailabilityService.addSchedule(newSchedule).then(() => {
        alert('Service Availability Added!');
        this.addServiceAvailableForm.reset();
      });
    }
  }

  showDialogUpdate(id: number) {
    console.log('Updating Service ID:', id);
    this.update = true; // Mở dialog
    this.selectedServiceId = id; // Lưu ID của Service được chọn

    // 🔥 Gọi API lấy thông tin Service
    this.serviceManagementService.findById(id)
      .then(serviceData => {
        if (!serviceData || !serviceData.Service) {
          console.warn('No Service data found for ID:', id);
          return;
        }

        // ✅ Chuyển đổi ngày về định dạng `YYYY-MM-DD`
        const formattedCloseDate = serviceData.Service.CloseScheduleDate
          ? new Date(serviceData.Service.CloseScheduleDate).toISOString().split('T')[0]
          : null;

        const formattedOpenDate = serviceData.Service.OpenScheduleDate
          ? new Date(serviceData.Service.OpenScheduleDate).toISOString().split('T')[0]
          : null;

        // ✅ Cập nhật `FormGroup`
        this.updateServiceForm.patchValue({
          Name: serviceData.Service.Name,
          FacilityMajorId: serviceData.Major.Id,
          IsInitRequestDescriptionRequired: serviceData.Service.IsInitRequestDescriptionRequired,
          RequestInitHintDescription: serviceData.Service.RequestInitHintDescription,
          MainDescription: serviceData.Service.MainDescription,
          WorkShiftsDescription: serviceData.Service.WorkShiftsDescription,
          CloseScheduleDate: formattedCloseDate,
          OpenScheduleDate: formattedOpenDate,
          ServiceTypeId: serviceData.Service.ServiceTypeId,
          Image: serviceData.Service.ImageUrl,
        });

        // ✅ Cập nhật ảnh hiển thị
        this.logoUrl = serviceData.Service.ImageUrl;
      })
      .catch(error => {
        console.error('❌ Error fetching service data:', error);
      });
    // ✅ Gọi API lấy danh sách lịch trình (`Schedules`) của Service này
    this.serviceAvailabilityService.getSchedulesByServiceId(id)
      .then(schedules => {
        this.serviceSchedules = schedules; // Lưu vào biến để hiển thị bảng
      })
      .catch(error => console.error('❌ Error fetching schedules:', error));
  }

  hideDialogUpdate() {
    this.updateServiceForm.reset();
    this.logoUrl = null;

    // 🔥 Reset file upload
    setTimeout(() => {
      if (this.fileUploadLogo) this.fileUploadLogo.clear();
    }, 100);

    this.update = false;
  }

  onFileSelectLogo(event: any) {
    const file = event.files[0]; // Lấy file đầu tiên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoUrl = e.target.result; // Hiển thị ảnh trước
        this.updateServiceForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  updateService() {
    if (this.updateServiceForm.valid) {
      console.log('Form facility major update Data:', this.updateServiceForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.updateServiceForm.markAllAsTouched();
    }
  }
}
