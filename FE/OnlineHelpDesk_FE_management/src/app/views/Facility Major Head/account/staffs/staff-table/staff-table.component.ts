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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MajorAssignmentService } from '../../../../../core/service/major-assignment.service';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

@Component({
  selector: 'app-staff-table',
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
    ProgressSpinnerModule,
    HttpClientModule,
  ],
  templateUrl: './staff-table.component.html',
  styleUrl: './staff-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class StaffTableComponent implements OnInit {
  @Input() filteredAssignees: any[] = []; // ✅ Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }
  majorAssignments: any[] = [];

  updateMajorAssignmentForm: FormGroup;
  update: boolean = false;

  selectedAccountId: number | null = null;
  selectedMajorId: number | null = null;

  loading: boolean = false;  // Biến loading để hiển thị spinner
  loadingUpdate: boolean = false;
  activityValues: number[] = [0, 100];

  // lấy major của nhân viên
  selectedEmployeeMajors: any[] = [];


  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private majorAssignmentService: MajorAssignmentService,
    private fb: FormBuilder
  ) {
    this.updateMajorAssignmentForm = this.fb.group({
      WorkDescription: ['', [Validators.required, Validators.minLength(3)]], // Mô tả công việc
    });
  }

  ngOnInit() {
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
        this.loading = true;
        this.majorAssignmentService.deleteStaffFromMajor(this.selectedAccountId!, id)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.actionCompleted.emit('Action completed');
              this.hideDialogUpdate();
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

  // ✅ Hiển thị danh sách Major của Staff
  showDialogUpdate(accountId: number) {
    this.selectedAccountId = accountId;
    this.update = true; // Mở Dialog
    this.loadingUpdate = true; // Hiển thị spinner khi đang tải dữ liệu

    this.majorAssignmentService.getMajorAssignmentsByStaff(accountId).then(assignments => {
      const Assignments = assignments.data;
      this.majorAssignments = Assignments.MajorAssignments;
      this.selectedEmployeeMajors = Assignments.MajorAssignments.map(a => a.Major);

      // Lấy WorkDescription của Major đầu tiên (nếu có)
      if (Assignments.MajorAssignments.length > 0) {
        const firstAssignment = Assignments.MajorAssignments[0]; // Lấy phần tử đầu tiên
        this.selectedMajorId = firstAssignment.Major.Id; // Gán ID Major
        this.updateMajorAssignmentForm.patchValue({
          WorkDescription: firstAssignment.MajorAssignment.WorkDescription || '',
        });
      } else {
        this.updateMajorAssignmentForm.patchValue({ WorkDescription: '' });
      }
    }).catch(error => {
      console.error("⚠️ Lỗi khi lấy danh sách Major Assignments:", error);
    })
      .finally(() => {
        this.loadingUpdate = false;
      });
  }

  updateMajorAssignment(event: any) {
    if (!this.selectedAccountId || !this.selectedMajorId) {
      console.error('⚠️ Vui lòng chọn đủ thông tin trước khi cập nhật!');
      return;
    }
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
        this.loadingUpdate = true;
        this.majorAssignmentService.updateWorkDescription(this.selectedAccountId!, this.selectedMajorId!, this.updateMajorAssignmentForm.value)
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
            console.error('⚠️ Lỗi khi cập nhật:', error);
            alert('Cập nhật thất bại!');
          })
          .finally(() => {
            this.loadingUpdate = false;
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });

  }

  // ✅ Ẩn Dialog
  hideDialogUpdate() {
    this.updateMajorAssignmentForm.reset();
    this.update = false;
  }

}
