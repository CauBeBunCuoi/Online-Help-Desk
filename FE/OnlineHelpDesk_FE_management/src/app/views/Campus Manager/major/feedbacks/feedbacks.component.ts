import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule, Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FeedbackService } from '../../../../core/service/feedback.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackTableComponent } from './feedback-table/feedback-table.component';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';

@Component({
  selector: 'app-feedbacks',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    Select,
    FeedbackTableComponent,
  ],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FeedbacksComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number;

  filteredFeedbacks: any[] = [];

  addFeedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private facilityMajorService: FacilityMajorService,
  ) {
    this.addFeedbackForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(3)]], // Nội dung tối thiểu 3 ký tự
      Rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]], // Đánh giá từ 1-5
      IsDeactivated: [false], // Trạng thái kích hoạt
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadFeedbacks();
  }

  loadMajorOptions() {
    this.facilityMajorService.getFacilityMajors().then(facilityMajors => {
      if (!facilityMajors || !Array.isArray(facilityMajors)) {
        this.majorOptions = [];
        return;
      }
      this.majorOptions = facilityMajors.reduce((acc, major) => {
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
    });
  }

  // ✅ Lấy toàn bộ feedback
  loadFeedbacks() {
    this.feedbackService.getFeedbacks().then(feedbacks => {
      this.filteredFeedbacks = feedbacks; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc feedback theo `selectedMajorId`
  filterFeedbacks() {
    if (this.selectedMajorId) {
      this.feedbackService.getFeedbacksByMajor(this.selectedMajorId).then(feedbacks => {
        this.filteredFeedbacks = feedbacks;
      });
    } else {
      this.loadFeedbacks(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
