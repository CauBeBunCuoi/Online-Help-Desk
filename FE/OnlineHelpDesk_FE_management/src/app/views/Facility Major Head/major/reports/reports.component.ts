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

import { ReportService } from '../../../../core/service/report.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReportsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  filteredReports: any[] = [];

  constructor(
    private reportService: ReportService,
    private facilityMajorService: FacilityMajorService
  ) {
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadReports();
  }

  loadMajorOptions() {
    // theo head
    this.facilityMajorService.getFacilityMajorsByAccountId(1).then(facilityMajors => {
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

  // ✅ Lấy toàn bộ report
  loadReports() {
    this.reportService.getAllReportsByAccountId(1).then(reports => {
      this.filteredReports = reports; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc feedback theo `selectedMajorId`
  filterReports() {
    if (this.selectedMajorId) {
      this.reportService.getReportsByFacilityMajor(this.selectedMajorId).then(reports => {
        this.filteredReports = reports.filter(report => report.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadReports(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
