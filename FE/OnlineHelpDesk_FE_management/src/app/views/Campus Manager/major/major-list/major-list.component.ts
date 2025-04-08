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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../core/utils/alert.util';

@Component({
  selector: 'app-major-list',
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
    ProgressSpinnerModule,
  ],
  templateUrl: './major-list.component.html',
  styleUrls: ['./major-list.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class MajorListComponent implements OnInit {
  facilityMajors!: any[];

  // Facility options lấy từ API Facility
  facilityOptions: any[] = [];
  selectedFacilityId: number | null = null;

  // Facility major types
  facilityMajorTypes: any[] = [];

  addFacilityMajorForm: FormGroup;
  updateFacilityMajorForm: FormGroup;
  add: boolean = false;
  update: boolean = false;
  selectedFacilityMajorId: number | null = null;

  logoUrl: string | null = null;
  backgroundUrl: string | null = null;

  // Loading state
  loading: boolean = false;
  loadingTable: boolean = false;
  loadingAdd: boolean = false;
  loadingUpdate: boolean = false;
  activityValues: number[] = [0, 100];

  @ViewChild('fileUploadLogo') fileUploadLogo!: FileUpload;
  @ViewChild('fileUploadBackground') fileUploadBackground!: FileUpload;

  constructor(
    private facilityService: FacilityService,
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addFacilityMajorForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      MainDescription: [''],
      WorkShiftsDescription: [''],
      FacilityMajorTypeId: [null, Validators.required],
      FacilityId: [null, Validators.required],
      BackgroundImage: [''],
      Image: ['']
    });
    this.updateFacilityMajorForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      MainDescription: [''],
      WorkShiftsDescription: [''],
      FacilityMajorTypeId: [null, Validators.required],
      FacilityId: [null, Validators.required],
      CloseScheduleDate: [null],
      OpenScheduleDate: [null],
      BackgroundImage: [''],
      Image: ['']
    });
  }

  ngOnInit() {
    this.loadMajors();
    this.loadFacilityOptions();
    this.loadFacilityMajorTypeOptions();
  }

  loadMajors() {
    this.loadingTable = true;
    this.facilityMajorService.getAllMajors()
      .then((data) => {
        this.facilityMajors = data.data.Majors;
      })
      .catch(error => {
        console.error('Error loading majors:', error);
        this.facilityMajors = [];
      })
      .finally(() => {
        this.loadingTable = false;
      });
  }

  loadFacilityOptions() {
    this.loading = true;
    this.facilityService.getFacilities()
      .then(facilities => {
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
      })
      .catch(error => {
        console.error('Error loading Facility options:', error);
        this.facilityOptions = [];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loadFacilityMajorTypeOptions() {
    this.loading = true;
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
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
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
            successAlert(response.message.content);
            this.loadMajors();
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

  showDialogAdd() {
    this.add = true;
  }

  addFacilityMajor(event: any) {
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
        if (this.addFacilityMajorForm.valid) {
          this.loadingAdd = true;
          this.facilityMajorService.addMajor(this.addFacilityMajorForm.value)
            .then((response) => {
              if (response.success) {
                successAlert(response.message.content);
                this.loadMajors();
                this.hideDialogAdd();
              } else {
                errorAlert(response.message.content);
              }
            }
            )
            .catch(error => console.error('Error adding facility major:', error))
            .finally(() => {
              this.loadingAdd = false;
            });
        } else {
          console.log('Form Invalid');
          this.addFacilityMajorForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogAdd() {
    this.addFacilityMajorForm.reset();
    this.logoUrl = null;
    this.backgroundUrl = null;
    setTimeout(() => {
      if (this.fileUploadLogo) this.fileUploadLogo.clear();
      if (this.fileUploadBackground) this.fileUploadBackground.clear();
    }, 100);
    this.add = false;
  }

  showDialogUpdate(id: number) {
    this.update = true;
    this.selectedFacilityMajorId = id;
    this.updateFacilityMajorForm.reset();
    this.loadingUpdate = true;
    this.facilityMajorService.getMajorDetail(id)
      .then(facilityMajor => {
        if (facilityMajor) {
          const FacilityMajor = facilityMajor.data;
          const formattedCloseDate = FacilityMajor.Major.CloseScheduleDate
            ? new Date(FacilityMajor.Major.CloseScheduleDate).toISOString().split('T')[0]
            : null;
          const formattedOpenDate = FacilityMajor.Major.OpenScheduleDate
            ? new Date(FacilityMajor.Major.OpenScheduleDate).toISOString().split('T')[0]
            : null;
          this.updateFacilityMajorForm.patchValue({
            Name: FacilityMajor.Major.Name,
            MainDescription: FacilityMajor.Major.MainDescription,
            WorkShiftsDescription: FacilityMajor.Major.WorkShiftsDescription,
            CloseScheduleDate: formattedCloseDate,
            OpenScheduleDate: formattedOpenDate,
            FacilityMajorTypeId: FacilityMajor.MajorType.Id,
            FacilityId: FacilityMajor.Facility.Id,
            Image: null,
            BackgroundImage: null
          });
          this.logoUrl = FacilityMajor.Major.ImageUrl;
          this.backgroundUrl = FacilityMajor.Major.BackgroundImageUrl;
        }
      })
      .catch(error => {
        console.error('Error fetching facility major:', error);
      })
      .finally(() => {
        this.loadingUpdate = false;
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
          this.loading = true;
          var closeScheduleDate = !this.updateFacilityMajorForm.value.CloseScheduleDate ? null : this.updateFacilityMajorForm.value.CloseScheduleDate;
          var openScheduleDate = !this.updateFacilityMajorForm.value.OpenScheduleDate ? null : this.updateFacilityMajorForm.value.OpenScheduleDate;
          this.facilityMajorService.updateMajor(this.selectedFacilityMajorId!, { ...this.updateFacilityMajorForm.value, CloseScheduleDate: closeScheduleDate, OpenScheduleDate: openScheduleDate })
            .then((response) => {
              if (response.success) {
                successAlert(response.message.content);
                this.loadMajors();
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => {
              console.error('Error updating facility major:', error);
            })
            .finally(() => {
              this.loading = false;
            });
          console.log('Form update Data:', this.updateFacilityMajorForm.value);
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
    setTimeout(() => {
      if (this.fileUploadLogo) this.fileUploadLogo.clear();
      if (this.fileUploadBackground) this.fileUploadBackground.clear();
    }, 100);
    this.update = false;
  }

  onFileSelectLogo(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoUrl = e.target.result;
        this.addFacilityMajorForm.patchValue({ Image: e.target.result });
        this.updateFacilityMajorForm.patchValue({ Image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelectBackground(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.backgroundUrl = e.target.result;
        this.addFacilityMajorForm.patchValue({ BackgroundImage: e.target.result });
        this.updateFacilityMajorForm.patchValue({ BackgroundImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
