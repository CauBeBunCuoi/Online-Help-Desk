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
import { ServiceRequestService } from '../../../../../core/service/service-request.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

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

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }
  actions: any[] = [];

  assigneeOptions: any[] = [];

  selectedServiceRequestId: number;

  updateServiceRequestForm: FormGroup;

  userId: number;
  roleId: number;

  // updateStaffForm: FormGroup
  update: boolean = false;
  isActionsDisabled: boolean = false;

  // hiện detail dialog
  serviceRequest: any = null; // Dữ liệu chi tiết của serviceRequest
  detail: boolean = false;

  loading: boolean = false;
  loadingUpdate: boolean = false;
  loadingDetail: boolean = false;
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
    // Lấy thông tin từ localStorage
    const authDataString = localStorage.getItem('auth');

    // Kiểm tra nếu có dữ liệu và sau đó chuyển sang JSON
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      console.log(authData); // Kiểm tra dữ liệu auth

      // Kiểm tra nếu có dữ liệu 'user' và lấy 'id' từ 'user'
      if (authData.user && authData.user.id) {
        this.userId = authData.user.id;
        this.roleId = authData.user.role_id;
        console.log('User ID:', this.userId); // In ra userId
      }
    }
  }

  // Đảm bảo loadServiceRequestActions trả về Promise<void>
  loadServiceRequestActions(status: number): Promise<void> {
    // ❌ Nếu không đủ điều kiện (userId null hoặc không phải role 3)
    if (!this.userId || this.roleId != 3) {
      this.actions = [];
      this.isActionsDisabled = true;
      return Promise.resolve(); // Trả về Promise<void> rỗng để dùng được với await
    }

    return this.serviceRequestService.getServiceRequestStatuses()
      .then(response => {
        console.log(response)
        const availableActions = response.data.RequestStatuses;
        console.log('✅ Các action có sẵn:', availableActions);

        // ❌ Nếu trạng thái không phải 2 hoặc 5 => không hiển thị select
        if (status != 2 && status != 5) {
          this.actions = [];
          this.isActionsDisabled = true;
          return;
        }

        // ✅ Xác định các action được phép theo status
        const allowedActionIds = status === 2 ? [3, 5] : [3, 6];

        this.actions = availableActions
          .filter(action => allowedActionIds.includes(action.Id))
          .map(action => ({
            Id: action.Id,
            Name: action.Name
          }));

        // ✅ Nếu không có action nào thì disable
        this.isActionsDisabled = this.actions.length === 0;
      })
      .catch(error => {
        console.error('❌ Lỗi khi tải danh sách actions:', error);
        this.actions = [];
        this.isActionsDisabled = true;
      });
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  showDialogUpdate(id: number) {
    this.update = true;
    this.selectedServiceRequestId = id;
    this.updateServiceRequestForm.reset();
    this.loadingUpdate = true;

    let svcData: any;

    this.serviceRequestService.getServiceRequestDetail(id)
      .then(res => {
        svcData = res.data;
        // Trả về promise để chain
        return this.loadServiceRequestActions(svcData.ServiceRequest.RequestStatusId);
      })
      .then(() => {
        // Bây giờ svcData đã có và actions đã load xong
        this.updateServiceRequestForm.patchValue({
          Action: svcData.ServiceRequest.RequestStatusId,
          AssigneeId: svcData.ServiceRequest.AssignedAssigneeId || null,
          RequestResultDescription: svcData.ServiceRequest.RequestResultDescription || '',
          CancelReason: svcData.ServiceRequest.CancelReason || '',
          ProgressNote: svcData.ServiceRequest.ProgressNote || ''
        });

        const controls = ['Action', 'RequestResultDescription', 'CancelReason', 'ProgressNote'];
        controls.forEach(name => {
          const ctrl = this.updateServiceRequestForm.get(name);
          this.isActionsDisabled ? ctrl?.disable() : ctrl?.enable();
        });
      })
      .catch(error => {
        console.error('❌ Lỗi khi lấy dữ liệu:', error);
      })
      .finally(() => {
        this.loadingUpdate = false;
      });
  }

  updateServiceRequest(event: any) {
    const action = this.updateServiceRequestForm.value.Action;
    console.log(action);
    if (!action) {
      this.messageService.add({ severity: 'warn', summary: 'Chưa chọn hành động!', detail: 'Vui lòng chọn một hành động.' });
      this.loading = false;
      return;
    }
    // 1) Build request body chỉ với những field cần thiết
    const body: any = {};
const formValues = this.updateServiceRequestForm.value;

if (action === 3 || action === 5) {
  const note = formValues.ProgressNote?.trim();
  if (!note) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Thiếu mô tả note!',
      detail: 'Vui lòng nhập mô tả note.'
    });
    return;
  }
  body.ProgressNote = note;

} else if (action === 6) {
  const note = formValues.ProgressNote?.trim();
  const result = formValues.RequestResultDescription?.trim();
  if (!note || !result) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Thiếu thông tin!',
      detail: !note ? 'Vui lòng nhập mô tả note.' : 'Vui lòng nhập mô tả result.'
    });
    return;
  }
  body.ProgressNote = note;
  body.RequestResultDescription = result;
} else {
  this.messageService.add({
    severity: 'error',
    summary: 'Hành động không hợp lệ!',
    detail: 'Vui lòng chọn hành động hợp lệ.'
  });
  this.loading = false;
  return;
}


    // 2) Confirm rồi gọi API
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to update this record?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Update',
      rejectLabel: 'Cancel',
      accept: () => {
        this.loadingUpdate = true;

        // 3) Lấy list statuses, map actionId → actionName
        this.serviceRequestService.getServiceRequestStatuses()
          .then(res => {
            // backend trả về trong res.data.RequestStatuses
            const statuses = res.data.RequestStatuses;
            const status = statuses.find((s: any) => s.Id === action);
            if (!status) {
              throw new Error(`Không tìm thấy status Id=${action}`);
            }
            // trim + remove whitespace
            return status.Name.trim().replace(/\s+/g, '');
          })
          .then((actionName: string) => {
            // 4) Gọi API update với actionName đã chuẩn
            return this.serviceRequestService.updateServiceRequest(
              this.selectedServiceRequestId,
              actionName,
              body
            );
          })
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.actionCompleted.emit();
              this.hideDialogUpdate();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(err => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Lỗi!',
              detail: err.message || err
            });
          })
          .finally(() => {
            this.loadingUpdate = false;
          });
      }
    });
  }

  hideDialogUpdate() {
    this.updateServiceRequestForm.reset();
    this.update = false;
  }

  showDetailDialog(id: number) {
    this.detail = true;
    this.loadingDetail = true; // Bật loading khi bắt đầu gọi API
    // Gọi API để lấy thông tin chi tiết của serviceRequest
    this.serviceRequestService.getServiceRequestDetail(id).then((serviceRequest) => {
      if (!serviceRequest || !serviceRequest.data.ServiceRequest) {
        console.warn(`⚠️ Không tìm thấy dữ liệu Service Request cho ID: ${id}`);
        this.serviceRequest = null;
        return;
      }
      // Lưu dữ liệu để hiển thị trong dialog
      this.serviceRequest = serviceRequest.data;
    }).catch((error) => {
      console.error('❌ Lỗi khi lấy dữ liệu Service Request:', error);
      this.serviceRequest = null;
    }).finally(() => {
      this.loadingDetail = false; // Tắt loading sau khi hoàn tất (dù thành công hay lỗi)
    });
  }

  hideDetailDialog() {
    this.detail = false;
    this.serviceRequest = null; // Reset dữ liệu khi đóng dialog
  }

}
