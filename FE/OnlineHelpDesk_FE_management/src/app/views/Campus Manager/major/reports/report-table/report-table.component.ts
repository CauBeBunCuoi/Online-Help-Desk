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
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from '../../../../../core/service/report.service';

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
  ],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReportTableComponent implements OnInit {
  @Input() reports: any[] = []; // ✅ Nhận dữ liệu từ component cha

  selectedReport: number | null = null;
  reportType: any;
  accountInfo: any;
  majorInfo: any;
  majorType: any;

  updateReportForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.updateReportForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(3)]], // Nội dung báo cáo (tối thiểu 3 ký tự)
      ReportTypeId: [null, Validators.required], // Loại báo cáo
      FacilityMajorId: [null, Validators.required], // Major liên quan
      IsResolved: [false], // Trạng thái xử lý
      IsDeactivated: [{ value: false, disabled: true }] // ✅ Không cho chỉnh sửa
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

    // 🔥 Gọi API lấy thông tin Report
    this.reportService.findById(id).then(report => {
      if (report) {
        this.selectedReport = report; // Lưu Report được chọn

        this.updateReportForm.patchValue({
          Content: report.Report.Content,
          ReportTypeId: report.Report.ReportTypeId,
          IsResolved: report.Report.IsResolved,
          IsDeactivated: report.Report.IsDeactivated
        });

        // ✅ Cập nhật thông tin hiển thị
        this.accountInfo = report.Account;
        this.majorInfo = report.Major;
        this.reportType = report.ReportType;
      }
    }).catch(error => {
      console.error('Error fetching report:', error);
    });
  }

  hideDialogDetail() {
    this.updateReportForm.reset();
    this.selectedReport = null;
    this.accountInfo = null;
    this.majorInfo = null;
    this.reportType = null;
    this.update = false;
  }

  updateReportStatus() {
    console.log(this.selectedReport);
  }
}
