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
import { ServiceRequestService } from '../../../../../core/service/service-request.service';

@Component({
  selector: 'app-service-request-table',
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
  templateUrl: './service-request-table.component.html',
  styleUrl: './service-request-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ServiceRequestTableComponent implements OnInit {
  @Input() serviceRequests: any[] = []; // ✅ Nhận dữ liệu từ component cha
  majorOptions: any[] = [];
  actions = [
    { label: 'Assign', value: 'Assign' },
    { label: 'Finish', value: 'Finish' },
    { label: 'Cancel', value: 'Cancel' }
  ];

  assignees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'David Brown' }
  ];

  selectedServiceRequestId: number | null = null;

  updateServiceRequestForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private serviceRequestService: ServiceRequestService,
    private fb: FormBuilder
  ) {
    this.updateServiceRequestForm = this.fb.group({
      Action: [null, Validators.required], // Thêm action
      AssigneeId: [null], // Chỉ yêu cầu khi Assign
      RequestResultDescription: ['', Validators.minLength(3)], // Chỉ yêu cầu khi Finish
      CancelReason: ['', Validators.minLength(3)], // Chỉ yêu cầu khi Cancel
    });
  }

  ngOnInit() {
    // this.loadMajorOptions();
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

  // loadMajorOptions() {
  //   this.taskRequestService.getTaskRequests().then(taskRequests => {
  //     // Lọc danh sách Major từ taskRequests và loại bỏ trùng lặp
  //     const uniqueMajors = new Map<number, any>();

  //     taskRequests.forEach(task => {
  //       if (!uniqueMajors.has(task.Major.Id)) {
  //         uniqueMajors.set(task.Major.Id, {
  //           id: task.Major.Id,
  //           name: task.Major.Name
  //         });
  //       }
  //     });
  //     this.majorOptions = Array.from(uniqueMajors.values());
  //     console.log(this.majorOptions);
  //   });
  // }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog
    this.selectedServiceRequestId = id; // Lưu ID request

    // ✅ Reset form trước khi điền dữ liệu mới
    this.updateServiceRequestForm.reset();

    // 🔥 Gọi API lấy dữ liệu
    this.serviceRequestService.findById(id).then(serviceRequest => {
      if (!serviceRequest || !serviceRequest.ServiceRequest) {
        console.warn(`⚠️ Không tìm thấy dữ liệu Service Request cho ID: ${id}`);
        return;
      }

      // ✅ Điền dữ liệu vào form
      this.updateServiceRequestForm.patchValue({
        Action: null, // Action mặc định (bắt user chọn)
        AssigneeId: serviceRequest.ServiceRequest.AssignedAssigneeId || null,
        RequestResultDescription: serviceRequest.ServiceRequest.RequestResultDescription || '',
        CancelReason: serviceRequest.ServiceRequest.CancelReason || '',
      });
    }).catch(error => {
      console.error('❌ Lỗi khi lấy dữ liệu Service Request:', error);
    });
  }


  hideDialogUpdate() {
    this.updateServiceRequestForm.reset();
    this.update = false;
  }

  updateServiceRequest() {
    const action = this.updateServiceRequestForm.value.Action; // Lấy action từ form
    if (!action) {
      console.warn('⚠️ Không có action nào được chọn!');
      return;
    }

    const body: any = {}; // Tạo request body động

    if (action === 'Assign') {
      body.assigneeId = this.updateServiceRequestForm.value.AssigneeId;
      if (!body.assigneeId) {
        console.warn('⚠️ Vui lòng chọn người được giao nhiệm vụ.');
        return;
      }
    } else if (action === 'Finish') {
      body.requestResultDescription = this.updateServiceRequestForm.value.RequestResultDescription;
      if (!body.requestResultDescription?.trim()) {
        console.warn('⚠️ Vui lòng nhập mô tả kết quả.');
        return;
      }
    } else if (action === 'Cancel') {
      body.cancelReason = this.updateServiceRequestForm.value.CancelReason;
      if (!body.cancelReason?.trim()) {
        console.warn('⚠️ Vui lòng nhập lý do hủy.');
        return;
      }
    } else {
      console.error('❌ Hành động không hợp lệ:', action);
      return;
    }

    // console.log(`🔄 Gửi cập nhật Service Request ID ${requestId} với action: ${action}`, body);

    // this.serviceRequestService.updateRequest(requestId, action, body)
    //   .then(response => {
    //     console.log('✅ Cập nhật thành công:', response);
    //     this.hideDialogUpdate(); // Đóng dialog sau khi thành công
    //   })
    //   .catch(error => {
    //     console.error('❌ Lỗi cập nhật:', error);
    //   });
  }

}
