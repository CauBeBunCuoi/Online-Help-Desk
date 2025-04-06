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
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';

@Component({
  selector: 'app-report-table',
  standalone: true,
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
  styleUrls: ['./report-table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ReportTableComponent implements OnInit {
  @Input() reports: any[] = []; // Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }

  selectedReportId: number | null = null;
  reportType: any;
  accountInfo: any;
  majorInfo: any;
  majorType: any;

  updateReportForm: FormGroup;

  update: boolean = false;
  loading: boolean = false;
  loadingUpdate: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder
  ) {
    this.updateReportForm = this.fb.group({
      Content: [''],
      ReportTypeId: [null],
      FacilityMajorId: [null],
      IsResolved: [false],
      IsDeactivated: [{ value: false, disabled: true }],
    });
  }

  ngOnInit() {
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
  }

  showDialogUpdate(id: number) {
    this.update = true;
    this.loadingUpdate = true;
    // Gọi API lấy thông tin Report
    this.facilityMajorService.getReportDetail(id)
      .then(report => {
        console.log(report);
        if (report) {
          // Lưu lại report (có thể lưu report.Id nếu cần)
          this.selectedReportId = id;
          const Report = report.data;
          this.updateReportForm.patchValue({
            Content: Report.Report.Content,
            ReportTypeId: Report.Report.ReportTypeId,
            IsResolved: Report.Report.IsResolved,
            IsDeactivated: Report.Report.IsDeactivated,
          });
          // Cập nhật thông tin hiển thị
          this.accountInfo = Report.Account;
          this.majorInfo = Report.Major;
          this.reportType = Report.ReportType;
        }
      })
      .catch(error => {
        console.error('Error fetching report:', error);
      })
      .finally(() => {
        this.loadingUpdate = false;
      });
  }

  hideDialogDetail() {
    this.updateReportForm.reset();
    this.selectedReportId = null;
    this.accountInfo = null;
    this.majorInfo = null;
    this.reportType = null;
    this.update = false;
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
        if (this.updateReportForm.valid) {
          this.loading = true;
          this.facilityMajorService.resolveReport(this.selectedReportId!)
            .then((response) => {
              if (response.success) {
                this.actionCompleted.emit('Action completed');
                successAlert(response.message.content);
                this.hideDialogDetail();
              } else {
                errorAlert(response.message.content);
              }
            })
            .catch(error => {
              console.error('Error resolving report:', error);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log('Form update Invalid');
          this.updateReportForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }
}
