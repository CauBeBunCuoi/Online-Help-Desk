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

  addReportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private facilityMajorService: FacilityMajorService,
  ) {
    this.addReportForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(3)]], // Nội dung tối thiểu 3 ký tự
      Rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]], // Đánh giá từ 1-5
      IsDeactivated: [false], // Trạng thái kích hoạt
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadReports();
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
  loadReports() {
    this.reportService.getAllReports().then(reports => {
      this.filteredReports = reports; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc feedback theo `selectedMajorId`
  filterReports() {
    if (this.selectedMajorId) {
      this.reportService.getReportsByFacilityMajor(this.selectedMajorId).then(reports => {
        this.filteredReports = reports;
      });
    } else {
      this.loadReports(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
