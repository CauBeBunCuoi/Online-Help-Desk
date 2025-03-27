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
import { SelectModule, Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskRequestService } from '../../../../../core/service/task-request.service';

@Component({
  selector: 'app-task-assignments-table',
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
    Select
  ],
  templateUrl: './task-assignments-table.component.html',
  styleUrl: './task-assignments-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsTableComponent implements OnInit {
  @Input() taskRequests: any[] = []; // ✅ Nhận dữ liệu từ component cha
  actions = [
    { label: 'Finished', value: 'Finished' },
    { label: 'Canceled', value: 'Canceled' }
  ];

  selectedTaskRequestId: number;

  updateTaskRequestForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private taskRequestService: TaskRequestService,
    private fb: FormBuilder
  ) {
    this.updateTaskRequestForm = this.fb.group({
      Action: [null, Validators.required], // Thêm action
      CancelReason: ['', Validators.minLength(3)], // Chỉ yêu cầu khi Cancel
    });
  }

  ngOnInit() {
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  confirmDelete(event: Event) {
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

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    this.selectedTaskRequestId = id; // Lưu ID request
    // ✅ Reset form trước khi điền dữ liệu mới
    this.updateTaskRequestForm.reset();

    // 🔥 Gọi API lấy dữ liệu
    this.taskRequestService.findById(id).then(taskRequest => {
      if (!taskRequest || !taskRequest.TaskRequest) {
        console.warn(`⚠️ Không tìm thấy dữ liệu Service Request cho ID: ${id}`);
        return;
      }
      // ✅ Điền dữ liệu vào form
      this.updateTaskRequestForm.patchValue({
        CancelReason: taskRequest.TaskRequest.CancelReason || '',
      });
    }).catch(error => {
      console.error('❌ Lỗi khi lấy dữ liệu Service Request:', error);
    });
  }

  hideDialogUpdate() {
    this.updateTaskRequestForm.reset();
    this.update = false;
  }

  updateTaskRequest() {
    if (this.updateTaskRequestForm.valid) {
      console.log('Form update Data:', this.updateTaskRequestForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.updateTaskRequestForm.markAllAsTouched();
    }
  }
}
