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

import { ReportTableComponent } from './report-table/report-table.component';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';

@Component({
  selector: 'app-reports',
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
    ReportTableComponent,
    ProgressSpinnerModule, // Add Progress Spinner Module here
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ReportsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;
  filteredReports: any[] = [];
  loading: boolean = false;  // Add a loading state variable

  userId: number;

  constructor(
    private facilityMajorService: FacilityMajorService
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
    this.loadReports(); // Load initial reports
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
      this.loading = false;  // Stop loading when done
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.majorOptions = [];
      this.loading = false;  // Stop loading in case of error
    });
  }

  // Load reports
  loadReports() {
    this.loading = true;  // Start loading
    this.facilityMajorService.getReportsByHead(this.userId).then(reports => {
      this.filteredReports = reports.data.Reports;
    }).catch(error => {
      console.error('Error loading reports:', error);
      this.filteredReports = [];
    })
      .finally(() => {
        this.loading = false; // Kết thúc hiển thị spinner
      });
  }

  // Filter reports by selected major
  filterReports() {
    this.loading = true;  // Start loading
    if (this.selectedMajorId) {
      this.facilityMajorService.getReportsByMajor(this.selectedMajorId).then(reports => {
        this.filteredReports = reports.data.Reports.filter(report => report.Major.Id === this.selectedMajorId);
      }).catch(error => {
        console.error('Error filtering reports:', error);
      })
        .finally(() => {
          this.loading = false; // Kết thúc hiển thị spinner
        });
    } else {
      this.loadReports(); // Load all reports if no major is selected
    }
  }
  
  handleChildEvent(event: any) {
    this.loadReports();
  }
}
