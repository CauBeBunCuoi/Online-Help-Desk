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

import { TaskRequestService } from '../../../../core/service/task-request.service';

import { TaskAssignmentsTableComponent } from './task-assignments-table/task-assignments.component'
import { FacilityMajorService } from '../../../../core/service/facility-major.service';

@Component({
  selector: 'app-task-assignments',
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
    TaskAssignmentsTableComponent,
  ],
  templateUrl: './task-assignments.component.html',
  styleUrl: './task-assignments.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  filteredTaskRequests: any[] = [];

  constructor(
    private taskRequestService: TaskRequestService,
    private facilityMajorService: FacilityMajorService,
  ) {
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadTaskRequests();
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

  // ✅ Lấy toàn bộ Task Requests
  loadTaskRequests() {
    this.taskRequestService.getTaskRequestsByAccountId(1).then(taskRequests => {
      this.filteredTaskRequests = taskRequests; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc Task Requests theo `selectedMajorId`
  filterTaskRequests() {
    if (this.selectedMajorId) {
      this.taskRequestService.getTaskRequestsByMajorId(this.selectedMajorId).then(taskRequests => {
        this.filteredTaskRequests = taskRequests.filter(task => task.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadTaskRequests(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
