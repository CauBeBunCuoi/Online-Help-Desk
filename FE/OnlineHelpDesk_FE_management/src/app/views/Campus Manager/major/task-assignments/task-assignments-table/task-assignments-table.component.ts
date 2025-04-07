import { Component, Input, OnInit } from '@angular/core';
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
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

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
    Select,
    ProgressSpinnerModule,
  ],
  templateUrl: './task-assignments-table.component.html',
  styleUrl: './task-assignments-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsTableComponent implements OnInit {
  @Input() taskRequests: any[] = [];
  majorOptions: any[] = [];
  actions = [
    { name: 'Finished', value: 'Finished' },
    { name: 'Cancelled', value: 'Cancelled' }
  ];

  updateTaskRequestForm: FormGroup;
  selectedTaskRequestId: number | null = null;

  update: boolean = false;
  loading: boolean = false; // Trạng thái loading
  loadingUpdate: boolean = false; // Trạng thái loading khi cập nhật
  activityValues: number[] = [0, 100];

  userId: number;


  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private taskRequestService: TaskRequestService,
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder
  ) {
    this.updateTaskRequestForm = this.fb.group({
      CancelReason: [''],
      Description: ['', [Validators.minLength(3)]],
      MajorId: [{ value: null, disabled: true }, [Validators.required]],
      RequesterId: [this.userId, [Validators.required]],
      Action: [''],
    });
  }

  ngOnInit() {
    // Lấy thông tin từ localStorage
    const authDataString = localStorage.getItem('auth');

    // Kiểm tra nếu có dữ liệu và sau đó chuyển sang JSON
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      console.log(authData); // Kiểm tra dữ liệu auth

      // Kiểm tra nếu có dữ liệu 'user' và lấy 'id' từ 'user'
      if (authData.user && authData.user.id) {
        this.userId = authData.user.id;
        console.log('User ID:', this.userId); // In ra userId
      }
    }
    this.loadMajorOptions();
  }

  // Search toàn cục
  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  // Tải các options của major
  loadMajorOptions() {
    this.loading = true; // Hiển thị spinner
    this.facilityMajorService.getAllMajors().then(facilityMajors => {
      console.log(facilityMajors);
      if (!facilityMajors || !Array.isArray(facilityMajors.data.Majors)) {
        this.majorOptions = [];
        return;
      }
      this.majorOptions = facilityMajors.data.Majors.reduce((acc, major) => {
        if (!acc.some(item => item.id === major.Major.Id)) {
          acc.push({
            id: major.Major.Id,
            name: major.Major.Name
          });
        }
        return acc;
      }, []);
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.majorOptions = [];
    }).finally(() => {
      this.loading = false; // Ẩn spinner khi dữ liệu đã được tải
    });
  }

  // Mở dialog cập nhật task request
  showDialogUpdate(id: number) {
    this.update = true;
    this.selectedTaskRequestId = id;
    this.loadingUpdate = true; // Hiển thị spinner khi gọi API
    this.taskRequestService.getTaskRequestDetail(id).then(task => {
      const taskRequest = task.data;
      if (taskRequest) {
        this.updateTaskRequestForm.patchValue({
          Description: taskRequest.TaskRequest.Description,
          MajorId: taskRequest.Major.Id,
          CancelReason: taskRequest.TaskRequest.CancelReason,
        });
      }
    }).catch(error => {
      console.error('Error fetching task detail:', error);
    }).finally(() => {
      this.loadingUpdate = false; // Ẩn spinner khi API hoàn tất
    });
  }

  // Cập nhật TaskRequest
  updateTaskRequest(event: any) {
    if (!this.selectedTaskRequestId) {
      console.warn('No Task ID selected');
      return;
    }
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
        if (this.updateTaskRequestForm.valid) {
          const formData = this.updateTaskRequestForm.getRawValue();
          const requestData = {
            CancelReason: formData.CancelReason || null,
          };
          this.loadingUpdate = true; // Hiển thị spinner khi cập nhật
          this.taskRequestService.updateTaskStatus(this.selectedTaskRequestId!, formData.Action, requestData)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => {
              console.error('Error updating task:', error);
            })
            .finally(() => {
              this.loadingUpdate = false; // Ẩn spinner khi hoàn tất
            });
        } else {
          console.warn('Form is invalid');
          this.updateTaskRequestForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });

  }

  hideDialogUpdate() {
    this.updateTaskRequestForm.reset();
    this.selectedTaskRequestId = null;
    this.update = false;
  }
}
