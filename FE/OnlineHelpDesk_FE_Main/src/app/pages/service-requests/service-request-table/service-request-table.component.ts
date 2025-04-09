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
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceRequestService } from '../../../core/service/service-request.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../core/utils/alert.util';

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

  selectedServiceRequestId: number;

  updateServiceRequestForm: FormGroup;

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
      AssigneeId: [null], // Chỉ yêu cầu khi Assign
      RequestResultDescription: [''], // Chỉ yêu cầu khi Finish
      CancelReason: ['', Validators.required], // Chỉ yêu cầu khi Cancel
      ProgressNote: [''], //
    });
  }

  ngOnInit() {
  }

  getStatusName(statusId: number): 'Pending' | 'Success' | 'Cancel' {
    if (statusId >= 1 && statusId <= 6) {
      return 'Pending';
    } else if (statusId === 7) {
      return 'Success';
    } else {
      return 'Cancel';
    }
  }

  getStatusSeverity(statusId: number): "warn" | "success" | "danger" {
    if (statusId >= 1 && statusId <= 6) {
      return 'warn';
    } else if (statusId === 7) {
      return 'success';
    } else {
      return 'danger';
    }
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

    this.serviceRequestService.getServiceRequestDetail(id).then(
      (response) => {
        const svcData = response.data;
        // Bây giờ svcData đã có và actions đã load xong
        this.updateServiceRequestForm.patchValue({
          Action: svcData.ServiceRequest.RequestStatusId,
          AssigneeId: svcData.ServiceRequest.AssignedAssigneeId || null,
          RequestResultDescription: svcData.ServiceRequest.RequestResultDescription || '',
          CancelReason: svcData.ServiceRequest.CancelReason || '',
          ProgressNote: svcData.ServiceRequest.ProgressNote || ''
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
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Confirm to update',
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
        const body: any = {};
        body.CancelReason = this.updateServiceRequestForm.value.CancelReason?.trim();
        this.serviceRequestService.updateServiceRequest(this.selectedServiceRequestId, 'Cancelled', body)
          .then((response) => {
            if (response.success) {
              successAlert(response.message.content);
              this.actionCompleted.emit();
              this.hideDialogUpdate();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch((error) => {
            this.messageService.add({ severity: 'error', summary: 'Lỗi!', detail: error });
            console.error(error);
          })
          .finally(() => {
            this.loading = false; // Tắt spinner khi hoàn thành
            this.hideDialogUpdate();
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
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
      this.loading = false; // Tắt loading sau khi hoàn tất (dù thành công hay lỗi)
    });
  }

  hideDetailDialog() {
    this.detail = false;
    this.serviceRequest = null; // Reset dữ liệu khi đóng dialog
  }

}
