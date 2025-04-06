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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackTableComponent } from './feedback-table/feedback-table.component';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
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
    ProgressSpinnerModule,
    FeedbackTableComponent,
  ],
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FeedbacksComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number;
  filteredFeedbacks: any[] = [];
  addFeedbackForm: FormGroup;

  // Loading spinner state
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private facilityMajorService: FacilityMajorService,
  ) {
    this.addFeedbackForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(3)]],
      Rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      IsDeactivated: [false],
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadFeedbacks();
  }

  loadMajorOptions() {
    this.loading = true;
    this.facilityMajorService.getAllMajors()
      .then(facilityMajors => {
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
      })
      .catch(error => {
        console.error('Error loading Major options:', error);
        this.majorOptions = [];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loadFeedbacks() {
    this.loading = true;
    this.facilityMajorService.getAllMajorFeedbacks()
      .then(feedbacks => {
        this.filteredFeedbacks = feedbacks.data.Feedbacks;
        console.log('Feedbacks:', this.filteredFeedbacks);
      })
      .catch(error => {
        console.error('Error loading feedbacks:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  filterFeedbacks() {
    if (this.selectedMajorId) {
      this.loading = true;
      this.facilityMajorService.getMajorFeedbacks(this.selectedMajorId)
        .then(feedbacks => {
          this.filteredFeedbacks = feedbacks.data.Feedbacks;
        })
        .catch(error => {
          console.error('Error filtering feedbacks:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.loadFeedbacks();
    }
  }
  
  handleChildEvent(event) {
    this.loadFeedbacks();
  }
}
