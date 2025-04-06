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
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../core/utils/alert.util';

@Component({
  selector: 'app-campus-members',
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
  templateUrl: './campus-members.component.html',
  styleUrls: ['./campus-members.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CampusMembersComponent implements OnInit {
  members!: any[];

  // Giả lập API cho JobTypes (có thể thay bằng API thật)
  jobTypes: any;

  addMemberForm: FormGroup;
  updateMemberForm: FormGroup;
  add: boolean = false;
  update: boolean = false;
  selectedAccountId: number | null = null; // Lưu ID của tài khoản được chọn
  avatarUrl: string | null = null;
  loading: boolean = false;
  loadingUpdate: boolean = false;
  loadingAdd: boolean = false;
  activityValues: number[] = [0, 100];

  @ViewChild('fileUploadRef') fileUpload!: FileUpload;

  constructor(
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addMemberForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      JobTypeId: [null, Validators.required],
      Address: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Image: ['']
    });
    this.updateMemberForm = this.fb.group({
      FullName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      JobTypeId: [null, Validators.required],
      Phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      Address: ['', Validators.required],
      Image: ['']
    });
  }

  ngOnInit() {
    this.loading = true;
    this.loadMembers();
    this.loadJobTypes();
  }

  loadMembers() {
    this.authService.getMembers()
      .then(staffData => {
        this.members = staffData.data.Accounts;
      })
      .catch(error => console.error('Lỗi khi load thành viên:', error))
      .finally(() => (this.loading = false));  // Đặt loading false khi cả 2 API hoàn thành;
  }

  loadJobTypes() {
    this.authService.getJobTypes()
      .then(jobTypesData => {
        this.jobTypes = jobTypesData.data.JobTypes;
      })
      .catch(error => console.error('Lỗi khi load loại công việc:', error))
      .finally(() => (this.loading = false));  // Đặt loading false khi cả 2 API hoàn thành
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
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => {
        this.loading = true;
        this.authService.deactivatMember(id)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadMembers();
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

  showDialogAdd() {
    this.add = true;
  }

  registerMember(event: any) {
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
        this.authService.addMember(this.addMemberForm.value)
          .then((response) => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadMembers();
              this.hideDialogAdd();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => console.error('Lỗi thêm member:', error))
          .finally(() => this.loadingAdd = false);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogAdd() {
    this.addMemberForm.reset();
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
    this.updateMemberForm.reset();
    this.loadingUpdate = true;
    this.authService.getMemnerById(id)
      .then(member => {
        const Member = member.data;
        if (Member) {
          this.avatarUrl = Member.Account.ImageUrl || null;
          this.updateMemberForm.patchValue({
            FullName: Member.Account.FullName,
            Phone: Member.Account.Phone,
            Address: Member.Account.Address,
            // thêm để test
            Email: Member.Account.Email,
            JobTypeId: Member.Account.JobTypeId,
            //
            Image: null
          });
        }
      })
      .catch(error => console.error('Error fetching Member:', error))
      .finally(() => this.loadingUpdate = false);
  }

  updateMember(event: any) {
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
        if (this.updateMemberForm.valid) {
          this.loadingUpdate = true;
          this.authService.updateMember(this.selectedAccountId!, this.updateMemberForm.value)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
                this.loadMembers();
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => console.error('Lỗi khi cập nhật member:', error))
            .finally(() => this.loadingUpdate = false);
        } else {
          console.log('Form update Invalid');
          this.updateMemberForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogUpdate() {
    this.updateMemberForm.reset();
    this.avatarUrl = null;
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
        this.avatarUrl = e.target.result;
        this.addMemberForm.patchValue({ Image: e.target.result });
        this.updateMemberForm.patchValue({ Image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
