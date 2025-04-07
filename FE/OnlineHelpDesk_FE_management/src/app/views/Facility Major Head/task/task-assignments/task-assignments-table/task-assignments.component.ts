import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    ProgressSpinnerModule
  ],
  templateUrl: './task-assignments-table.component.html',
  styleUrl: './task-assignments-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsTableComponent implements OnInit {
  @Input() taskRequests: any[] = []; // ✅ Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }
  majorOptions: any[] = [];
  actions = [
    { name: 'Finished', value: 'Finished' },
    { name: 'Cancelled', value: 'Cancelled' }
  ];

  selectedTaskRequestId: number;
  updateTaskRequestForm: FormGroup;

  update: boolean = false;

  loading: boolean = false;  // Biến để theo dõi trạng thái loading
  loadingUpdate: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private taskRequestService: TaskRequestService,
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder
  ) {
    this.updateTaskRequestForm = this.fb.group({
      Description: [''],
      Action: [null, Validators.required], // Thêm action
      MajorId: [{ value: null, disabled: true }, [Validators.required]], // Vô hiệu hóa ban đầu
      CancelReason: ['', Validators.minLength(3)], // Chỉ yêu cầu khi Cancel
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
  }

  statusSeverityMap: { [id: number]: "success" | "secondary" | "info" | "warn" | "danger" | "contrast" } = {
    1: 'warn',   // Pending
    2: 'info',      // Assigned
    3: 'danger',    // Rejected By Assignee
    4: 'danger',    // Rejected By Assignee Deactivation
    5: 'success',   // Accepted By Assignee
    6: 'success',   // Completed By Assignee
    7: 'success',   // Finished
    8: 'danger',    // Cancelled
    9: 'danger'     // Cancelled Auto
  };

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  loadMajorOptions() {
    this.loading = true;  // Bắt đầu loading
    this.facilityMajorService.getAllMajors().then(facilityMajors => {
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
      this.loading = false;  // Kết thúc loading
    });
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    this.selectedTaskRequestId = id; // Lưu ID của task request được chọn
    this.loadingUpdate = true;  // Bắt đầu loading khi lấy chi tiết task request
    this.taskRequestService.getTaskRequestDetail(id).then(task => {
      const Task = task.data;
      if (task) {
        this.updateTaskRequestForm.patchValue({
          Description: Task.TaskRequest.Description,
          MajorId: Task.Major.Id,
          CancelReason: Task.TaskRequest.CancelReason,
        });
      }
    }).catch(error => {
      console.error('Error loading Task Request Detail:', error);
    }).finally(() => {
      this.loadingUpdate = false;  // Kết thúc loading
    });
  }

  updateTaskRequest(event: any) {
    if (!this.selectedTaskRequestId) {
      console.warn('❌ Không có Task ID được chọn.');
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
          const formData = this.updateTaskRequestForm.getRawValue(); // Lấy cả field disabled

          const requestData = {
            CancelReason: formData.CancelReason || null, // Nếu không có, gửi null
          };

          this.loadingUpdate = true;  // Bắt đầu loading khi cập nhật task request
          this.taskRequestService.updateTaskStatus(this.selectedTaskRequestId, formData.Action, requestData)
            .then(response => {
              if (response.success) {
                successAlert(response.message.content);
                this.actionCompleted.emit('Action completed');
                this.hideDialogUpdate();
              } else {
                errorAlert(response.message.content);
              }
            }
            )
            .catch(error => {
              console.error('❌ Lỗi cập nhật Task:', error);
            }).finally(() => {
              this.loadingUpdate = false;  // Kết thúc loading
            });
        } else {
          console.warn('❌ Form không hợp lệ.');
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
    this.update = false;
  }
}

