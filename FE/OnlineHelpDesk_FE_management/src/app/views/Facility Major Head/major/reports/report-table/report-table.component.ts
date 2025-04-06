import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

@Component({
  selector: 'app-report-table',
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
    RatingModule,
    HttpClientModule,
    ProgressSpinnerModule
  ],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReportTableComponent implements OnInit {
  @Input() reports: any[] = []; // ✅ Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }
  userId: number;
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  selectedReportId: number | null = null;
  reportType: any;
  accountInfo: any;
  majorInfo: any;
  majorType: any;

  detailReportForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;

  loading: boolean = false;
  loadingUpdate: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder
  ) {
    this.detailReportForm = this.fb.group({
      Content: [''], // Nội dung báo cáo (tối thiểu 3 ký tự)
      ReportTypeId: [null], // Loại báo cáo
      FacilityMajorId: [null], // Major liên quan
      IsResolved: [false], // Trạng thái xử lý
      IsDeactivated: [{ value: false, disabled: true }] // ✅ Không cho chỉnh sửa
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
    this.loading = true;  // Bật loading trước khi gọi service
    this.facilityMajorService.getMajorsByHead(this.userId).then(facilityMajors => {
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
      this.loading = false;  // Tắt loading sau khi xong, dù thành công hay lỗi
    });
  }

  showDialogUpdate(id: number) {
    this.loadingUpdate = true;  // Bật loading trước khi gọi service
    this.update = true;   // Mở dialog

    this.facilityMajorService.getReportDetail(id).then(report => {
      const Report = report.data;
      if (report) {
        this.selectedReportId = id;  // Lưu Report được chọn

        this.detailReportForm.patchValue({
          Content: Report.Report.Content,
          ReportTypeId: Report.Report.ReportTypeId,
          IsResolved: Report.Report.IsResolved,
          IsDeactivated: Report.Report.IsDeactivated
        });

        this.accountInfo = Report.Account;
        this.majorInfo = Report.Major;
        this.reportType = Report.ReportType;
      }
    }).catch(error => {
      console.error('Error fetching report:', error);
    }).finally(() => {
      this.loadingUpdate = false;  // Tắt loading sau khi xong, dù thành công hay lỗi
    });
  }

  updateReportStatus(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Danger Zone',
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
        if (this.detailReportForm.valid) {
          this.loadingUpdate = true;  // Bật loading trước khi gọi service

          this.facilityMajorService.resolveReport(this.selectedReportId!).then((response) => {
            if (response.success) {
              successAlert(response.message.content);
              this.actionCompleted.emit('Action completed');
              this.hideDialogDetail();
            } else {
              errorAlert(response.message.content);
            }
          }).catch((error) => {
            console.error('Error resolving report:', error);
          })
            .finally(() => {
              this.loadingUpdate = false; // Kết thúc hiển thị spinner
            });
        } else {
          console.log('Form update Invalid');
          this.detailReportForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogDetail() {
    this.detailReportForm.reset();

    this.selectedReportId = null;
    this.accountInfo = null;
    this.majorInfo = null;
    this.reportType = null;
    this.update = false;
  }

}
