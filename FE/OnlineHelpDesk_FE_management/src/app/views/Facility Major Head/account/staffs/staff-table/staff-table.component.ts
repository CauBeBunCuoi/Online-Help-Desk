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
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { MajorAssignmentService } from '../../../../../core/service/major-assignment.service';

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
    HttpClientModule,
  ],
  templateUrl: './staff-table.component.html',
  styleUrl: './staff-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class StaffTableComponent implements OnInit {
  @Input() filteredAssignees: any[] = []; // ✅ Nhận dữ liệu từ component cha
  majorAssignments: any[] = [];

  updateMajorAssignmentForm: FormGroup;
  update: boolean = false;

  selectedAccountId: number | null = null;
  selectedMajorId: number | null = null;

  loading: boolean = false;
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
    this.update = true;

    this.majorAssignmentService.getMajorAssignmentsByStaff(accountId).then(assignments => {
      this.majorAssignments = assignments;
      this.selectedEmployeeMajors = assignments.map(a => a.Major);
    });
  }

  // ✅ Ẩn Dialog
  hideDialogUpdate() {
    this.updateMajorAssignmentForm.reset();
    this.update = false;
  }

  updateMajorAssignment() {
    if (!this.selectedAccountId || !this.selectedMajorId) return;

    const body = {
      WorkDescription: this.updateMajorAssignmentForm.value.WorkDescription
    };

    // this.facilityMajorService.updateMajorAssignment(this.selectedAccountId, this.selectedMajorId, body)
    //   .then(response => {
    //     console.log('✅ Cập nhật thành công:', response);
    //     this.hideDialogUpdate();
    //   })
    //   .catch(error => {
    //     console.error('❌ Lỗi cập nhật:', error);
    //   });
  }
}
