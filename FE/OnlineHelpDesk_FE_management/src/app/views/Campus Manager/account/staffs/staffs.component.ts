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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MajorAssignmentService } from '../../../../core/service/major-assignment.service';
import { errorAlert, successAlert } from '../../../../core/utils/alert.util';

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
    Select,
    ProgressSpinnerModule // Import spinner module
  ],
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class StaffsComponent implements OnInit {
  staffs!: any[];
  roleTypes: any;
  jobTypes: any;
  selectedEmployeeMajors: any[] = [];
  selectedAccountId: number | null = null;
  facilityMajors: any[] = [];
  selectedFacilityMajors: any[] = [];
  addStaffForm: FormGroup;
  updateStaffForm: FormGroup;
  add: boolean = false;
  update: boolean = false;
  facilityMajorTable: boolean = false;
  loading: boolean = false; // Loading state
  loadingAdd: boolean = false; // Loading state for add staff
  loadingUpdate: boolean = false; // Loading state for update staff
  loadingMajorAss: boolean = false; // Loading state for major assignment
  activityValues: number[] = [0, 100];
  avatarUrl: string | null = null;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;

  constructor(
    private authService: AuthService,
    private facilityMajorService: FacilityMajorService,
    private majorAssignmentService: MajorAssignmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addStaffForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      JobTypeId: [null, Validators.required],
      RoleId: [null, Validators.required],
      Address: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Image: ['']
    });
    this.updateStaffForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Address: ['', Validators.required],
      JobTypeId: [null, Validators.required],
      DateOfBirth: [null, Validators.required],
      Image: ['']
    });
  }

  ngOnInit() {
    this.loadStaff();
    this.loadRoles();
    this.loadJobTypes();
  }

  loadRoles() {
    this.loading = true;
    this.authService.getRoles().then(rolesData => {
      this.roleTypes = rolesData.data.Roles;
    })
      .catch(error => console.error('Lỗi khi load dữ liệu:', error))
      .finally(() => (this.loading = false));
  }

  loadStaff() {
    this.loading = true;
    this.authService.getStaffs().then(jobTypesData => {
      this.staffs = jobTypesData.data.Accounts;
    })
      .catch(error => console.error('Lỗi khi load dữ liệu:', error))
      .finally(() => (this.loading = false));
  }

  loadJobTypes() {
    this.loading = true;
    this.authService.getJobTypes().then(jobTypesData => {
      this.jobTypes = jobTypesData.data.JobTypes;
    })
      .catch(error => console.error('Lỗi khi load dữ liệu:', error))
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
        this.authService.deactivateStaff(id)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadStaff();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => console.error('Lỗi xóa nhân viên:', error))
          .finally(() => (this.loading = false));
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  confirmDeleteMajorAssigne(event: Event, id: number) {
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
        this.majorAssignmentService.deleteStaffFromMajor(this.selectedAccountId!, id)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadStaff();
              this.hideDialogFacilityMajorTable();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => console.error('Lỗi xóa nhân viên:', error))
          .finally(() => (this.loading = false));
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
        this.addStaffForm.patchValue({ Image: e.target.result });
        this.updateStaffForm.patchValue({ Image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  showDialogAdd() {
    this.add = true;
    this.addStaffForm.get('RoleId')?.enable();
  }

  registerStaff(event: any) {
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
        this.loadingAdd = true;
        this.authService.addStaff(this.addStaffForm.value)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadStaff();
              this.hideDialogAdd();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => console.error('Lỗi thêm nhân viên:', error))
          .finally(() => (this.loadingAdd = false));
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogAdd() {
    this.addStaffForm.reset();
    this.avatarUrl = null;
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.add = false;
  }

  showDialogUpdate(id: number) {
    this.update = true;
    this.selectedAccountId = id;
    this.updateStaffForm.reset();
    this.loadingUpdate = true;
    this.majorAssignmentService.getMajorAssignmentsByStaff(this.selectedAccountId).then(
      majorsAssignments => {
        this.selectedEmployeeMajors = majorsAssignments.data.MajorAssignments.map(assignment => assignment.Major);
        this.authService.getStaffById(id)
          .then(staff => {
            if (!staff || !staff.data.Account) {
              console.warn(`Không tìm thấy thông tin nhân viên với ID: ${id}`);
              return;
            }
            const Staff = staff.data.Account;
            const formattedDateOfBirth = Staff.DateOfBirth
              ? new Date(Staff.DateOfBirth).toISOString().split('T')[0]
              : null;
            this.avatarUrl = Staff.ImageUrl || null;
            this.updateStaffForm.patchValue({
              FullName: Staff.FullName || '',
              Email: Staff.Email || '',
              Phone: Staff.Phone || '',
              Address: Staff.Address || '',
              JobTypeId: Staff.JobTypeId || null,
              DateOfBirth: formattedDateOfBirth,
              Image: null,
            });
          })
          .catch(error => console.error('Lỗi lấy thông tin nhân viên:', error))
          .finally(() => (this.loadingUpdate = false));
      }
    )
      .catch(error => console.error('Lỗi ', error))
      .finally(() => (this.loadingUpdate = false));
  }

  updateStaff(event: any) {
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
        if (this.updateStaffForm.valid) {
          this.loadingUpdate = true;
          this.authService.updateStaff(this.selectedAccountId!, this.updateStaffForm.value)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
                this.loadStaff();
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => console.error('Lỗi cập nhật nhân viên:', error))
            .finally(() => (this.loadingUpdate = false));
          console.log('Form update Data:', this.updateStaffForm.value);
        } else {
          this.updateStaffForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogUpdate() {
    this.updateStaffForm.reset();
    this.avatarUrl = null;
    this.selectedEmployeeMajors = [];
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.update = false;
  }

  showDialogFacilityMajorTable(id: number) {
    this.facilityMajorTable = true;
    this.selectedAccountId = id;
    this.loadingMajorAss = true;
    Promise.all([
      this.majorAssignmentService.getMajorsForHead(id), // API #1
      this.facilityMajorService.getAllMajors() // API #2
    ]).then(([assignedMajorsRes, allMajorsRes]) => {
      const assignedMajors = assignedMajorsRes.data.Majors.map(m => m.Major); // đã assign
      const allMajors = allMajorsRes.data.Majors; // toàn bộ major
      // lọc ra những major chưa assign
      this.facilityMajors = allMajors.filter(m =>
        !assignedMajors.some(am => am.Id === m.Major.Id)
      );
      console.log("Unassigned majors:", this.facilityMajors);
    })
      .catch(error => console.error('Lỗi load:', error))
      .finally(() => (this.loadingMajorAss = false));
  }

  updateFacilityMajorSelect(event: any) {
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
      formData.append('facilityMajorsId', fm.Major.Id);
    });

    // Chuyển dữ liệu FormData thành mảng chuỗi các ID
    const facilityMajorsIds: string[] = [];
    formData.forEach((value, key) => {
      if (key === 'facilityMajorsId') {
        facilityMajorsIds.push(value.toString()); // Chuyển giá trị thành chuỗi
      }
    });
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
        this.loadingMajorAss = false;
        this.majorAssignmentService.addStaffMajors(this.selectedAccountId!, facilityMajorsIds).then(
          response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadStaff();
              this.hideDialogFacilityMajorTable();
            } else {
              errorAlert(response.message.content);
            }
          }
        )
          .catch(error => {
            console.error('Error updating facility major:', error);
          })
          .finally(() => {
            this.loadingMajorAss = false;
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
    console.log('FacilityMajors ID:', formData.getAll('facilityMajorsId'));
  }

  hideDialogFacilityMajorTable() {
    this.facilityMajorTable = false;
    this.selectedAccountId = null;
    this.selectedFacilityMajors = [];
  }
}
