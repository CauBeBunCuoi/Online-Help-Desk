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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacilityService } from '../../../../core/service/facility.service';
import { errorAlert, successAlert } from '../../../../core/utils/alert.util';
@Component({
  selector: 'app-facility-list',
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
    ProgressSpinnerModule
  ],
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FacilityListComponent implements OnInit {
  facilities!: any[];
  majors!: any[];

  addFacilityForm: FormGroup;
  updateFacilityForm: FormGroup;
  add: boolean = false;
  update: boolean = false;
  selectedFacilityId: number | null = null; // Lưu ID của facility được chọn

  logoUrl: string | null = null;
  loading: boolean = false;
  loadingDetail: boolean = false;
  loadingAdd: boolean = false;
  activityValues: number[] = [0, 100];

  @ViewChild('fileUploadRef') fileUpload!: FileUpload;

  constructor(
    private facilityService: FacilityService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    // Khởi tạo form theo JSON (field Name, Description, Image)
    this.addFacilityForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Description: ['', [Validators.required, Validators.minLength(3)]],
      Image: ['']
    });
    this.updateFacilityForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Description: ['', [Validators.required, Validators.minLength(3)]],
      Image: ['']
    });
  }

  ngOnInit() {
    this.loadFacilities();
  }

  loadFacilities() {
    this.loading = true;
    this.facilityService.getFacilities()
      .then((data) => {
        this.facilities = data.data.Facilities;
      })
      .catch(error => console.error('Lỗi khi lấy danh sách facility:', error))
      .finally(() => (this.loading = false));
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
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
        this.loading = true;
        this.facilityService.deactivateFacility(id).then((response) => {
          if (response.success) {
            successAlert(response.message.content);
            this.loadFacilities();
            this.hideDialogAdd();
          } else {
            errorAlert(response.message.content);
          }
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

  addFacility(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Danger Zone',
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
        if (this.addFacilityForm.valid) {
          this.loadingAdd = true;
          // Gọi API addFacility (POST) chỉ trả về message
          this.facilityService.addFacility(this.addFacilityForm.value)
            .then((response) => {
              if (response.success) {
                successAlert(response.message.content);

                this.loadFacilities();
              } else {
                errorAlert(response.message.content);
              }
              this.hideDialogAdd();
            })
            .catch(error => console.error('Lỗi khi thêm facility:', error))
            .finally(() => (this.loadingAdd = false));
        } else {
          console.log('Form Invalid');
          this.addFacilityForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });

  }

  hideDialogAdd() {
    this.addFacilityForm.reset();
    this.logoUrl = null;
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.add = false;
  }

  showDialogUpdate(id: number) {
    this.update = true;
    this.selectedFacilityId = id;
    this.updateFacilityForm.reset();
    this.loadingDetail = true;
    // Gọi API lấy thông tin facility theo ID
    this.facilityService.getFacilityById(id)
      .then(facility => {
        const Facility = facility.data;
        console.log(Facility);
        if (Facility) {
          this.updateFacilityForm.patchValue({
            Name: Facility.Facility.Name,
            Description: Facility.Facility.Description,
            Image: null
          });
          this.majors = Facility.Majors;
          this.logoUrl = Facility.Facility.ImageUrl || null;
        }
      })
      .catch(error => console.error('Lỗi khi lấy thông tin facility:', error))
      .finally(() => (this.loadingDetail = false));
  }

  updateFacility(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Danger Zone',
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
        if (this.updateFacilityForm.valid) {
          this.loadingDetail = true;
          this.facilityService.updateFacility(this.selectedFacilityId!, this.updateFacilityForm.value)
            .then((response) => {
              if (response.success) {
                successAlert(response.message.content);
                this.loadFacilities();
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => console.error('Lỗi khi cập nhật facility:', error))
            .finally(() => (this.loadingDetail = false));
        } else {
          console.log('Form update Invalid');
          this.updateFacilityForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogUpdate() {
    this.updateFacilityForm.reset();
    this.logoUrl = null;
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.update = false;
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoUrl = e.target.result;
        this.addFacilityForm.patchValue({ Image: e.target.result });
        this.updateFacilityForm.patchValue({ Image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
