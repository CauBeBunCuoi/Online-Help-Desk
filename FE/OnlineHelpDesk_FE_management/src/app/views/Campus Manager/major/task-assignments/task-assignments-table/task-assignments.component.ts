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
  majorOptions: any[] = [];
  actions = [
    { label: 'Finished', value: 'Finished' },
    { label: 'Canceled', value: 'Canceled' }
  ];  

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
      CancelReason: ['', [Validators.minLength(3)]],
      Description: ['', [Validators.minLength(3)]],
      MajorId: [null, Validators.required],
      RequesterId: 1,
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
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

  loadMajorOptions() {
    this.taskRequestService.getTaskRequests().then(taskRequests => {
      // Lọc danh sách Major từ taskRequests và loại bỏ trùng lặp
      const uniqueMajors = new Map<number, any>();

      taskRequests.forEach(task => {
        if (!uniqueMajors.has(task.Major.Id)) {
          uniqueMajors.set(task.Major.Id, {
            id: task.Major.Id,
            name: task.Major.Name
          });
        }
      });
      this.majorOptions = Array.from(uniqueMajors.values());
      console.log(this.majorOptions);
    });
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    // 🔥 Gọi API lấy thông tin tài khoản
    this.taskRequestService.findById(id).then(task => {
      if (task) {
        this.updateTaskRequestForm.patchValue({
          Description: task.TaskRequest.Description,
          MajorId: task.Major.Id,
        });
      }
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
