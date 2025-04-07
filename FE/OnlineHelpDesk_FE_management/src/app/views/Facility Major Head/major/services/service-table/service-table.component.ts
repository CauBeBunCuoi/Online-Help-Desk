import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

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
    ProgressSpinnerModule
  ],
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ServiceTableComponent implements OnInit {
  @Input() services: any[] = []; // ✅ Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }

  userId: number;

  // all api service type
  serviceTypeOptions: any[] = [];

  daysOfWeekOptions: any[] = [];

  loadDaysOfWeek() {
    this.daysOfWeekOptions = [
      { Id: '1', Name: 'Chủ Nhật' },
      { Id: '2', Name: 'Thứ Hai' },
      { Id: '3', Name: 'Thứ Ba' },
      { Id: '4', Name: 'Thứ Tư' },
      { Id: '5', Name: 'Thứ Năm' },
      { Id: '6', Name: 'Thứ Sáu' },
      { Id: '7', Name: 'Thứ Bảy' },
    ];
  }

  facilityMajorOptions: any[] = [];

  serviceSchedules: any[] = [];

  selectedServiceId: number | null = null;

  @ViewChild('fileUploadLogo') fileUploadLogo!: FileUpload;

  logoUrl: string | null = null;
  backgroundUrl: string | null = null;

  addServiceForm: FormGroup;
  add: boolean = false;

  addServiceAvailableForm: FormGroup;
  addServiceAvailable: boolean = false;

  updateServiceForm: FormGroup;
  update: boolean = false;

  loading: boolean = false;
  loadingAdd: boolean = false;
  loadingUpdate: boolean = false;
  loadingServiceAva: boolean = false;

  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private serviceManagementService: ServiceManagementService,
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder,
  ) {
    this.addServiceForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Tên dịch vụ
      FacilityMajorId: [null, Validators.required], // ID FacilityMajor liên kết
      IsInitRequestDescriptionRequired: [false], // Yêu cầu mô tả khi tạo request
      RequestInitHintDescription: [''], // Gợi ý mô tả khi tạo request
      MainDescription: ['', [Validators.required, Validators.minLength(1)]], // Mô tả chính
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
      MainDescription: ['', [Validators.required, Validators.minLength(1)]], // Mô tả chính
      WorkShiftsDescription: [''], // Mô tả ca làm việc
      CloseScheduleDate: [null], // Ngày đóng
      OpenScheduleDate: [null], // Ngày mở
      ServiceTypeId: [null, Validators.required], // Loại dịch vụ
      Image: [''] // Ảnh dịch vụ (Base64 hoặc URL)
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
    this.loadMajorOptions();
    this.loadServiceTypes();
    this.loadDaysOfWeek();
  }

  loadMajorOptions() {
    this.loading = true;  // Bật spinner khi bắt đầu gọi API
    this.facilityMajorService.getMajorsByHead(this.userId).then(facilityMajors => {
      console.log(facilityMajors);
      if (!facilityMajors || !Array.isArray(facilityMajors.data.Majors)) {
        this.facilityMajorOptions = [];
        return;
      }
      this.facilityMajorOptions = facilityMajors.data.Majors.reduce((acc, major) => {
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
    }).finally(() => {
      this.loading = false;  // Tắt spinner sau khi gọi API xong
    });
  }

  loadServiceTypes() {
    this.loading = true; // Bắt đầu loading

    this.serviceManagementService.getServiceTypes().then(serviceTypes => {
      if (!serviceTypes || !Array.isArray(serviceTypes.data.ServiceTypes)) {
        this.serviceTypeOptions = [];
        return;
      }
      this.serviceTypeOptions = serviceTypes.data.ServiceTypes.map(type => ({
        id: type.Id,
        name: type.Name
      }));
    }).catch(error => {
      console.error('❌ Error loading Service Types:', error);
      this.serviceTypeOptions = [];
    }).finally(() => {
      this.loading = false; // Dừng loading khi hoàn thành
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
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => {
        this.loading = true;
        this.serviceManagementService.deleteService(id).then((response) => {
          if (response.success) {
            this.actionCompleted.emit('Action completed');
            successAlert(response.message.content);
          }
          else {
            errorAlert(response.message.content);
          }
        }).catch(error => {
          console.error('❌ Error fetching service data:', error);
        })
          .finally(() => {
            this.loading = false; // Kết thúc trạng thái loading
          });
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

  addService(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Add',
        severity: 'success',
      },
      accept: () => {
        const majorId = this.addServiceForm.get('FacilityMajorId')?.value;
        if (this.addServiceForm.valid) {
          this.loadingAdd = true; // Bắt đầu loading
          this.serviceManagementService.addServiceToMajor(majorId, this.addServiceForm.value)
            .then((response) => {
              if (response.success) {
                successAlert(response.message.content);
                this.hideDialogAdd();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch((error) => {
              errorAlert(error);
            })
            .finally(() => {
              this.actionCompleted.emit('Action completed');
              this.loadingAdd = false; // Dừng loading dù thành công hay thất bại
            });
        } else {
          console.log('❌ Form không hợp lệ');
          this.addServiceForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
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

  // Hiển thị dialog và gọi API lấy thông tin lịch trình
  showDialogServiceAvailable(id: number) {
    this.addServiceAvailable = true;
    this.selectedServiceId = id;
    this.loadServiceAvailability(id);
  }

  loadServiceAvailability(id: number) {
    this.loadingServiceAva = true;  // Bắt đầu tải dữ liệu
    this.serviceManagementService.getServiceAvailability(id)
      .then(schedules => {
        this.serviceSchedules = schedules.data.Schedules; // Lưu vào biến để hiển thị bảng
      })
      .catch(error => {
        console.error('❌ Error fetching schedules:', error);
      })
      .finally(() => {
        this.loadingServiceAva = false;  // Dừng loading khi hoàn thành
      });
  }

  // Thêm lịch trình vào dịch vụ
  addAvailability(event: any) {
    if (!this.selectedServiceId) {
      alert('Please select a service before adding a schedule.');
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Add',
        severity: 'success',
      },
      accept: () => {
        if (this.addServiceAvailableForm.valid) {
          const formData = this.addServiceAvailableForm.value;
          const Schedule = {
            Availability: {
              DayOfWeek: formData.DayOfWeek,
              StartRequestableTime: formData.StartRequestableTime,
              EndRequestableTime: formData.EndRequestableTime,
            }
          };
          this.loading = true; // Bắt đầu loading khi gửi dữ liệu
          this.serviceManagementService.addAvailability(this.selectedServiceId!, Schedule)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
                this.actionCompleted.emit('Action completed');
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => {
              console.error('❌ Lỗi khi thêm lịch trình:', error);
            })
            .finally(() => {
              this.loadServiceAvailability(this.selectedServiceId!);
              this.loading = false; // Dừng loading khi hoàn thành
            });
        } else {
          console.log('❌ Form không hợp lệ');
          this.addServiceAvailableForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogServiceAvailable() {
    this.addServiceAvailableForm.reset();
    this.addServiceAvailable = false;
    this.serviceSchedules = [];
    this.selectedServiceId = null;
  }

  confirmDeleteSchedule(event: any, id: number, schedule: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => { // check lại chỗ này cho nó nó thành Availability
        const dayOfWeekMap: { [key: string]: number } = {
          Sunday: 1,
          Monday: 2,
          Tuesday: 3,
          Wednesday: 4,
          Thursday: 5,
          Friday: 6,
          Saturday: 7
        };
        const formattedSchedule = {
          ...schedule,
          DayOfWeek: dayOfWeekMap[schedule.DayOfWeek] // Convert "Monday" → 1
        };
        this.loading = true;
        this.serviceManagementService.deleteAvailability(id, formattedSchedule).then((response) => {
          if (response.success) {
            this.actionCompleted.emit('Action completed');
            successAlert(response.message.content);
          }
          else {
            errorAlert(response.message.content);
          }
        }).catch(error => {
          console.error('❌ Error fetching service data:', error);
        })
          .finally(() => {
            this.loadServiceAvailability(this.selectedServiceId!);
            this.loading = false; // Kết thúc trạng thái loading
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  // Mở dialog và lấy thông tin dịch vụ
  showDialogUpdate(id: number) {
    console.log('Updating Service ID:', id);
    this.update = true; // Mở dialog
    this.selectedServiceId = id; // Lưu ID của Service được chọn

    this.loadingUpdate = true; // Bắt đầu trạng thái loading
    // 🔥 Gọi API lấy thông tin Service
    this.serviceManagementService.getServiceDetails(id)
      .then(serviceData => {
        const ServiceData = serviceData.data;
        if (!ServiceData || !ServiceData.Service) {
          console.warn('No Service data found for ID:', id);
          return;
        }
        // ✅ Gọi API lấy danh sách lịch trình (`Schedules`) của Service này
        this.loadServiceAvailability(id);
        // ✅ Chuyển đổi ngày về định dạng `YYYY-MM-DD`
        const formattedCloseDate = ServiceData.Service.CloseScheduleDate
          ? new Date(ServiceData.Service.CloseScheduleDate).toISOString().split('T')[0]
          : null;

        const formattedOpenDate = ServiceData.Service.OpenScheduleDate
          ? new Date(ServiceData.Service.OpenScheduleDate).toISOString().split('T')[0]
          : null;

        // ✅ Cập nhật `FormGroup`
        this.updateServiceForm.patchValue({
          Name: ServiceData.Service.Name,
          FacilityMajorId: ServiceData.Major.Id,
          IsInitRequestDescriptionRequired: ServiceData.Service.IsInitRequestDescriptionRequired,
          RequestInitHintDescription: ServiceData.Service.RequestInitHintDescription,
          MainDescription: ServiceData.Service.MainDescription,
          WorkShiftsDescription: ServiceData.Service.WorkShiftsDescription,
          CloseScheduleDate: formattedCloseDate,
          OpenScheduleDate: formattedOpenDate,
          ServiceTypeId: ServiceData.Service.ServiceTypeId,
          Image: null,
        });

        // ✅ Cập nhật ảnh hiển thị
        this.logoUrl = ServiceData.Service.ImageUrl;
      })
      .catch(error => {
        console.error('❌ Error fetching service data:', error);
      })
      .finally(() => {
        this.loadingUpdate = false; // Kết thúc trạng thái loading
      });
  }

  // Cập nhật dịch vụ
  updateService(event: any) {
    if (!this.selectedServiceId) {
      alert('Please choose the service to update!');
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Confirm',
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
        if (this.updateServiceForm.valid) {
          this.loading = true; // Bắt đầu trạng thái loading
          this.serviceManagementService.updateService(this.selectedServiceId!, this.updateServiceForm.value)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
                this.actionCompleted.emit('Action completed');
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => {
              errorAlert(error);
            })
            .finally(() => {
              this.loading = false; // Kết thúc trạng thái loading
            });
        } else {
          console.log('❌ Form cập nhật không hợp lệ');
          this.updateServiceForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
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
}
