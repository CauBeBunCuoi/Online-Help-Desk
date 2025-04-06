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
import { ServiceRequestService } from '../../../core/services/service-request.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    Select,
    ProgressSpinnerModule
  ],
  templateUrl: './service-request-table.component.html',
  styleUrl: './service-request-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ServiceRequestTableComponent implements OnInit {
  @Input() serviceRequests: any[] = []; // ✅ Nhận dữ liệu từ component cha
  actions: any[] = [];

  assigneeOptions: any[] = [];

  selectedServiceRequestId: number;

  updateServiceRequestForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;
  isActionsDisabled: boolean = false;

  // hiện detail dialog
  serviceRequest: any = null; // Dữ liệu chi tiết của serviceRequest
  detail: boolean = false;

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
      ProgressNote: ['', Validators.minLength(3)], //
    });
  }

  ngOnInit() {
  }

  loadServiceRequestActions(status: number) {
    // check  quyền
    if (true && status <= 6) {
      this.serviceRequestService.getServiceRequestStatuses()
        .then(response => {
          console.log(response);
          if (!response || !Array.isArray(response.ServiceRequestStatuses)) {
            this.actions = [];
            this.isActionsDisabled = true; // Disable select nếu không có dữ liệu
            return;
          }
          this.actions = response.ServiceRequestStatuses
            .filter(action => [2, 7, 8].includes(action.Id)) // Chỉ lấy 3 trạng thái cần thiết
            .map(action => ({
              id: action.Id,
              name: action.Name
            }));
          this.isActionsDisabled = this.actions.length === 0; // Nếu không có actions, disable select
        })
        .catch(error => {
          console.error('❌ Lỗi khi tải danh sách actions:', error);
          this.actions = [];
          this.isActionsDisabled = true; // Disable select nếu có lỗi
        });
    } else {
      alert('Login chưa ?');
      this.isActionsDisabled = true; // Disable select nếu có lỗi
    }
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

  showDialogUpdate(id: number, majorId: number, RequestStatus: number) {
    this.update = true; // Mở dialog
    this.selectedServiceRequestId = id; // Lưu ID request
    this.loadAssignableAssignees(majorId);

    this.loadServiceRequestActions(RequestStatus);

    // ✅ Reset form trước khi điền dữ liệu mới
    this.updateServiceRequestForm.reset();

    this.loading = true; // Bật loading khi bắt đầu gọi API

    // 🔥 Gọi API lấy dữ liệu chi tiết service request
    this.serviceRequestService.getServiceRequestDetail(id).then(serviceRequest => {
      console.log(serviceRequest);
      // ✅ Điền dữ liệu vào form
      this.updateServiceRequestForm.patchValue({
        Action: null, // Action mặc định (bắt user chọn)
        AssigneeId: serviceRequest.ServiceRequest.AssignedAssigneeId || null,
        RequestResultDescription: serviceRequest.ServiceRequest.RequestResultDescription || '',
        CancelReason: serviceRequest.ServiceRequest.CancelReason || '',
      });
    }).catch(error => {
      console.error('❌ Lỗi khi lấy dữ liệu:', error);
    }).finally(() => {
      this.loading = false; // Tắt loading sau khi hoàn tất (dù thành công hay lỗi)
    });
  }

  updateServiceRequest() {
    if (this.loading) return;
    this.loading = true;

    const action = this.updateServiceRequestForm.value.Action;
    if (!action) {
      this.messageService.add({ severity: 'warn', summary: 'Chưa chọn hành động!', detail: 'Vui lòng chọn một hành động.' });
      this.loading = false;
      return;
    }

    const body: any = {};
    body.ProgressNote = this.updateServiceRequestForm.value.ProgressNote?.trim();
    body.AssigneeId = this.updateServiceRequestForm.value.ProgressNote?.trim();
    body.RequestResultDescription = this.updateServiceRequestForm.value.ProgressNote?.trim();
    body.CancelReason = this.updateServiceRequestForm.value.ProgressNote?.trim();

    if (action === 2) {
      body.AssigneeId = this.updateServiceRequestForm.value.AssigneeId;
      if (!body.AssigneeId) {
        this.messageService.add({ severity: 'warn', summary: 'Chưa chọn người nhận việc!', detail: 'Vui lòng chọn người được giao nhiệm vụ.' });
        this.loading = false;
        return;
      }
    } else if (action === 7) {
      body.RequestResultDescription = this.updateServiceRequestForm.value.RequestResultDescription?.trim();
      if (!body.RequestResultDescription) {
        this.messageService.add({ severity: 'warn', summary: 'Thiếu mô tả kết quả!', detail: 'Vui lòng nhập mô tả kết quả.' });
        this.loading = false;
        return;
      }
    } else if (action === 'AcceptedByAssignee' || action === 'RejectedByAssignee') {
      if (!body.ProgressNote) {
        this.messageService.add({ severity: 'warn', summary: 'Thiếu ghi chú tiến độ!', detail: 'Vui lòng nhập ghi chú tiến độ.' });
        this.loading = false;
        return;
      }
    } else if (action === 8) {
      body.CancelReason = this.updateServiceRequestForm.value.CancelReason?.trim();
      if (!body.CancelReason) {
        this.messageService.add({ severity: 'warn', summary: 'Thiếu lý do hủy!', detail: 'Vui lòng nhập lý do hủy.' });
        this.loading = false;
        return;
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Hành động không hợp lệ!', detail: 'Vui lòng chọn hành động hợp lệ.' });
      this.loading = false;
      return;
    }

    this.serviceRequestService.updateServiceRequest(this.selectedServiceRequestId, action, body)
      .then((res) => {
        console.log('✅ Cập nhật thành công:', res);
      })
      .catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'Lỗi!', detail: error });
        console.error(error);
      })
      .finally(() => {
        this.loading = false; // Tắt spinner khi hoàn thành
        this.hideDialogUpdate();
      });
  }

  loadAssignableAssignees(majorId: number) {
    this.serviceRequestService.getAssignableAssigneesForMajor(majorId)
      .then(response => {
        console.log(response);
        if (!response || !Array.isArray(response.Accounts)) {
          this.assigneeOptions = [];
          return;
        }
        this.assigneeOptions = response.Accounts.map(account => ({
          id: account.Account.Id,
          name: account.Account.FullName
        }));
      })
      .catch(error => {
        console.error('❌ Lỗi khi tải danh sách người nhận nhiệm vụ:', error);
        this.assigneeOptions = [];
      });
  }

  hideDialogUpdate() {
    this.updateServiceRequestForm.reset();
    this.update = false;
  }

  showDetailDialog(id: number) {
    this.detail = true;
    this.loading = true; // Bật loading khi bắt đầu gọi API

    // Gọi API để lấy thông tin chi tiết của serviceRequest
    this.serviceRequestService.getServiceRequestDetail(id).then((serviceRequest: any) => {
      if (!serviceRequest || !serviceRequest.ServiceRequest) {
        console.warn(`⚠️ Không tìm thấy dữ liệu Service Request cho ID: ${id}`);
        this.serviceRequest = null;
        return;
      }
      // Lưu dữ liệu để hiển thị trong dialog
      this.serviceRequest = serviceRequest;
    }).catch((error) => {
      console.error('❌ Lỗi khi lấy dữ liệu Service Request:', error);
      this.serviceRequest = null;
    }).finally(() => {
      this.loading = false; // Tắt loading sau khi hoàn tất (dù thành công hay lỗi)
    });
  }

  hideDetailDialog() {
    this.detail = false;
    this.serviceRequest = null; // Reset dữ liệu khi đóng dialog
  }

}
