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
import { FacilityService } from '../../../../../core/service/facility.service';
import { FileUpload } from 'primeng/fileupload';
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { Select, SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

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
    ProgressSpinnerModule,
    RatingModule,
    HttpClientModule,
    Select, SelectModule,
  ],
  templateUrl: './facility-major-table.component.html',
  styleUrl: './facility-major-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FacilityMajorTableComponent implements OnInit {
  @Input() facilityMajors: any[] = []; // ✅ Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }
  // gọi service api lấy facility và type major
  facilityOptions: any[] = [];
  selectedFacilityMajorId: number | null = null;

  // Facility major types
  facilityMajorTypes: any[] = [];

  selectedFacilityMajor: number | null = null;

  @ViewChild('fileUploadLogo') fileUploadLogo!: FileUpload;
  @ViewChild('fileUploadBackground') fileUploadBackground!: FileUpload;

  logoUrl: string | null = null;
  backgroundUrl: string | null = null;

  updateFacilityMajorForm: FormGroup;
  update: boolean = false;

  loading: boolean = false;
  loadingUpdate: boolean = false;

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
      WorkShiftsDescription: [''], // Mô tả ca làm việc
      FacilityMajorTypeId: [null, Validators.required], // Loại FacilityMajor (Số)
      FacilityId: [null, Validators.required], // Facility liên kết (Số)
      CloseScheduleDate: [null], // Ngày đóng
      OpenScheduleDate: [null], // Ngày mở
      BackgroundImage: [''], // Ảnh nền dưới dạng Base64
      Image: [''] // Logo dưới dạng Base64
    });
  }

  ngOnInit() {
    this.loadFacilityOptions();
    this.loadFacilityMajorTypeOptions()
  }

  loadFacilityOptions() {
    this.loading = true; // Bắt đầu hiển thị spinner

    this.facilityService.getFacilities().then(facilities => {
      console.log(facilities);
      if (!facilities || !Array.isArray(facilities.data.Facilities)) {
        this.facilityOptions = [];
        return;
      }
      this.facilityOptions = facilities.data.Facilities.reduce((acc, facility) => {
        if (!acc.some(item => item.id === facility.Facility.Id)) {
          acc.push({
            id: facility.Facility.Id,
            name: facility.Facility.Name
          });
        }
        return acc;
      }, []);
    }).catch(error => {
      console.error('Error loading Facility options:', error);
      this.facilityOptions = [];
    }).finally(() => {
      this.loading = false; // Dừng spinner khi API kết thúc (thành công hay thất bại)
    });
  }

  loadFacilityMajorTypeOptions() {
    this.facilityMajorService.getFacilityMajorTypes()
      .then(response => {
        if (!response || !Array.isArray(response.data.FacilityMajorTypes)) {
          this.facilityMajorTypes = [];
          return;
        }
        this.facilityMajorTypes = response.data.FacilityMajorTypes.map(type => ({
          id: type.Id,
          name: type.Name
        }));
      })
      .catch(error => {
        console.error('Error loading Facility Major Type options:', error);
        this.facilityMajorTypes = [];
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
        this.facilityMajorService.deleteMajor(id).then((response) => {
          if (response.success) {
            this.actionCompleted.emit('Action completed');
            successAlert(response.message.content);
            this.loadFacilityOptions();
          }
          else {
            errorAlert(response.message.content);
          }
        })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    this.selectedFacilityMajorId = id; // Lưu ID FacilityMajor được chọn
    this.loading = true; // Bắt đầu hiển thị spinner

    // 🔥 Gọi API lấy thông tin FacilityMajor
    this.facilityMajorService.getMajorDetail(id).then(facilityMajor => {
      if (facilityMajor) {
        const FacilityMajor = facilityMajor.data;
        // 🔹 Định dạng ngày cho input type="date"
        const formattedCloseDate = FacilityMajor.Major.CloseScheduleDate
          ? new Date(FacilityMajor.Major.CloseScheduleDate).toISOString().split('T')[0]
          : null;

        const formattedOpenDate = FacilityMajor.Major.OpenScheduleDate
          ? new Date(FacilityMajor.Major.OpenScheduleDate).toISOString().split('T')[0]
          : null;

        // 🔹 Cập nhật formControl với dữ liệu chính xác từ API
        this.updateFacilityMajorForm.patchValue({
          Name: FacilityMajor.Major.Name,
          MainDescription: FacilityMajor.Major.MainDescription,
          WorkShiftsDescription: FacilityMajor.Major.WorkShiftsDescription,
          CloseScheduleDate: formattedCloseDate, // Định dạng ngày
          OpenScheduleDate: formattedOpenDate, // Định dạng ngày
          FacilityMajorTypeId: FacilityMajor.MajorType.Id,
          FacilityId: FacilityMajor.Facility.Id,
          Image: null,
          BackgroundImage: null
        });

        // 🔹 Cập nhật hình ảnh hiển thị
        this.logoUrl = FacilityMajor.Major.ImageUrl;
        this.backgroundUrl = FacilityMajor.Major.BackgroundImageUrl;
      }
    }).catch(error => {
      console.error('Error fetching facility major:', error);
    }).finally(() => {
      this.loading = false; // Dừng spinner khi API kết thúc (thành công hay thất bại)
    });
  }

  updateFacilityMajor(event: any) {
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
        if (this.updateFacilityMajorForm.valid) {
          this.loadingUpdate = true; // Bắt đầu hiển thị spinner
          this.facilityMajorService.updateMajor(this.selectedFacilityMajorId!, this.updateFacilityMajorForm.value).then(
            (response) => {
              if (response.success) {
                successAlert(response.message.content);
                this.actionCompleted.emit('Action completed');
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            }).catch(error => {
              console.error('Error updating facility major:', error);
            }).finally(() => {
              this.loadingUpdate = false; // Dừng spinner khi API kết thúc (thành công hay thất bại)
            });
        } else {
          console.log('Form update Invalid');
          this.updateFacilityMajorForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
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

}
