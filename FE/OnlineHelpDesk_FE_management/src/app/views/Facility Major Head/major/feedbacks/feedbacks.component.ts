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
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Import Spinner module

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
    ProgressSpinnerModule, // Add Progress Spinner Module here
  ],
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FeedbacksComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;
  filteredFeedbacks: any[] = [];
  loading: boolean = false;  // Add a loading state variable

  userId: number;

  constructor(
    private facilityMajorService: FacilityMajorService,
  ) { }

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
    this.loadFeedbacks(); // Load initial feedbacks
  }

  // Load major options (facility majors)
  loadMajorOptions() {
    this.loading = true;  // Start loading
    this.facilityMajorService.getMajorsByHead(this.userId).then(facilityMajors => {
      if (facilityMajors && Array.isArray(facilityMajors.data.Majors)) {
        this.majorOptions = facilityMajors.data.Majors.map(major => ({
          id: major.Major.Id,
          name: major.Major.Name
        }));
      } else {
        this.majorOptions = [];
      }
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.majorOptions = [];
    })
      .finally(() => {
        this.loading = false; // Kết thúc hiển thị spinner
      });
  }

  // Load feedbacks
  loadFeedbacks() {
    this.loading = true;  // Start loading
    this.facilityMajorService.getHeadMajorFeedbacks(this.userId).then(feedbacks => {
      this.filteredFeedbacks = feedbacks.data.Feedbacks;
    }).catch(error => {
      console.error('Error loading feedbacks:', error);
      this.filteredFeedbacks = [];
    })
      .finally(() => {
        this.loading = false; // Kết thúc hiển thị spinner
      });
  }

  // Filter feedbacks by selected major
  filterFeedbacks() {
    this.loading = true;  // Start loading
    if (this.selectedMajorId) {
      this.facilityMajorService.getMajorFeedbacks(this.selectedMajorId).then(feedbacks => {
        this.filteredFeedbacks = feedbacks.data.Feedbacks.filter(feedback => feedback.Major.Id === this.selectedMajorId);

      }).catch(error => {
        console.error('Error filtering feedbacks:', error);
      })
        .finally(() => {
          this.loading = false; // Kết thúc hiển thị spinner
        });
    } else {
      this.loadFeedbacks(); // Load all feedbacks if no major is selected
    }
  }

  handleChildEvent(event) {
    this.loadFeedbacks();
  }
}
