import { Component, OnInit, ViewChild } from '@angular/core';
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
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FacilityService } from '../../../../core/service/facility.service';

@Component({
  selector: 'app-facility-list',
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
  templateUrl: './facility-list.component.html',
  styleUrl: './facility-list.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FacilityListComponent {
  facilities!: any[];
  majors!: any[];

  addFacilityForm: FormGroup;
  add: boolean = false;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;
  logoUrl: string | null = null;

  updateFacilityForm: FormGroup;
  update: boolean = false;
  selectedFacilityId: number | null = null; // Lưu ID của tài khoản được chọn

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private facilityService: FacilityService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addFacilityForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Đúng với JSON (chữ N viết hoa)
      Description: ['', [Validators.required, Validators.minLength(3)]], // Đúng với JSON
      Image: [''] // Sử dụng "Image" thay vì "logo" để khớp JSON
    });
    this.updateFacilityForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]], // Đúng với JSON (chữ N viết hoa)
      Description: ['', [Validators.required, Validators.minLength(3)]], // Đúng với JSON
      Image: [''] // Sử dụng "Image" thay vì "logo" để khớp JSON
    });
  }

  ngOnInit() {
    this.facilityService.getFacilities().then((data) => {
      this.facilities = data;
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
    this.selectedFacilityId = id; // Lưu ID của facility được chọn

    // 🔥 Gọi API lấy thông tin facility
    this.facilityService.findById(id).then(facility => {
      if (facility) {
        this.updateFacilityForm.patchValue({
          Name: facility.Facility.Name, // Cập nhật field đúng với JSON
          Description: facility.Facility.Description,
          Image: facility.Facility.ImageUrl || null
        });

        this.majors = facility.Major;
        this.logoUrl = facility.Facility.ImageUrl || null; // Cập nhật ảnh đại diện
      }
    });
  }

  hideDialogAdd() {
    this.addFacilityForm.reset();
    this.logoUrl = null; // X
    // 🔥 Reset PrimeNG FileUpload
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear(); // Reset fileUpload về trạng thái ban đầu
      }
    }, 100);
    this.add = false;
  }

  hideDialogUpdate() {
    this.updateFacilityForm.reset();
    this.logoUrl = null; // X
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
        this.logoUrl = e.target.result; // Hiển thị ảnh trước
        this.addFacilityForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
        this.updateFacilityForm.patchValue({ Image: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  addFacility() {
    if (this.addFacilityForm.valid) {
      console.log('Form Data:', this.addFacilityForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addFacilityForm.markAllAsTouched();
    }
  }

  updateFacility() {
    if (this.updateFacilityForm.valid) {
      console.log('Form update Data:', this.updateFacilityForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.updateFacilityForm.markAllAsTouched();
    }
  }
}
