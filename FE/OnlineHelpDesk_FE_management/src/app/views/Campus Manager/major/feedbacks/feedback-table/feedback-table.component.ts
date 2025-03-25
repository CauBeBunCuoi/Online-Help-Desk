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
import { FeedbackService } from '../../../../../core/service/feedback.service';

@Component({
  selector: 'app-feedback-table',
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
  templateUrl: './feedback-table.component.html',
  styleUrl: './feedback-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FeedbackTableComponent implements OnInit {
  @Input() feedbacks: any[] = []; // ✅ Nhận dữ liệu từ component cha
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  selectedFeedback: number | null = null;
  accountInfo: any;
  majorInfo: any;
  majorType: any;

  addFeedbackForm: FormGroup;

  // updateStaffForm: FormGroup
  update: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private feedbackService: FeedbackService,
    private fb: FormBuilder
  ) {
    this.addFeedbackForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(3)]], // Nội dung tối thiểu 3 ký tự
      Rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]], // Đánh giá từ 1-5
      IsDeactivated: [{ value: false, disabled: true }] // ✅ Chỉ đặt `disabled` ở đây
    });
  }

  ngOnInit() {
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
    this.feedbackService.getFeedbacks().then(feedbacks => {
      // Lọc danh sách Major từ feedbacks và loại bỏ trùng lặp
      const uniqueMajors = new Map<number, any>();

      feedbacks.forEach(feedback => {
        if (!uniqueMajors.has(feedback.Major.Id)) {
          uniqueMajors.set(feedback.Major.Id, {
            id: feedback.Major.Id,
            name: feedback.Major.Name
          });
        }
      });
      this.majorOptions = Array.from(uniqueMajors.values());
    });
  }

  showDialogDetail(id: number) {
    this.update = true; // Mở dialog

    // 🔥 Gọi API lấy thông tin Feedback
    this.feedbackService.findById(id).then(feedback => {
      if (feedback) {
        this.selectedFeedback = feedback; // Lưu Feedback được chọn

        this.addFeedbackForm.patchValue({
          Content: feedback.Feedback.Content,
          Rate: feedback.Feedback.Rate,
          IsDeactivated: feedback.Feedback.IsDeactivated
        });

        // ✅ Cập nhật thông tin hiển thị
        this.accountInfo = feedback.Account;
        this.majorInfo = feedback.Major;
        this.majorType = feedback.MajorType;
      }
    }).catch(error => {
      console.error('Error fetching feedback:', error);
    });
  }

  hideDialogDetail() {
    this.addFeedbackForm.reset();

    this.selectedFeedback = null;
    this.accountInfo = null;
    this.majorInfo = null;
    this.majorType = null;

    this.update = false;
  }
}
