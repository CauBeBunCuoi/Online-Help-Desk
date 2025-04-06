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
import { ReportTableComponent } from './report-table/report-table.component';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-reports',
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
    ReportTableComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ReportsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;
  filteredReports: any[] = [];

  addReportForm: FormGroup;

  // Loading state
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private facilityMajorService: FacilityMajorService
  ) {
    this.addReportForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(3)]],
      Rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      IsDeactivated: [false],
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadReports();
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
      .finally(() => this.loading = false);
  }

  loadReports() {
    this.loading = true;
    this.facilityMajorService.getAllMajorReports()
      .then(reports => {
        this.filteredReports = reports.data.Reports; // Ban đầu hiển thị tất cả
      })
      .catch(error => {
        console.error('Error loading reports:', error);
      })
      .finally(() => this.loading = false);
  }

  filterReports() {
    if (this.selectedMajorId) {
      this.loading = true;
      this.facilityMajorService.getReportsByMajor(this.selectedMajorId)
        .then(reports => {
          this.filteredReports = reports.data.Reports;
        })
        .catch(error => {
          console.error('Error filtering reports:', error);
        })
        .finally(() => this.loading = false);
    } else {
      this.loadReports();
    }
  }
  
  handleChildEvent(event) {
    this.loadReports();
  }
}
