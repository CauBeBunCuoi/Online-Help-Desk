import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { FacilityMajorService } from '../../../../../core/service/facility-major.service';
import { errorAlert, successAlert } from '../../../../../core/utils/alert.util';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-feedback-table',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    RatingModule,
    HttpClientModule,
  ],
  templateUrl: './feedback-table.component.html',
  styleUrl: './feedback-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FeedbackTableComponent implements OnInit {
  @Input() feedbacks: any[] = []; // ✅ Nhận dữ liệu từ component cha

  @Output() actionCompleted = new EventEmitter<any>();  // Khai báo EventEmitter

  // Phương thức xử lý của thằng con
  handleAction() {
    // Sau khi xử lý xong, phát sự kiện cho cha
    this.actionCompleted.emit('Action completed');  // Gửi thông tin hoặc dữ liệu lên cha
  }

  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  selectedFeedback: number | null = null;
  accountInfo: any;
  majorInfo: any;
  majorType: any;

  detailFeedbackForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private facilityMajorService: FacilityMajorService
  ) {
  }

  ngOnInit() {
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  confirmDelete(event: any, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
      acceptButtonProps: { label: 'Delete', severity: 'danger' },
      accept: () => {
        this.loading = true;
        this.facilityMajorService.deleteFeedback(id).then((response) => {
          if (response.success) {
            successAlert(response.message.content);
            this.actionCompleted.emit('Action completed');
            console.log('Dây nè');
          }
          else {
            errorAlert(response.message.content);
          }
        }).catch(error => {
          console.error('Error loading feedbacks:', error);
        })
          .finally(() => {
            this.loading = false; // Kết thúc hiển thị spinner
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }
}
