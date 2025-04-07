import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule, Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TaskRequestService } from '../../../../core/service/task-request.service';
import { TextareaModule } from 'primeng/textarea';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskAssignmentsTableComponent } from './task-assignments-table/task-assignments-table.component'
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../core/utils/alert.util';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-task-assignments',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ConfirmDialogModule,
    Dialog,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    TextareaModule,
    SelectModule,
    Select,
    ProgressSpinnerModule,
    TaskAssignmentsTableComponent,
    ToastModule,
  ],
  templateUrl: './task-assignments.component.html',
  styleUrl: './task-assignments.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  filteredTaskRequests: any[] = [];
  loading: boolean = false; // Trạng thái loading
  loadingAdd: boolean = false; // Trạng thái loading khi thêm Task Request

  addTaskRequestForm: FormGroup;
  add: boolean = false;

  userId: number;

  constructor(
    private facilityMajorService: FacilityMajorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private taskRequestService: TaskRequestService,
  ) {
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
    this.loadTaskRequests();
    
    this.addTaskRequestForm = this.fb.group({
      Description: ['', [Validators.minLength(3)]],
      RequesterId: this.userId,
      FacilityMajorId: [null, Validators.required],
    });
  }

  loadMajorOptions() {
    this.loading = true; // Hiển thị spinner
    this.facilityMajorService.getAllMajors()
      .then(facilityMajors => {
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
      })
      .catch(error => {
        console.error('❌ Lỗi khi tải danh sách Major:', error);
        this.majorOptions = [];
      })
      .finally(() => {
        this.loading = false; // Ẩn spinner khi dữ liệu đã được tải
      });
  }

  loadTaskRequests() {
    this.loading = true;
    this.taskRequestService.getAllTaskRequests()
      .then(taskRequests => {
        this.filteredTaskRequests = taskRequests.data.TaskRequests || [];
      })
      .catch(error => {
        console.error('❌ Lỗi khi tải Task Requests:', error);
        this.filteredTaskRequests = [];
      })
      .finally(() => {
        this.loading = false; // Ẩn spinner khi dữ liệu đã được tải
      });
  }

  filterTaskRequests() {
    this.loading = true;
    if (!this.selectedMajorId) {
      this.loadTaskRequests(); // Nếu không chọn Major, hiển thị tất cả
      return;
    }
    this.taskRequestService.getTaskRequestsByMajor(this.selectedMajorId)
      .then(taskRequests => {
        this.filteredTaskRequests = taskRequests.data.TaskRequests?.filter(task => task.Major.Id === this.selectedMajorId) || [];
      })
      .catch(error => {
        console.error('❌ Lỗi khi lọc Task Requests:', error);
        this.filteredTaskRequests = [];
      })
      .finally(() => {
        this.loading = false; // Ẩn spinner khi dữ liệu đã được tải
      });
  }

  showDialogAdd() {
    this.add = true;
  }

  addTaskRequest(event: any) {
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
        this.loadingAdd = true; // Hiển thị spinner
        this.taskRequestService.addTaskRequest(this.addTaskRequestForm.value)
          .then((response) => {
            console.log('Thêm Task Request thành công:', response);
            if (response.success) {
              successAlert(response.message.content);
              this.hideDialogAdd(); // Đóng dialog
              this.loadTaskRequests(); // Tải lại danh sách Task Requests sau khi thêm thành công
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => {
            console.error('❌ Lỗi khi thêm Task Request:', error);
          })
          .finally(() => {
            this.loadingAdd = false; // Ẩn spinner khi dữ liệu đã được tải
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogAdd() {
    this.addTaskRequestForm.reset();
    this.add = false;
  }
}
